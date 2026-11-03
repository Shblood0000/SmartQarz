const DB_NAME = 'SmartQarz', STORE = 'debts';
const LANG_DIR = { ckb: 'rtl', ku: 'rtl', en: 'ltr', ar: 'rtl' };
const IDX = { ckb: 0, ku: 1, en: 2, ar: 3 };
const STR = {
  app: ['SmartQarz', 'SmartQarz', 'SmartQarz', 'SmartQarz'],
  tile_report: ['PDF ڕاپۆرت', 'PDF rapor', 'PDF reports', 'تقارير PDF'],
  report_title: ['PDF ڕاپۆرت', 'PDF rapor', 'PDF reports', 'تقارير PDF'],
  report_hint: ['ڕاپۆرتی هەموو قەرزەکان ئامادە دەکات. بۆ پاشەکەوتکردن وەک PDF، دوگمەی پرینت بکە و «Save as PDF» هەڵبژێرە.', 'Raporeke hemû deynan amade dike. Ji bo tomarkirinê wekî PDF, bişkojka çapê bikirtîne û «Save as PDF» hilbijêre.', 'Prepares a report of all debts. To keep it as a PDF, press Print and choose Save as PDF.', 'يجهز تقريرًا بجميع الديون. للحفظ كملف PDF اضغط طباعة واختر Save as PDF.'],
  report_print: ['پرینت / PDF', 'Çap / PDF', 'Print / PDF', 'طباعة / PDF'],
  notif_title: ['ئاگادارکردنەوە', 'ئاگادارکردنەوە', 'ئاگادارکردنەوە', 'ئاگادارکردنەوە'],
  nav_home: ['سەرەکی', 'Serêkî', 'Home', 'الرئيسية'],
  nav_settings: ['ڕێکخستن', 'Mîhengan', 'Settings', 'الإعدادات'],
  home_net: ['باڵانسی گشتی', 'Bilanço giştî', 'Net balance', 'الرصيد الصافي'],
  home_owed: ['قەرزی بۆ من', 'Deyna ji min re', 'Owed to me', 'مستحق لي'],
  home_iowe: ['قەرزی من', 'Deyna min', 'I owe', 'ما عليّ'],
  home_active: ['قەرزی چالاک', 'Deynên çalak', 'Active debts', 'ديون نشطة'],
  home_done: ['تەواوبوو', 'Qediyayî', 'Completed', 'مكتملة'],
  tile_create: ['دروستکردنی قەرز', 'Deyn çêke', 'Create debt', 'إنشاء دين'],
  tile_debts: ['قەرزەکانم', 'Deynên min', 'My debts', 'ديوني'],
  tile_stats: ['ئامار و پوختە', 'Statîstîk', 'Statistics', 'الإحصاءات'],
  create_title: ['دروستکردنی قەرز', 'Deyn çêke', 'Create debt', 'إنشاء دين'],
  edit_title: ['دەستکاری', 'Guherîn', 'Edit debt', 'تعديل الدين'],
  type_iowe: ['من قەرزارم', 'Ez deyndar im', 'I owe', 'أنا مدين'],
  type_oweme: ['کەسێک قەرزارمە', 'Kesek deyndarê min e', 'Someone owes me', 'شخص مدين لي'],
  f_name: ['ناوی سیانی', 'Navê tevahî', 'Full name', 'الاسم الكامل'],
  f_phone: ['ژمارەی مۆبایل', 'Hejmara mobîlê', 'Mobile number', 'رقم الجوال'],
  f_amount: ['بڕی قەرز', 'Mîqdara deynê', 'Amount', 'المبلغ'],
  f_note: ['زانیاری ورد (ئارەزوومەندانە)', 'Agahiyên zêde (vebijarkî)', 'Notes (optional)', 'ملاحظات (اختياري)'],
  btn_save: ['تۆمارکردن', 'Tomar bike', 'Save', 'حفظ'],
  btn_update: ['پاشەکەوتکردن', 'Nûve bike', 'Update', 'تحديث'],
  debts_search: ['گەڕان بە ناو یان ژمارە', 'Li navê an hejmarê bigere', 'Search by name or phone', 'ابحث بالاسم أو الرقم'],
  filter_active: ['چالاک', 'Çalak', 'Active', 'نشطة'],
  filter_done: ['تەواوبوو', 'Qediyayî', 'Completed', 'مكتملة'],
  group_oweme: ['کەسانێک قەرزیان لەسەرمە', 'Kesên deynê wan li ser min e', 'People who owe me', 'أشخاص مدينون لي'],
  group_iowe: ['کەسانێک من قەرزارم بۆیان', 'Kesên ez deyndarê wan im', 'People I owe', 'أشخاص أنا مدين لهم'],
  empty: ['هیچ قەرزێک نییە. قەرزێکی نوێ دروست بکە.', 'Deyn tune. Deynekî nû çêke.', 'No debts yet. Create a new one.', 'لا توجد ديون بعد. أنشئ دينًا جديدًا.'],
  kind_oweme: ['قەرزارە بە من', 'Deyndarê min', 'Owes me', 'مدين لي'],
  kind_iowe: ['من قەرزارم', 'Ez deyndar im', 'I owe', 'أنا مدين'],
  badge_active: ['چالاک', 'Çalak', 'Active', 'نشط'],
  badge_done: ['تەواوبوو', 'Qediyayî', 'Completed', 'مكتمل'],
  btn_paid: ['قەرزەکەی داوەتەوە', 'Deyn hat dayîn', 'Mark as paid', 'تم السداد'],
  btn_reopen: ['گەڕاندنەوە بۆ چالاک', 'Vegerîne çalak', 'Reopen', 'إعادة فتح'],
  btn_edit: ['دەستکاری', 'Guherîn', 'Edit', 'تعديل'],
  btn_delete: ['سڕینەوە', 'Jêbirin', 'Delete', 'حذف'],
  btn_back: ['گەڕانەوە', 'Vegere', 'Back', 'رجوع'],
  btn_cancel: ['هەڵوەشاندنەوە', 'Betal bike', 'Cancel', 'إلغاء'],
  btn_confirm: ['بەڵێ، بسڕەوە', 'Erê, jê bibe', 'Yes, delete', 'نعم، احذف'],
  confirm_q: ['قەرزی {name} بسڕدرێتەوە؟', 'Deynê {name} were jêbirin?', 'Delete the debt of {name}?', 'هل تريد حذف دين {name}؟'],
  msg_fill: ['تکایە خانەکان پڕبکەوە', 'Ji kerema xwe qutiyan tijî bike', 'Please fill in the required fields', 'يرجى ملء الحقول المطلوبة'],
  msg_phone: ['ژمارەی مۆبایل هەڵەیە', 'Hejmara mobîlê çewt e', 'Invalid mobile number', 'رقم الجوال غير صحيح'],
  msg_amount: ['بڕی قەرز هەڵەیە', 'Mîqdara deynê çewt e', 'Invalid amount', 'المبلغ غير صحيح'],
  msg_dup: ['ئەم قەرزە پێشتر تۆمارکراوە', 'Ev deyn berê hatiye tomarkirin', 'This debt is already saved', 'هذا الدين محفوظ مسبقًا'],
  msg_saved: ['بە سەرکەوتوویی تۆمارکرا', 'Bi serkeftî hat tomarkirin', 'Saved successfully', 'تم الحفظ بنجاح'],
  msg_updated: ['بە سەرکەوتوویی نوێکرایەوە', 'Bi serkeftî hat nûvekirin', 'Updated successfully', 'تم التحديث بنجاح'],
  msg_deleted: ['قەرزەکە سڕایەوە', 'Deyn hat jêbirin', 'Debt deleted', 'تم حذف الدين'],
  msg_paid: ['وەک داوەتەوە نیشانە کرا', 'Wekî hatiye dayîn hat nîşankirin', 'Marked as paid', 'تم وضع علامة السداد'],
  msg_reopened: ['گەڕێندرایەوە بۆ چالاک', 'Vegeriya çalak', 'Reopened', 'تمت إعادة الفتح'],
  msg_imported: ['داتاکان بە سەرکەوتوویی هاوردە کران', 'Dane bi serkeftî hatin anîn', 'Data imported', 'تم استيراد البيانات'],
  msg_badfile: ['فایلەکە دروست نییە', 'Pel rast nîne', 'Invalid backup file', 'ملف النسخة الاحتياطية غير صالح'],
  stats_title: ['ئامار و پوختە', 'Statîstîk', 'Statistics', 'الإحصاءات'],
  stats_owed: ['پارەی قەرزی بۆ من', 'Deyna ji min re', 'Owed to me', 'المستحق لي'],
  stats_iowe: ['پارەی قەرزی من', 'Deyna min', 'I owe', 'ما عليّ'],
  stats_balance: ['باڵانسی ماوە', 'Bilanço', 'Remaining balance', 'الرصيد المتبقي'],
  set_title: ['ڕێکخستن', 'Mîhengan', 'Settings', 'الإعدادات'],
  set_appearance: ['شێوازی ڕووناکی', 'Şêweyê ronahiyê', 'Appearance', 'المظهر'],
  set_appearance_d: ['ڕووناک یان تاریک', 'Ronahî an tarî', 'Light or dark theme', 'فاتح أو داكن'],
  set_language: ['زمان', 'Ziman', 'Language', 'اللغة'],
  set_language_d: ['گۆڕینی زمانی ئەپ', 'Zimanê sepanê biguherîne', 'Change the app language', 'تغيير لغة التطبيق'],
  set_data: ['پاشەکەوت و هاوردە', 'Tomar û vegerandin', 'Backup and restore', 'النسخ الاحتياطي والاستعادة'],
  set_data_d: ['هەناردە و هاوردەکردنی داتا', 'Daneyan derxe û bîne', 'Export and import your data', 'تصدير البيانات واستيرادها'],
  set_about: ['دەربارەی ئەپ', 'Derbarê sepanê', 'About the app', 'حول التطبيق'],
  set_about_d: ['زانیاری و وەشان', 'Agahî û guhertoo', 'Version and privacy', 'الإصدار والخصوصية'],
  ap_light: ['ڕووناک', 'Ronahî', 'Light', 'فاتح'],
  ap_dark: ['تاریک', 'Tarî', 'Dark', 'داكن'],
  data_export: ['هەناردەکردنی داتا (JSON)', 'Daneyan derxe (JSON)', 'Export data (JSON)', 'تصدير البيانات (JSON)'],
  data_export_d: ['فایلێکی پاشەکەوت دروست دەکات', 'Pelekî tomarê çêdike', 'Creates a backup file', 'ينشئ ملف نسخة احتياطية'],
  data_import: ['هاوردەکردنی داتا (JSON)', 'Daneyan bîne (JSON)', 'Import data (JSON)', 'استيراد البيانات (JSON)'],
  data_import_d: ['لە فایلی پاشەکەوت بیگەڕێنەوە', 'Ji pelê tomarê vegerîne', 'Restore from a backup file', 'الاستعادة من ملف احتياطي'],
  version: ['وەشان', 'Guhertoo', 'Version', 'الإصدار'],
  privacy_t: ['تایبەتمەندی', 'Nepenîtî', 'Privacy', 'الخصوصية'],
  privacy_d: ['هەموو داتاکانت تەنها لەسەر ئەم ئامێرە پاشەکەوت دەکرێن', 'Hemû daneyên te tenê li ser vê amûrê tên tomarkirin', 'All your data stays on this device', 'جميع بياناتك تُحفظ على هذا الجهاز فقط']
};
const TITLE = { home: 'app', create: 'create_title', debts: 'tile_debts', stats: 'stats_title', settings: 'set_title', appearance: 'set_appearance', language: 'set_language', data: 'set_data', about: 'set_about', notifications: 'notif_title', report: 'report_title' };
const PARENT = { notifications: 'home', report: 'home', create: 'home', debts: 'home', stats: 'home', appearance: 'settings', language: 'settings', data: 'settings', about: 'settings' };
const TABS = ['home', 'settings'];

