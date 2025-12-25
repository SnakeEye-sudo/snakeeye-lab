// Mood Music Player
const moodPlaylists = {
  focus: ['Focus Beats', 'Deep Work', 'Study Flow'],
  relax: ['Ambient Sleep', 'Peaceful Sounds', 'Nature Vibes'],
  energetic: ['Electronic Energy', 'Upbeat Mix', 'Power Surge'],
  sleep: ['Sleeping Lullabies', 'Night Calm', 'Dream State']
};

let currentMood = null;
let isPlaying = false;

const moodBtns = document.querySelectorAll('.mood-btn');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeControl = document.getElementById('volumeControl');
const nowPlayingDiv = document.getElementById('nowPlaying');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Mood selection
moodBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    moodBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMood = btn.dataset.mood;
    updatePlaylist();
  });
});

// Play/Pause
playBtn.addEventListener('click', () => {
  if (!currentMood) {
    alert('Please select a mood first!');
    return;
  }
  isPlaying = true;
  playBtn.disabled = true;
  pauseBtn.disabled = false;
  animate();
});

pauseBtn.addEventListener('click', () => {
  isPlaying = false;
  playBtn.disabled = false;
  pauseBtn.disabled = true;
});

// Volume control
volumeControl.addEventListener('input', (e) => {
  console.log('Volume:', e.target.value);
});

// Update playlist display
function updatePlaylist() {
  const tracks = moodPlaylists[currentMood];
  nowPlayingDiv.innerHTML = `<strong>${currentMood.toUpperCase()}</strong><br>${tracks.join(' • ')}`;
}

// Canvas animation
function animate() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw visualizer bars
  const barCount = 20;
  const barWidth = canvas.width / barCount;
  
  for (let i = 0; i < barCount; i++) {
    const height = Math.random() * canvas.height * 0.8;
    const hue = (i / barCount) * 360;
    
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
  }
  
  requestAnimationFrame(animate);
}
