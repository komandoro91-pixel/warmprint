'use strict';

(function () {

  /* ---- Header scroll ---- */
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- Burger / mobile menu ---- */
  function initBurger() {
    var burger = document.getElementById('burger');
    var menu   = document.getElementById('mobileMenu');
    if (!burger || !menu) return;

    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      menu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('is-open');
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  function initReveal() {
    if (!window.IntersectionObserver) {
      // Fallback: show all
      document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right')
        .forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right')
      .forEach(function (el) { io.observe(el); });
  }

  /* ---- Scroll draw lines ---- */
  function initDrawLines() {
    if (!window.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.draw-line').forEach(function (el) { io.observe(el); });
  }

  /* ---- Scroll top ---- */
  function initScrollTop() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Lightbox ---- */
  function initLightbox() {
    var lightbox   = document.getElementById('lightbox');
    var lbImg      = document.getElementById('lbImg');
    var lbCaption  = document.getElementById('lbCaption');
    var lbClose    = document.getElementById('lbClose');
    if (!lightbox || !lbImg || !lbClose) return;

    function openLightbox(src, caption) {
      lbImg.src = src;
      lbImg.alt = caption || '';
      if (lbCaption) lbCaption.textContent = caption || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
    }

    document.querySelectorAll('.gallery-item[data-src]').forEach(function (item) {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      function activate() {
        openLightbox(item.getAttribute('data-src'), item.getAttribute('data-caption'));
      }

      item.addEventListener('click', activate);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });

    lbClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /* ---- Init ---- */
  function init() {
    initHeader();
    initBurger();
    initReveal();
    initDrawLines();
    initScrollTop();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
