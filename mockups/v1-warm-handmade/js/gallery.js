/* ============================================================
   warmprint — Gallery + Lightbox
   Vanilla JS, no dependencies
   ============================================================ */

(function () {
  'use strict';

  let currentIndex = 0;
  let items = [];

  const lightbox      = document.getElementById('lightbox');
  const lbImg         = document.getElementById('lbImg');
  const lbCaption     = document.getElementById('lbCaption');
  const lbClose       = document.getElementById('lbClose');
  const lbPrev        = document.getElementById('lbPrev');
  const lbNext        = document.getElementById('lbNext');

  function openLightbox (index) {
    if (!lightbox || !items.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox () {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    /* Return focus to trigger */
    if (items[currentIndex] && items[currentIndex].trigger) {
      items[currentIndex].trigger.focus();
    }
  }

  function showNext () {
    currentIndex = (currentIndex + 1) % items.length;
    updateLightbox();
  }

  function showPrev () {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightbox();
  }

  function updateLightbox () {
    const item = items[currentIndex];
    if (!item) return;
    lbImg.src       = item.src;
    lbImg.alt       = item.caption;
    lbCaption.textContent = item.caption;
  }

  function buildItems () {
    items = [];
    document.querySelectorAll('.gallery__item').forEach(function (el, i) {
      const img     = el.querySelector('.gallery__item-img');
      const caption = el.querySelector('.gallery__item-caption');
      if (!img) return;
      items.push({
        src:     img.src,
        caption: caption ? caption.textContent : '',
        trigger: el
      });
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Открыть фото ' + (i + 1));

      el.addEventListener('click', function () { openLightbox(i); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildItems();

    if (!lightbox) return;

    /* Rebuild captions on lang change (captions come from DOM text) */
    document.addEventListener('langChange', function () {
      buildItems();
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev)  lbPrev.addEventListener('click', showPrev);
    if (lbNext)  lbNext.addEventListener('click', showNext);

    /* Click outside */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    /* Keyboard navigation */
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft')  showPrev();
    });

    /* Touch swipe */
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) showNext();
        else        showPrev();
      }
    }, { passive: true });
  });
}());
