'use strict';

(function () {
  function init() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var successEl = document.getElementById('formSuccess');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('has-error');
      });

      // Validate name
      var nameInput = document.getElementById('fieldName');
      if (!nameInput || !nameInput.value.trim()) {
        markError(nameInput);
        isValid = false;
      }

      // Validate contact
      var contactInput = document.getElementById('fieldContact');
      if (!contactInput || !contactInput.value.trim()) {
        markError(contactInput);
        isValid = false;
      }

      if (!isValid) return;

      var data = {
        name:     nameInput.value.trim(),
        contact:  contactInput.value.trim(),
        interest: document.getElementById('fieldInterest')
                    ? document.getElementById('fieldInterest').value
                    : '',
        message:  document.getElementById('fieldMessage')
                    ? document.getElementById('fieldMessage').value.trim()
                    : ''
      };

      console.log('Lead:', data);

      // Show success
      form.style.display = 'none';
      if (successEl) {
        successEl.classList.add('is-visible');
      }
    });
  }

  function markError(input) {
    if (!input) return;
    var group = input.closest('.form-group');
    if (group) group.classList.add('has-error');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