let lang = 'ckb', db = null, debts = [], filter = 'active', search = '', editId = null, pendingDeleteId = null;
let trail = ['home'], current = 'home';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const t = (k, vars = {}) => {
  let s = STR[k] ? STR[k][IDX[lang]] : k;
  for (const [a, b] of Object.entries(vars)) s = s.replace(`{${a}}`, b);
  return s;
};
const fmt = (n) => new Intl.NumberFormat('en-US').format(n);
const sum = (arr) => arr.reduce((s, d) => s + d.amount, 0);
const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

function toast(key, kind = 'ok', ms = 2000) {
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = STR[key] ? t(key) : key;
  $('#toasts').append(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, ms);
}

/* ---------- Storage (IndexedDB) ---------- */
const openDB = sqOpenDB;
const store = (mode) => db.transaction(STORE, mode).objectStore(STORE);
const done = (req) => new Promise((res, rej) => { req.onsuccess = () => res(req.result); req.onerror = () => rej(req.error); });
const saveDebt = (d) => done(store('readwrite').put(d));
const removeDebt = (id) => done(store('readwrite').delete(id));
async function loadDebts() { debts = await done(store('readonly').getAll()); }

/* ---------- Language, theme ---------- */
function applyLang(code) {
  lang = code;
  localStorage.setItem('sq-lang', code);
  document.documentElement.lang = code;
  document.documentElement.dir = LANG_DIR[code];
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  $$('[data-lang-set]').forEach((b) => b.classList.toggle('on', b.dataset.langSet === code));
  renderAll();
  show(current);
}

