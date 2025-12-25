const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';

function generate() {
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  document.getElementById('password').textContent = password;
}

function copy() {
  const password = document.getElementById('password').textContent;
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  }
}

// Generate a password on page load
generate();
