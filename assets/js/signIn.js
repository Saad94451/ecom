// Password show/hide toggle
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('passwordField');
togglePassword.addEventListener('click', () => {
  const isHidden = passwordField.type === 'password';
  passwordField.type = isHidden ? 'text' : 'password';
  togglePassword.innerHTML = isHidden
    ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-eye" aria-hidden="true"></i>';
  togglePassword.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});
