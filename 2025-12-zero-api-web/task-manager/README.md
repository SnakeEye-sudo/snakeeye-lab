# 📄 Task Manager

**Zero-API Web App** - Pure JavaScript + Local Storage

December 2025 Theme: Zero-API Web Apps

## Overview

A fully functional task management application built with vanilla JavaScript, HTML, and CSS. No external APIs, no dependencies - just pure web technologies and browser storage.

## Features

✨ **Core Functionality:**
- ✅ Add tasks with custom priority levels (Low, Medium, High)
- 🎯 Mark tasks as completed/incomplete
- 🗑️ Delete tasks
- 💾 Persistent storage using LocalStorage
- 🔍 Filter tasks (All, Pending, Completed, High Priority)
- 📊 Real-time statistics (Total, Completed, Pending)

### Advanced Features:
- Color-coded priority indicators
- Smooth animations and transitions
- Keyboard support (Enter to add task)
- Responsive design
- XSS protection with HTML escaping

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and flexbox
- **Vanilla JavaScript** - ES6+ features
- **LocalStorage API** - Data persistence

## How to Use

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/SnakeEye-sudo/snakeeye-lab.git
cd snakeeye-lab/2025-12-zero-api-web/task-manager
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# Or simply double-click the file
```

### Usage Guide

1. **Adding Tasks:**
   - Type task description in the input field
   - Select priority level (Low/Medium/High)
   - Click "Add Task" or press Enter

2. **Managing Tasks:**
   - Check checkbox to mark task as completed
   - Click "Delete" to remove task
   - Tasks are automatically saved to browser storage

3. **Filtering:**
   - Click filter buttons to view:
     - All tasks
     - Only pending tasks
     - Only completed tasks
     - Only high-priority tasks

## Architecture

### Data Structure
```javascript
Task {
  id: number (timestamp),
  text: string,
  completed: boolean,
  priority: 'low' | 'medium' | 'high',
  createdAt: string (locale date)
}
```

### Key Functions

- `addTask()` - Create new task
- `deleteTask(id)` - Remove task by ID
- `toggleTask(id)` - Mark task as completed
- `filterTasks(filter)` - Apply filter
- `saveTasks()` - Persist to LocalStorage
- `renderTasks()` - Update DOM
- `updateStats()` - Refresh statistics

## Learning Goals (December Theme)

✅ **Pure JavaScript** without frameworks
✅ **DOM Manipulation** - Creating, updating, removing elements
✅ **Event Handling** - Click, change, keyboard events
✅ **Local Storage** - Data persistence in browser
✅ **State Management** - Managing app data in memory
✅ **UI/UX Design** - Responsive and intuitive interface
✅ **Code Quality** - XSS protection, clean code

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with LocalStorage support

## File Structure

```
task-manager/
├── index.html      # Single-file app (HTML + CSS + JS)
└── README.md       # This file
```

## Future Enhancements

- 📅 Due date support
- 🏷️ Task categories/tags
- 📈 Task completion charts
- 🎨 Theme customization
- 🔄 Task drag-and-drop reordering
- 📤 Export tasks to JSON/CSV
- 🔔 Browser notifications

## Performance Notes

- **Storage**: LocalStorage limit ~5-10MB (tasks data is minimal)
- **Rendering**: Efficient DOM updates using innerHTML
- **XSS Protection**: HTML escaping on user input

## Key Learnings

1. **LocalStorage** - Synchronous API, ~5MB limit per domain
2. **JSON serialization** - Converting objects to/from strings
3. **Event delegation** - Efficient event handling
4. **CSS Grid/Flexbox** - Modern layout techniques
5. **ES6 Features** - Arrow functions, template literals, destructuring

## License

Part of SnakeEye Lab Portfolio

---

**Status**: ✅ Complete and Production-Ready

**Live Demo**: [View on GitHub Pages](https://snakeeye-sudo.github.io/snakeeye-lab/2025-12-zero-api-web/task-manager/index.html)

**Repository**: [SnakeEye Lab](https://github.com/SnakeEye-sudo/snakeeye-lab)
