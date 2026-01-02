import './style.css';
import goblinImage from './assets/goblin.png';
import { Game } from './game';

// Инициализация игры
const game = new Game(goblinImage);
game.init();

// Экспортируем для тестов
export { game };