function applyTheme(mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('sq-theme', mode);
  $$('[data-theme-set]').forEach((b) => b.classList.toggle('on', b.dataset.themeSet === mode));
}

/* ---------- Navigation ---------- */
function show(name) {
  $$('.view').forEach((v) => { v.hidden = v.id !== 'v-' + name; });
  const el = $('#v-' + name);
  el.classList.remove('enter'); void el.offsetWidth; el.classList.add('enter');
  $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.go === (PARENT[name] || name)));
  const key = name === 'create' && editId !== null ? 'edit_title' : TITLE[name];
  $('#title').textContent = t(key);
  $('#backBtn').hidden = TABS.includes(name);
  $('#bellBtn').hidden = name !== 'home';
  if (name === 'notifications') renderNotifs();
  if (name === 'debts') renderDebts();
  if (name === 'stats') renderStats();
  window.scrollTo(0, 0);
}
function go(name, push = true) {
  if (TABS.includes(name)) trail = [name];
  else if (push && trail[trail.length - 1] !== name) trail.push(name);
  current = name;
  show(name);
}
function back() {
  trail.pop();
  go(trail[trail.length - 1] || 'home', false);
}
$$('[data-go]').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.go === 'create') resetForm();
  go(b.dataset.go);
}));
$('#backBtn').addEventListener('click', () => { editId = null; resetForm(); back(); });
$$('[data-theme-set]').forEach((b) => b.addEventListener('click', () => applyTheme(b.dataset.themeSet)));
$$('[data-lang-set]').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.langSet)));

