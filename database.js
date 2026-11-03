const $ = (s) => document.querySelector(s);
let db = null, editing = null, pendingId = null;
const fmtTime = (ms) => new Date(ms).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function show(view) {
  ['list', 'create'].forEach((v) => {
    const el = $('#v-' + v);
    el.hidden = v !== view;
    if (v === view) { el.classList.remove('enter'); void el.offsetWidth; el.classList.add('enter'); }
  });
  $('#backBtn').hidden = view === 'list';
  $('#title').textContent = view === 'create' ? (editing ? 'دەستکاری' : 'دروستکردن') : 'تۆمارکردنی ئاگادارکردنەوە';
  window.scrollTo(0, 0);
}

function item(n) {
  const el = document.createElement('article');
  el.className = 'card notif' + (n.read ? '' : ' unread');
  el.innerHTML = `
    <span class="dot"></span>
    <div class="note-body"><p></p><small></small><span class="status"></span></div>
    <div class="row-btns">
      <button class="icon-btn press" data-act="edit" aria-label="دەستکاری"><svg class="ic"><use href="#i-edit"/></svg></button>
      <button class="icon-btn danger press" data-act="delete" aria-label="سڕینەوە"><svg class="ic"><use href="#i-trash"/></svg></button>
    </div>`;
  el.querySelector('p').textContent = n.message;
  el.querySelector('small').textContent = fmtTime(n.createdAt);
  el.querySelector('.status').textContent = n.read ? 'خوێندراوەتەوە' : 'نەخوێندراوە';
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    if (b.dataset.act === 'edit') startEdit(n);
    else askDelete(n);
  });
  return el;
}

async function refresh() {
  const list = await sqAll(db);
  $('#createdList').replaceChildren(...list.map(item));
  $('#emptyList').hidden = list.length > 0;
}

function startEdit(n) {
  editing = n;
  $('#noteText').value = n.message;
  $('#saveLabel').textContent = 'پاشەکەوتکردن';
  show('create');
}

$('#newBtn').addEventListener('click', () => {
  editing = null;
  $('#noteText').value = '';
  $('#saveLabel').textContent = 'دروستکردن';
  show('create');
});

$('#backBtn').addEventListener('click', () => {
  editing = null;
  $('#noteText').value = '';
  show('list');
});

$('#noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = $('#noteText').value.trim();
  if (!message) return sqToast('وتەکەت بنووسە', 'warn', 2000);
  if (editing) {
    await sqSave(db, { ...editing, message });
    sqToast('ئاگادارکردنەوەکە نوێکرایەوە');
  } else {
    await sqSave(db, { id: crypto.randomUUID(), message, createdAt: Date.now(), read: false });
    sqToast('بە سەرکەوتوویی تۆمارکرا');
  }
  $('#noteText').value = '';
  editing = null;
  show('list');
  await refresh();
});

function askDelete(n) {
  pendingId = n.id;
  $('#confirmText').textContent = 'ئایا دڵنیایت لە سڕینەوەی ئەم ئاگادارکردنەوەیە؟';
  $('#confirm').showModal();
}
$('#cancelDel').addEventListener('click', () => $('#confirm').close());
$('#okDel').addEventListener('click', async () => {
  $('#confirm').close();
  await sqRemove(db, pendingId);
  await refresh();
  sqToast('ئاگادارکردنەوەکە سڕایەوە');
});

(async function init() {
  document.documentElement.dataset.theme = localStorage.getItem('sq-theme') || 'dark';
  db = await sqOpenDB();
  await sqPurge(db);
  await refresh();
  show('list');
  if (sqChannel) sqChannel.onmessage = () => refresh();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sqPurge(db).then(refresh); });
  setInterval(async () => { await sqPurge(db); await refresh(); }, 60000);
})();
