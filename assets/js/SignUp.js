// Password show/hide toggles
function setupToggle(btnId, fieldId) {
  const btn = document.getElementById(btnId);
  const field = document.getElementById(fieldId);
  btn.addEventListener('click', () => {
    const isHidden = field.type === 'password';
    field.type = isHidden ? 'text' : 'password';
    btn.innerHTML = isHidden
      ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-eye" aria-hidden="true"></i>';
    btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });
}
setupToggle('togglePassword', 'passwordField');
setupToggle('toggleConfirmPassword', 'confirmPasswordField');

// Account type tabs (User / Seller)
const signupForm = document.querySelector('.login-form');
const roleTabs = document.querySelectorAll('.role-tab');
if (signupForm && roleTabs.length) {
  const formSub = signupForm.querySelector('.sub');
  const submitBtn = signupForm.querySelector('.signin-btn');
  const storeField = document.getElementById('storeNameField');
  const subDefault = formSub ? formSub.textContent : '';
  const btnDefault = submitBtn ? submitBtn.innerHTML : '';

  roleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      roleTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      const seller = tab.dataset.role === 'seller';
      signupForm.classList.toggle('as-seller', seller);
      if (storeField) storeField.required = seller;
      if (formSub) {
        formSub.textContent = seller
          ? 'Fill in the details below to create your seller account.'
          : subDefault;
      }
      if (submitBtn) {
        submitBtn.innerHTML = seller
          ? 'Create Seller Account <i class="fa-solid fa-arrow-right arrow" aria-hidden="true"></i>'
          : btnDefault;
      }
    });
  });
}
