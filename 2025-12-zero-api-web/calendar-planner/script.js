let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  let html = `<table><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>`;
  
  for (let i = 0; i < firstDay.getDay(); i++) {
    html += '<td></td>';
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    if ((day - 1 + firstDay.getDay()) % 7 === 0 && day !== 1) {
      html += '</tr><tr>';
    }
    const dateKey = `${year}-${month}-${day}`;
    const hasEvent = events[dateKey] ? 'has-event' : '';
    html += `<td class="${hasEvent}" onclick="addEvent(${day})">${day}</td>`;
  }
  
  html += '</tr></tbody></table>';
  document.getElementById('calendar').innerHTML = html;
  renderEvents();
}

function addEvent(day) {
  const title = prompt('Event title:');
  if (!title) return;
  
  const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
  if (!events[dateKey]) events[dateKey] = [];
  events[dateKey].push(title);
  localStorage.setItem('calendarEvents', JSON.stringify(events));
  renderCalendar();
}

function renderEvents() {
  let html = '<h3>Events</h3>';
  for (const [date, eventList] of Object.entries(events)) {
    html += `<p><strong>${date}:</strong> ${eventList.join(', ')}</p>`;
  }
  document.getElementById('events').innerHTML = html;
}

renderCalendar();
