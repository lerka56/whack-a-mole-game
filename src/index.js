import './style.css';
import goblinImage from './img/goblin.png';  // <-- измените путь!

class Game {
  constructor(goblinImage) {
    this.boardSize = 4;
    this.currentPosition = null;
    this.score = 0;
    this.isRunning = false;
    this.interval = null;
    this.goblinImage = goblinImage;
    this.board = null;
    this.cells = [];
  }

  init() {
    this.createBoard();
    this.createGoblin();
    this.setupEventListeners();
  }

  createBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    
    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      boardElement.appendChild(cell);
      this.cells.push(cell);
    }
    
    this.board = boardElement;
  }

  createGoblin() {
    this.goblin = document.createElement('img');
    this.goblin.src = this.goblinImage;
    this.goblin.className = 'goblin';
    this.goblin.alt = 'Goblin';
  }

  setupEventListeners() {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
      if (!this.isRunning) {
        this.startGame();
      } else {
        this.stopGame();
      }
    });

    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (this.isRunning && cell.contains(this.goblin)) {
          this.score++;
          document.getElementById('score').textContent = this.score;
          this.moveGoblin();
        }
      });
    });
  }

  getRandomPosition() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
    } while (newPosition === this.currentPosition);
    return newPosition;
  }

  moveGoblin() {
    if (this.currentPosition !== null) {
      // Используем проверку, чтобы не было ошибки
      if (this.cells[this.currentPosition].contains(this.goblin)) {
        this.cells[this.currentPosition].removeChild(this.goblin);
      }
    }
    
    this.currentPosition = this.getRandomPosition();
    this.cells[this.currentPosition].appendChild(this.goblin);
  }

  startGame() {
    this.isRunning = true;
    document.getElementById('start-btn').textContent = 'Stop Game';
    
    if (this.currentPosition === null) {
      this.currentPosition = this.getRandomPosition();
    }
    
    // Убедимся, что гном ещё не добавлен
    if (!this.cells[this.currentPosition].contains(this.goblin)) {
      this.cells[this.currentPosition].appendChild(this.goblin);
    }
    
    this.interval = setInterval(() => {
      this.moveGoblin();
    }, 1500);
  }

  stopGame() {
    this.isRunning = false;
    document.getElementById('start-btn').textContent = 'Start Game';
    
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Создание и запуск игры
const game = new Game(goblinImage);
game.init();


export { Game, game };