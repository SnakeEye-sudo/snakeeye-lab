// Web Crypto Password Manager

class PasswordManager {
  constructor() {
    this.masterKey = null;
    this.salt = null;
    this.initialized = false;
    this.passwords = [];
    this.loadState();
  }

  async deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      data,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );
    return await crypto.subtle.importKey(
      'raw',
      derivedBits,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async initialize(password) {
    try {
      this.salt = crypto.getRandomValues(new Uint8Array(16));
      this.masterKey = await this.deriveKey(password, this.salt);
      this.initialized = true;
      this.saveState();
      this.showAppInterface();
    } catch (error) {
      console.error('Initialization failed:', error);
      alert('Error initializing vault. Please try again.');
    }
  }

  async encryptPassword(credential) {
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(credential));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        this.masterKey,
        data
      );
      return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted)),
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      return null;
    }
  }

  async decryptPassword(encryptedObj) {
    try {
      const iv = new Uint8Array(encryptedObj.iv);
      const data = new Uint8Array(encryptedObj.data);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        this.masterKey,
        data
      );
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(decrypted));
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

  generatePassword(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }
    return password;
  }

  saveState() {
    const state = {
      salt: this.salt ? Array.from(this.salt) : null,
      passwords: this.passwords,
    };
    localStorage.setItem('pm_state', JSON.stringify(state));
  }

  loadState() {
    const stored = localStorage.getItem('pm_state');
    if (stored) {
      const state = JSON.parse(stored);
      this.salt = state.salt ? new Uint8Array(state.salt) : null;
      this.passwords = state.passwords || [];
      this.initialized = this.salt !== null;
    }
  }

  showAppInterface() {
    document.getElementById('setup-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
  }
}

const manager = new PasswordManager();

document.getElementById('setup-btn').addEventListener('click', async () => {
  const pwd = document.getElementById('master-password').value;
  const confirm = document.getElementById('master-password-confirm').value;
  
  if (!pwd || pwd.length < 8) {
    alert('Password must be at least 8 characters');
    return;
  }
  if (pwd !== confirm) {
    alert('Passwords do not match');
    return;
  }
  
  await manager.initialize(pwd);
});

document.getElementById('generate-btn').addEventListener('click', () => {
  const pwd = manager.generatePassword();
  document.getElementById('password').value = pwd;
});

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
