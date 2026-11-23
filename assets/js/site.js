/* VALER WORLD — site.js : 스크롤 등장 · 표지 플래시 · 표지 사진 감지 */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  function show(el) { el.classList.add('is-in'); }

  var reveal = [].slice.call(document.querySelectorAll('[data-reveal], .vw-head'));
  var covers = [].slice.call(document.querySelectorAll('.vw-cover'));

  if (!('IntersectionObserver' in window)) {
    reveal.concat(covers).forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveal.forEach(function (el) { io.observe(el); });

    // 표지는 충분히 들어왔을 때 한 번만 '찰칵'
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io2.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    covers.forEach(function (el) { io2.observe(el); });
  }

  // 표지 사진(images/portrait.jpg)이 있으면 자리 안내 문구를 숨긴다
  covers.forEach(function (cover) {
    var src = cover.getAttribute('data-portrait');
    if (!src) return;
    var img = new Image();
    img.onload = function () { cover.classList.add('has-portrait'); };
    img.src = src;
  });

  // 메인: 수면 아래로 — 스크롤에 따라 거울 그림이 밀려 올라가며 언더베일이 떠오름
  var sinks = [].slice.call(document.querySelectorAll('.vw-sink'));
  if (sinks.length) {
    var still = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
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
})();
