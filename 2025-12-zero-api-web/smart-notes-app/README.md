# 📝 Smart Notes App

**A Zero-API Notes Application with Local Storage Persistence**

> Keep your thoughts organized. No external APIs. All your data stays local.

---

## 🎯 What is This?

Smart Notes is a demonstration of core web development skills:
- **Pure JavaScript** without any external libraries
- **Local Storage** for persistence
- **Responsive Design** for all screen sizes
- **User State Management** without a backend
- **XSS Prevention** through HTML escaping

This is the **December 2025 Showcase Project** for SnakeEye Lab's Zero-API Web Apps theme.

---

## ✨ Features

✅ **Create Notes** - Add title and content
✅ **Edit Notes** - Update existing notes seamlessly
✅ **Delete Notes** - Remove notes with confirmation
✅ **Search** - Find notes by title or content
✅ **Sort** - Order by most recent, oldest, or alphabetically
✅ **Local Storage** - Data persists across browser sessions
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **Security** - XSS prevention with HTML escaping

---

## 🚀 Quick Start

### Option 1: Browser (Easiest)
1. Download the three files: `index.html`, `styles.css`, `script.js`
2. Open `index.html` in your web browser
3. Start taking notes!

### Option 2: GitHub Pages
1. Fork this repo
2. Go to Settings → Pages
3. Set source to `main` branch
4. Access at `https://yourusername.github.io/snakeeye-lab/2025-12-zero-api-web/smart-notes-app/`

---

## 🏗️ Architecture

### State Management
```javascript
// All notes stored in memory and LocalStorage
const STORAGE_KEY = 'smartnotes_data';
let notes = []; // Array of note objects
let currentEditId = null; // Track edit mode
```

### Data Structure
```javascript
{
  id: 1702850400000,           // Unix timestamp
  title: "Note Title",         // User input
  content: "Note content...",  // User input
  created: "2025-12-18T...",   // ISO timestamp
  updated: "2025-12-18T..."    // ISO timestamp
}
```

### Core Functions
- `loadNotes()` - Retrieve from localStorage
- `saveNote()` - Create or update note
- `deleteNote(id)` - Remove note
- `editNote(id)` - Load note into editor
- `renderNotes()` - Display filtered results
- `getFilteredNotes()` - Apply search + sort

---

## 🎨 Design

- **Color Palette**: Purple gradient (#667eea → #764ba2)
- **Typography**: System fonts for fast loading
- **Layout**: CSS Grid for responsive cards
- **Interactions**: Smooth transitions on hover
- **Mobile**: Single-column on screens < 768px

---

## 🔒 Security

✅ **XSS Prevention** - All user input escaped with `escapeHtml()`
✅ **No External APIs** - No third-party requests
✅ **LocalStorage Only** - Data never leaves browser
✅ **No Sensitive Data** - Notes are user's responsibility

---

## 📊 Skills Demonstrated

| Skill | Implementation |
|-------|----------------|
| **DOM Manipulation** | Query, update, create elements dynamically |
| **Event Handling** | Click, input, change events |
| **State Management** | Track edit mode, filter state |
| **LocalStorage API** | Persist and retrieve JSON data |
| **Array Methods** | Map, filter, sort, find |
| **Date Handling** | Format ISO timestamps |
| **CSS Grid** | Responsive card layout |
| **Security** | HTML escaping for XSS prevention |

---

## 🧪 Testing

Try these scenarios:
1. Create 5 notes
2. Search for a keyword
3. Sort by "Oldest First"
4. Edit a note and verify timestamp updates
5. Delete a note
6. Refresh page - notes should still be there
7. Open DevTools → Application → LocalStorage to see data

---

## 💡 Learning Outcomes

By studying this code, you'll understand:
- Pure JavaScript DOM manipulation
- LocalStorage API for client-side persistence
- State management patterns
- Responsive CSS design
- Security best practices (XSS prevention)
- CRUD operations without a backend
- Clean, maintainable code structure

---

## 📝 File Structure

```
smart-notes-app/
├── index.html   (Semantic HTML structure)
├── styles.css   (Responsive design)
├── script.js    (Core logic, 180+ lines)
└── README.md    (This file)
```

---

## 🎓 What's Next?

Extensions for future versions:
- ✨ Add tags/categories
- ✨ Export notes to JSON/Markdown
- ✨ Dark mode toggle
- ✨ Keyboard shortcuts
- ✨ Rich text editor
- ✨ Sync to cloud (Next theme)

---

## 📜 License

MIT License - Free to use and modify

---

**Built as part of SnakeEye Lab** - A 12-month portfolio project tracking deliberate skill development.

*Last updated: December 2025*
