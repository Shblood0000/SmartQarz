/* Shared storage for index.html and database.html (same origin, same IndexedDB) */
const SQ_DB_NAME = 'SmartQarz';
const NOTE_STORE = 'notifications';
const NOTE_TTL = 5 * 60 * 60 * 1000;
const sqChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('smartqarz-sync') : null;

function sqOpenDB() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(SQ_DB_NAME, 2);
    r.onupgradeneeded = () => {
      const d = r.result;
      if (!d.objectStoreNames.contains('debts')) d.createObjectStore('debts', { keyPath: 'id' });
      if (!d.objectStoreNames.contains(NOTE_STORE)) d.createObjectStore(NOTE_STORE, { keyPath: 'id' });
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
const sqReq = (req) => new Promise((res, rej) => { req.onsuccess = () => res(req.result); req.onerror = () => rej(req.error); });

/* Returns non-expired notifications, newest first. Expiry is checked against createdAt. */
async function sqAll(db) {
  const all = await sqReq(db.transaction(NOTE_STORE).objectStore(NOTE_STORE).getAll());
  const cutoff = Date.now() - NOTE_TTL;
  return all.filter((n) => n.createdAt > cutoff).sort((a, b) => b.createdAt - a.createdAt);
}

function sqWrite(db, fn) {
  return new Promise((res, rej) => {
    const tx = db.transaction(NOTE_STORE, 'readwrite');
    fn(tx.objectStore(NOTE_STORE));
    tx.oncomplete = () => { if (sqChannel) sqChannel.postMessage('changed'); res(); };
    tx.onerror = () => rej(tx.error);
  });
}
const sqSave = (db, n) => sqWrite(db, (s) => s.put(n));
const sqRemove = (db, id) => sqWrite(db, (s) => s.delete(id));
const sqRemoveAll = (db) => sqWrite(db, (s) => s.clear());

async function sqMarkAllRead(db) {
  const list = await sqAll(db);
  if (list.length) await sqWrite(db, (s) => list.forEach((n) => s.put({ ...n, read: true })));
}

/* Deletes every notification older than 5 hours. Runs on startup, on return to the page, and every minute. */
async function sqPurge(db) {
  const all = await sqReq(db.transaction(NOTE_STORE).objectStore(NOTE_STORE).getAll());
  const cutoff = Date.now() - NOTE_TTL;
  const expired = all.filter((n) => n.createdAt <= cutoff);
  if (expired.length) await sqWrite(db, (s) => expired.forEach((n) => s.delete(n.id)));
  return expired.length;
}

function sqToast(text, kind = 'ok', ms = 2000) {
  const host = document.getElementById('toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = text;
  host.append(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, ms);
}
