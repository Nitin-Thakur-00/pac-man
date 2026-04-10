import { GameEngine } from './engine.js';
import { audio } from './audio.js';


const canvas = document.getElementById('game-canvas');
const engine = new GameEngine(canvas);

const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

startBtn.addEventListener('click', () => {
    audio.init();
    overlay.classList.add('hidden');
    engine.start();
});


window.addEventListener('keydown', (e) => {
    let nextDir = { x: 0, y: 0 };
    
    switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
            nextDir = { x: 0, y: -1 };
            break;
        case 'arrowdown':
        case 's':
            nextDir = { x: 0, y: 1 };
            break;
        case 'arrowleft':
        case 'a':
            nextDir = { x: -1, y: 0 };
            break;
        case 'arrowright':
        case 'd':
            nextDir = { x: 1, y: 0 };
            break;
    }
    
    if (nextDir.x !== 0 || nextDir.y !== 0) {
        engine.pacman.nextDir = nextDir;
    }
});
