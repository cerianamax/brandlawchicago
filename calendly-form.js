/* =============================================
   Brand Law - Calendly Form Integration
   Handles all contact forms site-wide.
   
   To switch from popup to new tab, change
   USE_POPUP to false below.
   ============================================= */

(function () {

    // ----- CONFIGURATION -----
    var CALENDLY_URL = 'https://calendly.com/tbrand-brandlawchicago/consultation';
    var THANK_YOU_MESSAGE = 'Consultation scheduled! We look forward to speaking with you.';
    var THANK_YOU_DURATION = 10000;
    var USE_POPUP = true;
    var FORM_SELECTORS = '.sidebar-form, .footer-contact-form, .contact-form';

    // ----- INIT -----
    document.addEventListener('DOMContentLoaded', function () {
        var forms = document.querySelectorAll(FORM_SELECTORS);
        forms.forEach(function (form) {
            form.addEventListener('submit', handleFormSubmit);
        });
        window.addEventListener('message', handleCalendlyEvent);
    });

    var activeForm = null;
    var popupScheduled = false;

    // ----- FORM SUBMIT -----
    function handleFormSubmit(e) {
        e.preventDefault();
        var form = e.target;

        // Honeypot bot check
        var honeypot = form.querySelector('input[name="company_fax"]');
        if (honeypot && honeypot.value) { return; }
        activeForm = form;
        popupScheduled = false;

        // Gather field values
        var textInputs = form.querySelectorAll('input[type="text"]:not([name="company_fax"])');
        var emailInput = form.querySelector('input[type="email"]');
        var phoneInput = form.querySelector('input[type="tel"]');
        var textarea = form.querySelector('textarea');

        var firstName = textInputs[0] ? textInputs[0].value.trim() : '';
        var lastName = textInputs[1] ? textInputs[1].value.trim() : '';
        var email = emailInput ? emailInput.value.trim() : '';
        var phone = phoneInput ? phoneInput.value.trim() : '';
        var message = textarea ? textarea.value.trim() : '';

        var fullName = firstName + ' ' + lastName;

        if (USE_POPUP) {
            Calendly.initPopupWidget({
                url: CALENDLY_URL,
                prefill: {
                    name: fullName,
                    email: email,
                    customAnswers: {
                        a1: phone,
                        a2: message
                    }
                }
            });
            watchForPopupClose(form);
        } else {
            // Open in new tab with prefilled URL parameters
            var params = '?name=' + encodeURIComponent(fullName) +
                '&email=' + encodeURIComponent(email) +
                '&a1=' + encodeURIComponent(phone) +
                '&a2=' + encodeURIComponent(message);
            window.open(CALENDLY_URL + params, '_blank');
            form.reset();
        }
    }

    // ----- CALENDLY EVENT LISTENER -----
    function handleCalendlyEvent(e) {
        if (!isCalendlyEvent(e)) return;
        if (e.data.event === 'calendly.event_scheduled') {
            popupScheduled = true;
            if (activeForm) {
                showThankYou(activeForm);
                activeForm = null;
            }
        }
    }

    function isCalendlyEvent(e) {
        return e.origin === 'https://calendly.com' &&
            e.data.event &&
            e.data.event.indexOf('calendly.') === 0;
    }

    // ----- POPUP CLOSE DETECTION -----
    function watchForPopupClose(form) {
        var overlayFound = false;
        var checker = setInterval(function () {
            var overlay = document.querySelector('.calendly-overlay');
            if (overlay) {
                overlayFound = true;
            } else if (overlayFound) {
                clearInterval(checker);
                if (!popupScheduled) {
                    form.reset();
                }
            }
        }, 300);

        // Safety - stop checking after 5 minutes
        setTimeout(function () { clearInterval(checker); }, 300000);
    }

    // ----- THANK YOU MESSAGE -----
    function showThankYou(form) {
        var isDarkBg = form.classList.contains('sidebar-form');
        var textColor = isDarkBg ? '#fff' : 'rgb(30, 55, 90)';

        // Hide all form children
        var children = Array.from(form.children);
        children.forEach(function (child) {
            child.setAttribute('data-calendly-hidden', 'true');
            child.style.display = 'none';
        });

        // Create thank you message
        var thankYou = document.createElement('div');
        thankYou.className = 'calendly-thank-you';
        thankYou.style.cssText = 'display:flex;align-items:center;justify-content:center;' +
            'min-height:200px;text-align:center;padding:2rem;';
        thankYou.innerHTML =
            '<div>' +
            '<div style="font-size:2.5rem;margin-bottom:0.75rem;color:' + textColor + ';">&#10003;</div>' +
            '<p style="font-family:Poppins,sans-serif;font-size:1.15rem;margin:0;' +
            'line-height:1.6;color:' + textColor + ';">' + THANK_YOU_MESSAGE + '</p>' +
            '</div>';
        form.appendChild(thankYou);

        // Reset after duration
        setTimeout(function () {
            if (form.contains(thankYou)) {
                form.removeChild(thankYou);
            }
            children.forEach(function (child) {
                child.removeAttribute('data-calendly-hidden');
                child.style.display = '';
            });
            form.reset();
        }, THANK_YOU_DURATION);
    }

})();
