/* ============================================================
   warmprint — App Init
   Header scroll, burger, IntersectionObserver scroll reveals
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- Header scroll state ---- */
    const header = document.getElementById('header');
    if (header) {
      function onScroll () {
        header.classList.toggle('scrolled', window.scrollY > 24);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ---- Burger / mobile menu ---- */
    const burger     = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burger && mobileMenu) {
      function toggleMenu (force) {
        const isOpen = force !== undefined ? force : !burger.classList.contains('open');
        burger.classList.toggle('open', isOpen);
        mobileMenu.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }

      burger.addEventListener('click', function () { toggleMenu(); });

      /* Close on nav link click */
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { toggleMenu(false); });
      });

      /* Close on outside click */
      document.addEventListener('click', function (e) {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
          toggleMenu(false);
        }
      });

      /* Close on Escape */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') toggleMenu(false);
      });
    }

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const id = link.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    /* ---- Active nav link on scroll ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    if (sections.length && navLinks.length) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (l) {
              l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });

      sections.forEach(function (s) { observer.observe(s); });
    }

    /* ---- Scroll-reveal via IntersectionObserver ---- */
    const revealEls = document.querySelectorAll(
      '.fade-up, .fade-left, .fade-right, .fade-in-item'
    );

    if (revealEls.length) {
      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }

    /* ---- Scroll-to-top on logo click ---- */
    const logo = document.querySelector('.header__logo');
    if (logo) {
      logo.addEventListener('click', function (e) {
        if (logo.getAttribute('href') === '#hero') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

  });
}());