/* ---------- Create / Edit ---------- */
function resetForm() {
  editId = null;
  $('#debtForm').reset();
  $('#saveLabel').textContent = t('btn_save');
}

function startEdit(d) {
  editId = d.id;
  const f = $('#debtForm');
  f.elements.debtType.value = d.type;
  f.elements.fullName.value = d.name;
  f.elements.phone.value = d.phone;
  f.elements.amount.value = d.amount;
  f.elements.note.value = d.note || '';
  $('#saveLabel').textContent = t('btn_update');
  go('create');
}

$('#debtForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const name = f.elements.fullName.value.trim();
  const phone = f.elements.phone.value.replace(/[\s-]/g, '');
  const raw = f.elements.amount.value.trim();
  const amount = Number(raw);
  const type = f.elements.debtType.value;
  const note = f.elements.note.value.trim();

  if (!name || !phone || !raw) return toast('msg_fill', 'warn');
  if (!/^07\d{9}$/.test(phone)) return toast('msg_phone', 'warn');
  if (!(amount > 0)) return toast('msg_amount', 'warn');

  const dup = debts.find((d) => d.id !== editId && !d.paid && d.type === type &&
    d.name === name && d.phone === phone && d.amount === amount);
  if (dup) return toast('msg_dup', 'warn');

  const wasEdit = editId !== null;
  const rec = wasEdit
    ? { ...debts.find((d) => d.id === editId), type, name, phone, amount, note }
    : { id: crypto.randomUUID(), type, name, phone, amount, note, paid: false, date: new Date().toISOString() };

  await saveDebt(rec);
  await loadDebts();
  resetForm();
  toast(wasEdit ? 'msg_updated' : 'msg_saved');
  renderAll();
  if (wasEdit) go('debts', false);
});

