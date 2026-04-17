/* ============================================================
   warmprint — Lead Form: validation + success screen
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const form        = document.getElementById('leadForm');
    const formWrap    = document.getElementById('leadFormWrap');
    const successEl   = document.getElementById('formSuccess');

    if (!form) return;

    function getLang () {
      return localStorage.getItem('warmprint-lang') || 'ru';
    }

    function getT (key) {
      const t = window.TRANSLATIONS;
      if (!t) return '';
      const lang = getLang();
      const base = t[lang] && t[lang].form ? t[lang].form : {};
      return base[key] || '';
    }

    function setError (fieldEl, msgEl, msg) {
      fieldEl.setAttribute('aria-invalid', 'true');
      fieldEl.style.borderColor = '#c0392b';
      if (msgEl) msgEl.textContent = msg;
    }

    function clearError (fieldEl, msgEl) {
      fieldEl.removeAttribute('aria-invalid');
      fieldEl.style.borderColor = '';
      if (msgEl) msgEl.textContent = '';
    }

    function validateForm () {
      let valid = true;

      const nameField = form.querySelector('#fieldName');
      const nameErr   = form.querySelector('#errName');
      const nameVal   = nameField ? nameField.value.trim() : '';
      if (!nameVal) {
        setError(nameField, nameErr, getT('required_err') || 'Заполните поле');
        valid = false;
      } else {
        clearError(nameField, nameErr);
      }

      const contactField = form.querySelector('#fieldContact');
      const contactErr   = form.querySelector('#errContact');
      const contactVal   = contactField ? contactField.value.trim() : '';
      if (!contactVal) {
        setError(contactField, contactErr, getT('contact_err') || 'Укажите контакт');
        valid = false;
      } else {
        clearError(contactField, contactErr);
      }

      return valid;
    }

    /* Live clear on input */
    form.querySelectorAll('.form-input, .form-textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        const errId = this.getAttribute('aria-describedby');
        const errEl = errId ? document.getElementById(errId) : null;
        clearError(this, errEl);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      const data = {
        name:     form.querySelector('#fieldName').value.trim(),
        contact:  form.querySelector('#fieldContact').value.trim(),
        interest: form.querySelector('#fieldInterest').value,
        message:  form.querySelector('#fieldMessage').value.trim(),
        lang:     getLang(),
        timestamp: new Date().toISOString()
      };

      console.log('Lead:', data);

      /* Show success */
      if (formWrap)  formWrap.style.display = 'none';
      if (successEl) {
        successEl.classList.add('visible');

        /* Translate success screen dynamically */
        const titleEl = successEl.querySelector('.form-success__title');
        const subEl   = successEl.querySelector('.form-success__sub');
        if (titleEl) titleEl.textContent = getT('success_title') || 'Отлично!';
        if (subEl)   subEl.textContent   = getT('success_sub')   || 'Мы получили вашу заявку.';
      }
    });
  });
}());
