/* VEILWARD — veil.js
   사이드바 서랍 · 스크롤 등장 · 표지 플래시 · 수면 아래로 · 인물 명부(필터/파일 창) · 페소 만들기 */
(function () {
  var doc = document, root = doc.documentElement, body = doc.body;
  root.classList.add('js');
  var $ = function (s, el) { return (el || doc).querySelector(s); };
  var $$ = function (s, el) { return [].slice.call((el || doc).querySelectorAll(s)); };
  var still = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  /* ---- 사이드바 서랍 (폰) ---- */
  var menuBtn = $('.vx-menu-btn');
  function setMenu(open) {
    body.classList.toggle('vx-open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(!body.classList.contains('vx-open')); });
  var scrim = $('.vx-scrim');
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
  $$('.vx-side a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---- 세력 페이지: 보고 있는 장을 사이드바에 표시 ---- */
  var spyLinks = $$('.vx-side a[data-spy]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        spyLinks.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('data-spy') === en.target.id); });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    spyLinks.forEach(function (a) { var t = doc.getElementById(a.getAttribute('data-spy')); if (t) spy.observe(t); });
  }

  /* ---- 스크롤 등장 / 표지 플래시 ---- */
  var reveal = $$('[data-reveal], .vx-ch, .vw-head');
  var covers = $$('.vw-cover');
  function show(el) { el.classList.add('is-in'); }
  if (!('IntersectionObserver' in window)) {
    reveal.concat(covers).forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveal.forEach(function (el) { io.observe(el); });
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io2.unobserve(en.target); } });
    }, { threshold: 0.35 });
    covers.forEach(function (el) { io2.observe(el); });
  }

  /* ---- 사진이 있으면 자리 안내를 숨긴다 ---- */
  function whenImage(src, fn) { var img = new Image(); img.onload = fn; img.src = src; }
  covers.forEach(function (c) { var s = c.getAttribute('data-portrait'); if (s) whenImage(s, function () { c.classList.add('has-portrait'); }); });
  $$('[data-img]').forEach(function (el) {
    var s = el.getAttribute('data-img');
    whenImage(s, function () {
      var box = el.querySelector('.img'); if (box) box.style.backgroundImage = 'url("' + s + '")';
      el.classList.add('has-img');
    });
  });

  /* ---- 메인: 수면 아래로 ---- */
  var sinks = $$('.vw-sink');
  if (sinks.length) {
    var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var seg = function (p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); };
    var queued = false;
    var sinkUpdate = function () {
      queued = false;
      sinks.forEach(function (st) {
        var pin = st.querySelector('.vw-sink-pin'), img = st.querySelector('.vw-sink-img'), head = st.querySelector('.vw-sink-head');
        if (still.matches) { img.style.transform = head.style.opacity = head.style.transform = ''; return; }
        var navH = parseFloat(getComputedStyle(pin).top) || 0;
        var run = st.offsetHeight - pin.offsetHeight;
        var p = run > 0 ? Math.min(1, Math.max(0, (navH - st.getBoundingClientRect().top) / run)) : 1;
        var e = ease(seg(p, .06, .76)), k = seg(p, .78, .92);
        img.style.transform = 'translate3d(0,' + (-e * 45).toFixed(3) + '%,0)';
        head.style.opacity = k;
        head.style.transform = 'translate3d(0,' + (16 * (1 - k)).toFixed(1) + 'px,0)';
      });
    };
    var queue = function () { if (!queued) { queued = true; requestAnimationFrame(sinkUpdate); } };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    if (still.addEventListener) still.addEventListener('change', queue);
    sinkUpdate();
  }

  /* ---- 인물 명부: 소속 거르기 ---- */
  var filters = $$('.vx-filter button');
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.getAttribute('data-filter');
      filters.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.vx-file').forEach(function (f) {
        var groups = (f.getAttribute('data-group') || '').split(' ');
        f.hidden = !(g === 'all' || groups.indexOf(g) > -1);
      });
    });
  });

  /* ---- 인물 명부: 파일 창 ---- */
  function openFile(id) {
    var d = doc.getElementById('file-' + id);
    if (!d) return;
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    d.scrollTop = 0;
  }
  $$('.vx-file.open').forEach(function (f) {
    f.addEventListener('click', function () { openFile(f.getAttribute('data-file')); });
  });
  $$('.vx-modal').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $$('[data-close]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
  });
  if (location.hash.indexOf('#file-') === 0) openFile(location.hash.slice(6));
  /* 가려진 칸 · 스포일러: 누르면 드러나고, 다시 누르면 가려짐 */
  $$('.vx-redact, .vx-spoiler').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var on = b.classList.toggle('is-open');
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  });
  $$('[data-swap]').forEach(function (b) {
    b.addEventListener('click', function () { var d = b.closest('dialog'); if (d) d.close(); openFile(b.getAttribute('data-swap')); });
  });

  /* ---- 페소 만들기 ---- */
  var form = $('#persona-form');
  if (form) {
    var out = $('#persona-out'), count = $('#persona-count'), toast = $('.vx-toast');
    var casting = '';
    var lines = [
      ['name', '이름'], ['truename', '진명'], ['race', '종족'], ['look', '외향'],
      ['outfit', '의상'], ['scent', '향기'], ['likes', '호불호']
    ];
    var render = function () {
      var rows = [];
      lines.forEach(function (l) {
        var v = (form.elements[l[0]].value || '').trim();
        if (v) rows.push(l[1] + ': ' + v.replace(/\n+/g, ' '));
      });
      var aff = form.querySelector('input[name="affil"]:checked');
      var affV = aff ? aff.value : '';
      if (affV === '그 외') { var etc = (form.elements.affilEtc.value || '').trim(); affV = etc ? etc : '그 외'; }
      if (affV) rows.push('소속: ' + affV);
      if (casting) rows.push('추천 페소: ' + casting);
      out.value = rows.length ? '[페르소나]\n' + rows.join('\n') : '';
      count.textContent = out.value.length + '자';
    };
    form.addEventListener('input', render);
    form.addEventListener('change', render);
    $$('[data-cast] button').forEach(function (b) {
      b.addEventListener('click', function () {
        var on = !b.classList.contains('on');
        $$('[data-cast] button').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
        if (on) { b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); }
        casting = on ? b.getAttribute('data-v') : '';
        render();
      });
    });
    var say = function (msg) {
      if (!toast) return;
      toast.textContent = msg; toast.classList.add('show');
      clearTimeout(say.t); say.t = setTimeout(function () { toast.classList.remove('show'); }, 1600);
    };
    $('#persona-copy').addEventListener('click', function () {
      if (!out.value) { say('아직 적은 항목이 없어요'); return; }
      var done = function () { say('복사했어요'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(out.value).then(done, function () { out.select(); doc.execCommand('copy'); done(); });
      } else { out.select(); doc.execCommand('copy'); done(); }
    });
    $('#persona-reset').addEventListener('click', function () {
      form.reset(); casting = '';
      $$('[data-cast] button').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
      render(); say('비웠어요');
    });
    render();
  }
})();
