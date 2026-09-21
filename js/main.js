document.addEventListener('DOMContentLoaded', function () {
  var doc = document;

  /* ---------- Menu mobile ---------- */
  var nav = doc.getElementById('siteNav');
  var toggle = doc.getElementById('menuToggle');
  var menu = doc.getElementById('menuList');

  function fecharMenu() {
    if (nav) { nav.classList.remove('is-open'); }
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); }
  }
  function abrirMenu() {
    if (nav) { nav.classList.add('is-open'); }
    if (toggle) { toggle.setAttribute('aria-expanded', 'true'); }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (nav && nav.classList.contains('is-open')) { fecharMenu(); } else { abrirMenu(); }
    });
  }
  if (menu) {
    menu.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', fecharMenu);
    });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { fecharMenu(); }
  });

  /* ---------- Destaca no menu a seção visível ---------- */
  var links = [].slice.call(doc.querySelectorAll('#menuList a[href^="#"]'));
  var mapa = {};
  links.forEach(function (a) { mapa[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window && links.length) {
    var navIO = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        links.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
        var ativo = mapa[en.target.id];
        if (ativo) { ativo.classList.add('is-active'); ativo.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(mapa).forEach(function (id) {
      var secao = doc.getElementById(id);
      if (secao) { navIO.observe(secao); }
    });
  }

  /* ---------- Revela elementos ao rolar ---------- */
  var reveals = [].slice.call(doc.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && reveals.length) {
    var revealIO = new IntersectionObserver(function (entradas, observer) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          observer.unobserve(en.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Carrossel de pesagem (fade automático + dots) ---------- */
  var container = doc.querySelector('.carousel-container');
  if (container) {
    var slides = [].slice.call(container.querySelectorAll('.carousel-slide'));
    if (slides.length > 1) {
      var dotsWrap = doc.createElement('div');
      dotsWrap.className = 'carousel-dots';
      dotsWrap.setAttribute('role', 'tablist');
      dotsWrap.setAttribute('aria-label', 'Selecionar imagem do carrossel');

      var dots = slides.map(function (_, i) {
        var dot = doc.createElement('button');
        dot.type = 'button';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
        dotsWrap.appendChild(dot);
        return dot;
      });
      container.appendChild(dotsWrap);

      var current = 0;
      var timer = null;

      function irPara(index) {
        slides[current].classList.remove('is-active');
        dots[current].classList.remove('is-active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('is-active');
        dots[current].classList.add('is-active');
      }

      function proximo() { irPara(current + 1); }

      function iniciarAuto() {
        pararAuto();
        timer = setInterval(proximo, 4500);
      }
      function pararAuto() {
        if (timer) { clearInterval(timer); timer = null; }
      }

      slides[0].classList.add('is-active');
      dots[0].classList.add('is-active');

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { irPara(i); iniciarAuto(); });
      });

      container.addEventListener('mouseenter', pararAuto);
      container.addEventListener('mouseleave', iniciarAuto);
      container.addEventListener('focusin', pararAuto);
      container.addEventListener('focusout', iniciarAuto);

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        iniciarAuto();
      }
    } else if (slides.length === 1) {
      slides[0].classList.add('is-active');
    }
  }

  /* ---------- Mede cliques nos botões de WhatsApp ---------- */
  doc.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-cta]') : null;
    if (a && typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', { cta_location: a.getAttribute('data-cta') });
    }
  });
});

/* ---------- Google Analytics: carregado após interação do usuário ou após 5s ---------- */
(function () {
  var analyticsLoaded = false;

  function loadGoogleAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4TC35WJ0G2';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-4TC35WJ0G2', { send_page_view: false });
    window.gtag = gtag;

    gtag('event', 'page_view');
  }

  ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(function (event) {
    document.addEventListener(event, loadGoogleAnalytics, { once: true, passive: true });
  });

  setTimeout(loadGoogleAnalytics, 5000);
})();
