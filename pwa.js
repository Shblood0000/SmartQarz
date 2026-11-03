/* PWA layer: service worker, standalone detection, tutorial capsule, translated footer.
   Does not touch any existing SmartQarz logic. */
(function () {
  const KEY = 'sq-tutorial-dismissed';
  const DIR = { ckb: 'rtl', ku: 'rtl', en: 'ltr', ar: 'rtl' };
  const FOOT = {
    ckb: 'پارێزراوە بۆ تیمی شابڵۆد ٢٠٢٦',
    ku: 'پاراستییە بۆ تیمێ شابڵۆد ٢٠٢٦',
    en: 'Protected by Shablood Team 2026',
    ar: 'محفوظ لفريق شابڵۆد ٢٠٢٦'
  };
  const TUT = {
    ckb: {
      label: 'فێرکاری کورت', close: 'داخستن', dismiss: 'داخستنی فێرکاری',
      steps: [
        ['تۆمارکردنی قەرز', 'لە لاپەڕەی سەرەکی دوگمەی دروستکردنی قەرز هەڵبژێرە، جۆری قەرزەکە دیاری بکە، ناو و ژمارەی مۆبایل و بڕی پارەکە بنووسە، پاشان تۆماری بکە.'],
        ['بینینی قەرزەکان', 'لە قەرزەکانم قەرزە چالاکەکان دەبینیت. بۆ بینینی قەرزە تەواوبووەکان تەواوبوو هەڵبژێرە. بە ناو یان ژمارە بگەڕێ.'],
        ['دەستکاری و سڕینەوە', 'لەسەر کارتی هەر قەرزێک ئایکۆنی دەستکاری بۆ گۆڕین، یان ئایکۆنی سڕینەوە بۆ سڕینەوە بەکاربهێنە. سڕینەوە پشتڕاستکردنەوە دەوێت.'],
        ['نیشانەکردن وەک داوەتەوە', 'دوگمەی «قەرزەکەی داوەتەوە» لەسەر قەرزەکە بکرتێنە. قەرزەکە دەگوازرێتەوە بۆ تەواوبووەکان. بۆ گەڕاندنەوەی بۆ چالاک، دوگمەی «گەڕاندنەوە بۆ چالاک» بەکاربهێنە.'],
        ['ئاگادارکردنەوەکان', 'لە لاپەڕەی سەرەکی زەنگۆکەی سەرەوە بکرتێنە. کلیک لە ئاگادارکردنەوەیەک بکە بۆ خوێندنەوەی، یان هەموو وەک خوێندراوە نیشان بکە. ئاگادارکردنەوەکان دوای ٥ کاتژمێر خۆکارانە دەسڕێنەوە.'],
        ['ڕاپۆرتی PDF', 'لە لاپەڕەی سەرەکی دوگمەی PDF ڕاپۆرت هەڵبژێرە، پاشان دوگمەی پرینت بکە و لە پەنجەرەی پرینت «Save as PDF» هەڵبژێرە بۆ پاشەکەوتکردنی فایل.'],
        ['ڕێکخستن', 'لە ڕێکخستن دەتوانیت شێوازی ڕووناکی یان تاریک، زمانی ئەپ، پاشەکەوت و هاوردەکردنی داتا بگۆڕیت و دەربارەی ئەپ بخوێنیتەوە.']
      ]
    },
    ku: {
      label: 'Fêrkariya kurt', close: 'Bigire', dismiss: 'Girtina fêrkariyê',
      steps: [
        ['Tomarkirina deynê', 'Li rûpela sereke bişkojka «Deyn çêke» hilbijêre, cureyê deynê diyar bike, nav, hejmara mobîlê û mîqdarê binivîse, paşê tomar bike.'],
        ['Dîtina deynan', 'Di «Deynên min» de deynên çalak dibînî. Ji bo dîtina yên hatine dayîn «Qediyayî» hilbijêre. Bi nav an hejmarê bigere.'],
        ['Guherîn û jêbirin', 'Li ser kartê her deynekê ikona guherînê ji bo guhertinê, an ikona jêbirinê ji bo jêbirinê bikar bîne. Jêbirin pejirandinê dixwaze.'],
        ['Nîşankirina wekî hatiye dayîn', 'Bişkojka «Deyn hat dayîn» li ser deynê bikirtîne. Deyn dê here nav yên qediyayî. Ji bo vegerandina çalak, «Vegerîne çalak» bikirtîne.'],
        ['Agahdarî', 'Li rûpela sereke zengila jorîn bikirtîne. Li agahdariyekê bikirtîne da ku wê wekî xwendî nîşan bikî, an hemûyan wekî xwendî nîşan bike. Agahdarî piştî 5 saetan bi xweber tên jêbirin.'],
        ['Raporên PDF', 'Li rûpela sereke bişkojka «PDF rapor» hilbijêre, paşê bişkojka çapê bikirtîne û di pencereya çapê de «Save as PDF» hilbijêre.'],
        ['Mîhengan', 'Di mîhengan de dikarî şêweyê ronahî an tarî, zimanê sepanê, tomar û vegerandina daneyan biguherînî û derbarê sepanê bixwînî.']
      ]
    },
    en: {
      label: 'Quick tutorial', close: 'Close', dismiss: 'Dismiss tutorial',
      steps: [
        ['Register a debt', 'On Home, press Create debt, choose whether you owe or are owed, enter the name, phone number and amount, then press Save.'],
        ['View debts', 'Open My debts to see active debts. Switch to Completed to see paid debts. Search by name or phone number.'],
        ['Edit and delete', 'On a debt card, press the pencil icon to edit it, or the trash icon to delete it. Deleting asks for confirmation.'],
        ['Mark as paid', 'Press Mark as paid on a debt and it moves to Completed. Press Reopen to make it active again.'],
        ['Notifications', 'On Home, press the bell at the top to see notifications. Tap a notification to mark it as read, or use Mark all as read. Notifications are deleted automatically after 5 hours.'],
        ['PDF reports', 'On Home, press PDF reports, then press Print and choose Save as PDF in the print window to keep the file.'],
        ['Settings', 'In Settings you can change the appearance (light or dark), the app language, back up and restore your data, and read About the app.']
      ]
    },
    ar: {
      label: 'شرح مختصر', close: 'إغلاق', dismiss: 'إخفاء الشرح',
      steps: [
        ['تسجيل دين', 'من الصفحة الرئيسية اضغط إنشاء دين، واختر إن كنت مدينًا أو دائنًا، وأدخل الاسم ورقم الجوال والمبلغ، ثم اضغط حفظ.'],
        ['عرض الديون', 'افتح ديوني لرؤية الديون النشطة. انتقل إلى المكتملة لرؤية الديون المسددة. ابحث بالاسم أو رقم الجوال.'],
        ['التعديل والحذف', 'من بطاقة الدين اضغط أيقونة القلم للتعديل، أو أيقونة سلة المهملات للحذف. يطلب الحذف التأكيد.'],
        ['وضع علامة السداد', 'اضغط "تم السداد" على الدين فينتقل إلى المكتملة. لإعادته إلى النشطة اضغط "إعادة فتح".'],
        ['الإشعارات', 'من الصفحة الرئيسية اضغط الجرس في الأعلى لعرض الإشعارات. اضغط على إشعار لتحديده كمقروء، أو استخدم "تحديد الكل كمقروء". تُحذف الإشعارات تلقائيًا بعد 5 ساعات.'],
        ['تقارير PDF', 'من الصفحة الرئيسية اضغط تقارير PDF، ثم اضغط طباعة واختر Save as PDF في نافذة الطباعة لحفظ الملف.'],
        ['الإعدادات', 'من الإعدادات يمكنك تغيير المظهر (فاتح أو داكن) ولغة التطبيق، ونسخ البيانات واستعادتها، وقراءة حول التطبيق.']
      ]
    }
  };
  const ICON_TUT = '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>';
  const ICON_X = '<path d="M18 6 6 18M6 6l12 12"/>';

  const lang = () => (TUT[document.documentElement.lang] ? document.documentElement.lang : 'ckb');
  const dirOf = () => DIR[lang()];

  /* Standalone = launched from the home screen (iOS navigator.standalone, or display-mode on Android/desktop). */
  function isStandalone() {
    if (window.navigator.standalone === true) return true;
    return ['standalone', 'fullscreen', 'minimal-ui'].some((m) => window.matchMedia(`(display-mode: ${m})`).matches);
  }

  function paintFooter() {
    document.querySelectorAll('.sq-foot').forEach((el) => {
      el.textContent = FOOT[lang()];
      el.dir = dirOf();
    });
  }

  function paintCapsule() {
    const wrap = document.getElementById('tutWrap');
    if (!wrap) return;
    wrap.querySelector('.tut-label').textContent = TUT[lang()].label;
    wrap.querySelector('#tutX').setAttribute('aria-label', TUT[lang()].dismiss);
  }

  function buildCapsule() {
    const wrap = document.createElement('div');
    wrap.className = 'tut-wrap';
    wrap.id = 'tutWrap';
    wrap.innerHTML = `
      <button class="tut-capsule press" id="tutOpen"><span class="tut-ico"><svg class="ic" viewBox="0 0 24 24">${ICON_TUT}</svg></span><span class="tut-label"></span></button>
      <button class="tut-x press" id="tutX"><svg class="ic" viewBox="0 0 24 24">${ICON_X}</svg></button>`;
    document.body.append(wrap);
    wrap.querySelector('#tutOpen').addEventListener('click', openTutorial);
    wrap.querySelector('#tutX').addEventListener('click', () => {
      sessionStorage.setItem(KEY, '1');
      wrap.remove();
    });
  }

  function buildDialog() {
    const dlg = document.createElement('dialog');
    dlg.id = 'tutDialog';
    dlg.className = 'tut-dialog';
    dlg.innerHTML = `
      <div class="tut-top"><h2 class="tut-head"></h2>
        <button class="icon-btn press tut-xdlg"><svg class="ic" viewBox="0 0 24 24">${ICON_X}</svg></button></div>
      <ol class="tut-steps"></ol>
      <button class="btn ghost tut-close"></button>`;
    document.body.append(dlg);
    dlg.querySelector('.tut-xdlg').addEventListener('click', () => dlg.close());
    dlg.querySelector('.tut-close').addEventListener('click', () => dlg.close());
    return dlg;
  }

  function openTutorial() {
    const T = TUT[lang()];
    const dlg = document.getElementById('tutDialog') || buildDialog();
    dlg.dir = dirOf();
    dlg.querySelector('.tut-head').textContent = T.label;
    dlg.querySelector('.tut-close').textContent = T.close;
    dlg.querySelector('.tut-steps').replaceChildren(...T.steps.map(([head, body], i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="tut-n">${i + 1}</span><div><b></b><p></p></div>`;
      li.querySelector('b').textContent = head;
      li.querySelector('p').textContent = body;
      return li;
    }));
    dlg.showModal();
  }

  function init() {
    paintFooter();
    if (!isStandalone() && sessionStorage.getItem(KEY) !== '1') buildCapsule();
    paintCapsule();
    new MutationObserver(() => { paintFooter(); paintCapsule(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }
  init();
})();
