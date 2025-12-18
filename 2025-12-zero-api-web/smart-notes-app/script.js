// Smart Notes App - Zero API Local Storage Implementation

const STORAGE_KEY = 'smartnotes_data';

// DOM Elements
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const searchBox = document.getElementById('searchBox');
const sortBy = document.getElementById('sortBy');
const notesList = document.getElementById('notesList');

// State
let notes = [];
let currentEditId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    renderNotes();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    saveBtn.addEventListener('click', saveNote);
    clearBtn.addEventListener('click', clearForm);
    searchBox.addEventListener('input', handleSearch);
    sortBy.addEventListener('change', handleSort);
}

// Load notes from localStorage
function loadNotes() {
    const stored = localStorage.getItem(STORAGE_KEY);
    notes = stored ? JSON.parse(stored) : [];
}

// Save notes to localStorage
function saveNotesToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Save or update note
function saveNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title || !content) {
        alert('Please enter both title and content');
        return;
    }

    if (currentEditId) {
        // Update existing note
        const note = notes.find(n => n.id === currentEditId);
        if (note) {
            note.title = title;
            note.content = content;
            note.updated = new Date().toISOString();
        }
        currentEditId = null;
    } else {
        // Create new note
        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        notes.unshift(newNote);
    }

    saveNotesToStorage();
    clearForm();
    renderNotes();
}

// Clear form
function clearForm() {
    noteTitle.value = '';
    noteContent.value = '';
    currentEditId = null;
    saveBtn.textContent = 'Save Note';
}

// Delete note
function deleteNote(id) {
    if (confirm('Delete this note?')) {
        notes = notes.filter(n => n.id !== id);
        saveNotesToStorage();
        renderNotes();
    }
}

// Edit note
function editNote(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        currentEditId = id;
        saveBtn.textContent = 'Update Note';
        noteTitle.focus();
    }
}

// Handle search
function handleSearch() {
    renderNotes();
}

// Handle sort
function handleSort() {
    renderNotes();
}

// Get sorted and filtered notes
function getFilteredNotes() {
    let filtered = notes;
    const searchTerm = searchBox.value.toLowerCase();

    if (searchTerm) {
        filtered = filtered.filter(n =>
            n.title.toLowerCase().includes(searchTerm) ||
            n.content.toLowerCase().includes(searchTerm)
        );
    }

    const sortType = sortBy.value;
    if (sortType === 'oldest') {
        filtered.sort((a, b) => new Date(a.created) - new Date(b.created));
    } else if (sortType === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'recent' is default (already sorted by unshift)

    return filtered;
}

// Format date
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Render notes
function renderNotes() {
    const filtered = getFilteredNotes();

    if (filtered.length === 0) {
        notesList.innerHTML = '<div class="empty-state"><p>No notes yet. Create your first one!</p></div>';
        return;
    }

    notesList.innerHTML = filtered.map(note => `
        <div class="note-card">
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.content)}</p>
            <div class="timestamp">Updated: ${formatDate(note.updated)}</div>
            <div class="actions">
                <button class="btn-edit" onclick="editNote(${note.id})">Edit</button>
                <button class="btn-delete" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
