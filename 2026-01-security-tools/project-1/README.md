# 🔐 Secure Password Manager

**Month**: January 2026 | **Theme**: Security & Tools

## Overview

A lightweight, client-side password manager that demonstrates fundamental security practices:
- Local encryption using native Web Crypto API
- Password generation with configurable strength
- Master password protection
- No external API - all operations happen in the browser

## Features

✅ **Encryption & Decryption** - Using AES-256 for sensitive data
✅ **Master Password** - PBKDF2-derived key from user password
✅ **Password Generator** - Customizable length and character types
✅ **Local Storage** - All data stored in browser (encrypted)
✅ **Copy to Clipboard** - Quick access to stored credentials
✅ **Responsive Design** - Works on desktop and mobile

## Learning Goals

- Understanding Web Crypto API fundamentals
- Implementing secure key derivation (PBKDF2)
- Working with encryption/decryption workflows
- Safe password handling practices
- Browser storage security patterns

## Project Structure

```
project-1/
├── index.html        # UI structure
├── styles.css        # Responsive styling
├── script.js         # Web Crypto implementation
└── README.md         # This file
```

## Getting Started

1. Open `index.html` in a modern browser
2. Set a strong master password on first launch
3. Add new credentials or generate passwords
4. All data is encrypted and stored locally

## Security Notes

⚠️ **Important**: This is an educational project demonstrating security concepts:
- Never use this for production critical passwords
- Browser's localStorage is not as secure as specialized tools
- Master password cannot be recovered if forgotten
- Always keep backups of important credentials

## Key Technologies

- **Web Crypto API** - Native browser cryptography
- **PBKDF2** - Key derivation function
- **AES-GCM** - Authenticated encryption
- **JavaScript ES6+** - Modern async patterns

## What I Learned

1. How modern browsers expose cryptographic primitives
2. Key derivation for password-based encryption
3. Authenticated encryption (AES-GCM) benefits
4. Safe handling of sensitive data in frontend
5. UX patterns for security-conscious applications
