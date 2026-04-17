'use strict';

(function () {
  var STORAGE_KEY = 'warmprint-lang';
  var DEFAULT_LANG = 'ru';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function getTranslation(t, path) {
    var parts = path.split('.');
    var val = t;
    for (var i = 0; i < parts.length; i++) {
      if (val == null) return null;
      val = val[parts[i]];
    }
    return val != null ? val : null;
  }

  function applyTranslations(lang) {
    var t = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (!t) {
      console.warn('Translations not loaded for:', lang);
      t = window.TRANSLATIONS && window.TRANSLATIONS[DEFAULT_LANG];
      if (!t) return;
    }

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = getTranslation(t, key);
      if (val !== null) {
        // option elements need value preserved
        if (el.tagName === 'OPTION') {
          el.textContent = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = getTranslation(t, key);
      if (val !== null) el.placeholder = val;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var val = getTranslation(t, key);
      if (val !== null) el.setAttribute('aria-label', val);
    });

    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function setLanguage(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    saveLang(lang);
    applyTranslations(lang);
  }

  function init() {
    applyTranslations(getLang());

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.WARMPRINT_I18N = { setLanguage: setLanguage, getLang: getLang };
})();