/* ---------- Rendering ---------- */
function totals() {
  const open = debts.filter((d) => !d.paid);
  const owedMe = sum(open.filter((d) => d.type === 'owe_me'));
  const iOwe = sum(open.filter((d) => d.type === 'i_owe'));
  return { owedMe, iOwe, active: open.length, done: debts.length - open.length, net: owedMe - iOwe };
}

function renderHome() {
  const t2 = totals();
  $('#h-net').textContent = fmt(t2.net);
  $('#s-owed').textContent = fmt(t2.owedMe);
  $('#s-iowe').textContent = fmt(t2.iOwe);
  $('#s-active').textContent = t2.active;
  $('#s-done').textContent = t2.done;
}

function renderStats() {
  const t2 = totals();
  $('#st-active').textContent = t2.active;
  $('#st-done').textContent = t2.done;
  $('#st-owed').textContent = fmt(t2.owedMe);
  $('#st-iowe').textContent = fmt(t2.iOwe);
  $('#st-net').textContent = fmt(t2.net);
  const max = Math.max(t2.owedMe, t2.iOwe, 1);
  $('#bar-owed').style.width = (t2.owedMe / max * 100) + '%';
  $('#bar-iowe').style.width = (t2.iOwe / max * 100) + '%';
}

function card(d) {
  const el = document.createElement('article');
  el.className = 'card debt' + (d.paid ? ' paid' : '');
  el.innerHTML = `
    <div class="debt-head">
      <div><h3></h3><p class="phone"></p></div>
      <span class="badge">${d.paid ? t('badge_done') : t('badge_active')}</span>
    </div>
    <div class="amount"></div>
    <p class="note"></p>
    <div class="meta"><span>${d.type === 'owe_me' ? t('kind_oweme') : t('kind_iowe')}</span><span class="date"></span></div>
    <div class="actions">
      <button class="btn ghost press" data-act="toggle"><svg class="ic"><use href="#${d.paid ? 'i-undo' : 'i-check'}"/></svg><span>${d.paid ? t('btn_reopen') : t('btn_paid')}</span></button>
      <button class="icon-btn press" data-act="edit" aria-label="${t('btn_edit')}"><svg class="ic"><use href="#i-edit"/></svg></button>
      <button class="icon-btn danger press" data-act="delete" aria-label="${t('btn_delete')}"><svg class="ic"><use href="#i-trash"/></svg></button>
    </div>`;
  el.querySelector('h3').textContent = d.name;
  el.querySelector('.phone').textContent = d.phone;
  el.querySelector('.amount').textContent = fmt(d.amount);
  const note = el.querySelector('.note');
  note.textContent = d.note || '';
  note.hidden = !d.note;
  el.querySelector('.date').textContent = fmtDate(d.date);
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (b) act(d.id, b.dataset.act);
  });
  return el;
}

function renderDebts() {
  const q = search.toLowerCase();
  const list = debts
    .filter((d) => (filter === 'active' ? !d.paid : d.paid))
    .filter((d) => !q || d.name.toLowerCase().includes(q) || d.phone.includes(q))
    .sort((a, b) => b.date.localeCompare(a.date));
  const owe = list.filter((d) => d.type === 'owe_me');
  const iOwe = list.filter((d) => d.type === 'i_owe');
  $('#list-owe-me').replaceChildren(...owe.map(card));
  $('#list-i-owe').replaceChildren(...iOwe.map(card));
  $('#groupOweMe').hidden = !owe.length;
  $('#groupIOwe').hidden = !iOwe.length;
  $('#empty').hidden = list.length > 0;
}

function renderAll() {
  renderHome();
  renderDebts();
  renderStats();
}

/* ---------- Actions ---------- */
async function act(id, kind) {
  const d = debts.find((x) => x.id === id);
  if (!d) return;
  if (kind === 'edit') return startEdit(d);
  if (kind === 'delete') return askDelete(d);
  if (kind === 'toggle') {
    d.paid = !d.paid;
    await saveDebt(d);
    toast(d.paid ? 'msg_paid' : 'msg_reopened');
    await loadDebts();
    renderAll();
  }
}

