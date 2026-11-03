/* PDF reports: builds a black-and-white report from the saved debts.
   The print dialog's "Save as PDF" creates the PDF file. */
(function () {
  let db = null;
  const $ = (s) => document.querySelector(s);
  const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n);
  const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  const sum = (arr) => arr.reduce((s, d) => s + d.amount, 0);

  function getAllDebts() {
    return new Promise((res, rej) => {
      const r = db.transaction('debts').objectStore('debts').getAll();
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function section(title, rows) {
    const sec = el('section', 'rp-sec');
    sec.append(el('h3', '', title));
    if (!rows.length) {
      sec.append(el('p', 'rp-empty', 'هیچ قەرزێک نییە'));
      return sec;
    }
    const table = el('table', 'rp-table');
    const head = el('thead');
    const hr = el('tr');
    ['ناو', 'ژمارەی مۆبایل', 'بڕ', 'دۆخ', 'بەروار'].forEach((h) => hr.append(el('th', '', h)));
    head.append(hr);
    const body = el('tbody');
    rows.forEach((d) => {
      const tr = el('tr');
      [d.name, d.phone, fmtNum(d.amount), d.paid ? 'تەواوبوو' : 'چالاک', fmtDate(d.date)]
        .forEach((v) => tr.append(el('td', '', v)));
      body.append(tr);
    });
    table.append(head, body);
    sec.append(table, el('p', 'rp-total', 'کۆی گشتی: ' + fmtNum(sum(rows))));
    return sec;
  }

  async function build() {
    if (!db) return;
    const doc = document.getElementById('reportDoc');
    const all = await getAllDebts();
    const byDate = (a, b) => b.date.localeCompare(a.date);
    const owe = all.filter((d) => d.type === 'owe_me').sort(byDate);
    const iOwe = all.filter((d) => d.type === 'i_owe').sort(byDate);

    const head = el('div', 'rp-head');
    head.append(el('span', 'rp-brand', 'SmartQarz'), el('span', 'rp-date', fmtDate(new Date().toISOString())));
    const foot = el('div', 'rp-foot');
    foot.append(el('b', '', 'Shablood'), el('span', '', 'پارێزراوە بۆ تیمی شابڵۆد'));

    doc.replaceChildren(
      head,
      el('h2', 'rp-title', 'قەرزەکان'),
      section('کەسانێک قەرزیان لەسەرمە', owe),
      section('کەسانێک من قەرزارم بۆیان', iOwe),
      foot
    );
  }

  (async function init() {
    db = await sqOpenDB();
    const tile = document.querySelector('[data-go="report"]');
    if (tile) tile.addEventListener('click', () => build());
    const printBtn = $('#printBtn');
    if (printBtn) printBtn.addEventListener('click', async () => {
      await build();
      window.print();
    });
  })();
})();
