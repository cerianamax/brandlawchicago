// Honeypot bot protection - blocks form submission if hidden field is filled
document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form || form.tagName !== 'FORM') return;
    var honeypot = form.querySelector('input[name="company_fax"]');
    if (honeypot && honeypot.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
}, true);
