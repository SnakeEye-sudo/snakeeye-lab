const gameBoard = document.getElementById('gameBoard');
const moves = document.getElementById('moves');
const matches = document.getElementById('matches');
const difficulty = document.getElementById('difficulty');
const leaderboard = document.getElementById('leaderboard');

let cards = [];
let flipped = [];
let matched = 0;
let moveCount = 0;
let gameActive = true;

const symbols = ['🍎', '🍌', '🍊', '🍇', '🍓', '🥝', '🍑', '🍒', '🥑', '🍉', '🥭', '🍍'];
const difficulties = { easy: 4, medium: 6, hard: 6 };
const cardCounts = { easy: 16, medium: 24, hard: 36 };

function init() {
  gameBoard.innerHTML = '';
  flipped = [];
  matched = 0;
  moveCount = 0;
  moves.textContent = '0';
  matches.textContent = '0';
  gameActive = true;
  
  const cols = difficulties[difficulty.value];
  const rows = cardCounts[difficulty.value] / cols;
  gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
  cards = [];
  const usedSymbols = symbols.slice(0, cardCounts[difficulty.value] / 2);
  const cardSymbols = [...usedSymbols, ...usedSymbols].sort(() => Math.random() - 0.5);
  
  cardSymbols.forEach((symbol, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = '?';
    card.dataset.symbol = symbol;
    card.dataset.id = idx;
    card.onclick = () => flipCard(idx, card);
    gameBoard.appendChild(card);
    cards.push({ element: card, symbol, flipped: false });
  });
  
  loadLeaderboard();
}

function flipCard(idx, element) {
  if (!gameActive || flipped.length >= 2 || cards[idx].flipped || element.classList.contains('matched')) return;
  
  element.textContent = cards[idx].symbol;
  element.classList.add('flipped');
  cards[idx].flipped = true;
  flipped.push(idx);
  
  if (flipped.length === 2) {
    moveCount++;
    moves.textContent = moveCount;
    gameActive = false;
    
    if (cards[flipped[0]].symbol === cards[flipped[1]].symbol) {
      matched++;
      matches.textContent = matched;
      cards[flipped[0]].element.classList.add('matched');
      cards[flipped[1]].element.classList.add('matched');
      flipped = [];
      gameActive = true;
      
      if (matched === cardCounts[difficulty.value] / 2) endGame();
    } else {
      setTimeout(() => {
        cards[flipped[0]].element.textContent = '?';
        cards[flipped[0]].element.classList.remove('flipped');
        cards[flipped[0]].flipped = false;
        cards[flipped[1]].element.textContent = '?';
        cards[flipped[1]].element.classList.remove('flipped');
        cards[flipped[1]].flipped = false;
        flipped = [];
        gameActive = true;
      }, 1000);
    }
  }
}

function endGame() {
  gameActive = false;
  saveScore(moveCount, difficulty.value);
  setTimeout(() => alert(`🎉 You won! Moves: ${moveCount}`), 100);
}

function saveScore(score, level) {
  let scores = JSON.parse(localStorage.getItem('memoryScores') || '{}');
  if (!scores[level]) scores[level] = [];
  scores[level].push(score);
  scores[level].sort((a, b) => a - b);
  scores[level] = scores[level].slice(0, 10);
  localStorage.setItem('memoryScores', JSON.stringify(scores));
}

function loadLeaderboard() {
  leaderboard.innerHTML = '';
  const scores = JSON.parse(localStorage.getItem('memoryScores') || '{}');
  const levelScores = scores[difficulty.value] || [];
  if (levelScores.length === 0) leaderboard.innerHTML = '<li>No scores yet</li>';
  else levelScores.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `${score} moves`;
    leaderboard.appendChild(li);
  });
}

difficulty.addEventListener('change', init);
init();