function askDelete(d) {
  pendingDeleteId = d.id;
  pendingKind = 'debt';
  $('#confirmText').textContent = t('confirm_q', { name: d.name });
  $('#confirm').showModal();
}
$('#cancelDel').addEventListener('click', () => $('#confirm').close());
$('#okDel').addEventListener('click', async () => {
  $('#confirm').close();
  if (pendingKind === 'notes-all') {
    await sqRemoveAll(db);
    await refreshNotes();
    toast('هەموو ئاگادارکردنەوەکان سڕانەوە');
    return;
  }
  await removeDebt(pendingDeleteId);
  await loadDebts();
  renderAll();
  toast('msg_deleted');
});

$$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
  filter = b.dataset.filter;
  $$('[data-filter]').forEach((x) => x.classList.toggle('on', x === b));
  renderDebts();
}));
$('#search').addEventListener('input', (e) => {
  search = e.target.value.trim();
  renderDebts();
});

/* ---------- Backup and restore ---------- */
$('#exportBtn').addEventListener('click', () => {
  const data = { app: 'SmartQarz', version: '1.0.0', exportedAt: new Date().toISOString(), debts };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: `SmartQarz-backup-${new Date().toISOString().slice(0, 10)}.json`
  });
  a.click();
  URL.revokeObjectURL(url);
});

$('#importInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.debts)) throw new Error('invalid');
    const valid = data.debts.filter((d) => d && d.id && d.name && d.phone && d.amount > 0 &&
      ['owe_me', 'i_owe'].includes(d.type));
    for (const d of valid) await saveDebt(d);
    await loadDebts();
    renderAll();
    toast('msg_imported');
  } catch {
    toast('msg_badfile', 'warn');
  }
  e.target.value = '';
});

/* ---------- Init ---------- */
(async function init() {
  applyTheme(localStorage.getItem('sq-theme') || 'dark');
  applyLang(localStorage.getItem('sq-lang') || 'ckb');
  db = await openDB();
  await sqPurge(db);
  await refreshNotes();
  wireSync();
  await loadDebts();
  renderAll();
  go('home', false);
})();

/* ---------- Notifications ---------- */
let pendingKind = 'debt';
let notes = [];
const fmtTime = (ms) => new Date(ms).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

async function refreshNotes() {
  notes = await sqAll(db);
  const c = notes.filter((n) => !n.read).length;
  const badge = $('#bellCount');
  badge.textContent = c > 99 ? '99+' : c;
  badge.hidden = c === 0;
  if (!$('#v-notifications').hidden) renderNotifs();
}

function renderNotifs() {
  $('#notifList').replaceChildren(...notes.map(noteCard));
  $('#notifEmpty').hidden = notes.length > 0;
  $('#notifActions').hidden = notes.length === 0;
}

function noteCard(n) {
  const el = document.createElement('article');
  el.className = 'card notif' + (n.read ? '' : ' unread');
  el.innerHTML = `<span class="dot"></span><div class="note-body"><p></p><small></small></div><button class="icon-btn danger press" aria-label="سڕینەوە"><svg class="ic"><use href="#i-trash"/></svg></button>`;
  el.querySelector('p').textContent = n.message;
  el.querySelector('small').textContent = fmtTime(n.createdAt);
  el.addEventListener('click', async (e) => {
    if (e.target.closest('button')) {
      await sqRemove(db, n.id);
      toast('ئاگادارکردنەوەکە سڕایەوە');
    } else if (!n.read) {
      await sqSave(db, { ...n, read: true });
    }
    await refreshNotes();
  });
  return el;
}

$('#bellBtn').addEventListener('click', () => go('notifications'));
$('#markAllBtn').addEventListener('click', async () => {
  await sqMarkAllRead(db);
  await refreshNotes();
  toast('هەموو بینراوە کرا');
});
$('#clearAllBtn').addEventListener('click', () => {
  pendingKind = 'notes-all';
  $('#confirmText').textContent = 'ئایا دڵنیایت لە سڕینەوەی هەموو ئاگادارکردنەوەکان؟';
  $('#confirm').showModal();
});

function wireSync() {
  if (sqChannel) sqChannel.onmessage = () => refreshNotes();
  const tick = async () => { await sqPurge(db); await refreshNotes(); };
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  setInterval(tick, 60000);
}
