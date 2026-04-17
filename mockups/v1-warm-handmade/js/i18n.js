/* ============================================================
   warmprint — i18n engine
   Handles: data-i18n, data-i18n-placeholder, data-i18n-aria,
            data-i18n-select (option values), data-i18n-html (raw html)
   ============================================================ */

(function () {
  'use strict';

  const CFG = window.WARMPRINT_CONFIG;
  const STORAGE_KEY = CFG ? CFG.localStorageKey : 'warmprint-lang';
  const DEFAULT_LANG = CFG ? CFG.defaultLang : 'ru';
  const SUPPORTED    = ['ru', 'en', 'uk'];

  function getInitialLang () {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || '').toLowerCase().slice(0, 2);
    if (SUPPORTED.includes(browser)) return browser;
    return DEFAULT_LANG;
  }

  function getNestedKey (obj, path) {
    return path.split('.').reduce(function (acc, part) {
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
  }

  function applyTranslations (lang) {
    const t = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (!t) {
      console.warn('[i18n] translations not found for lang:', lang);
      return;
    }

    /* text content */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const val = getNestedKey(t, el.dataset.i18n);
      if (val !== null) el.textContent = val;
    });

    /* raw html (allow <strong> etc.) */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const val = getNestedKey(t, el.dataset.i18nHtml);
      if (val !== null) el.innerHTML = val;
    });

    /* placeholders */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const val = getNestedKey(t, el.dataset.i18nPlaceholder);
      if (val !== null) el.placeholder = val;
    });

    /* aria-labels */
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const val = getNestedKey(t, el.dataset.i18nAria);
      if (val !== null) el.setAttribute('aria-label', val);
    });

    /* <select> option texts: each <option data-i18n-opt="key"> */
    document.querySelectorAll('[data-i18n-opt]').forEach(function (el) {
      const val = getNestedKey(t, el.dataset.i18nOpt);
      if (val !== null) el.textContent = val;
    });

    /* Update lang attribute on <html> */
    document.documentElement.lang = lang;

    /* Update lang-btn active state */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* Emit event for other scripts that care */
    document.dispatchEvent(new CustomEvent('langChange', { detail: { lang: lang } }));
  }

  function setLang (lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  /* Init */
  document.addEventListener('DOMContentLoaded', function () {
    /* Lang switcher buttons */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.dataset.lang);
      });
    });

    /* Apply on load */
    setLang(getInitialLang());
  });

  /* Expose globally */
  window.I18N = { setLang: setLang, getInitialLang: getInitialLang };
}());
