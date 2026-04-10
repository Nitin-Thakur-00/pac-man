import { Maze, TileType, TILE_SIZE } from './maze.js';
import { Pacman, Ghost, GhostState } from './entity.js';
import { audio } from './audio.js';

const spawnPoints = {
    pacman: { x: 13 * TILE_SIZE + TILE_SIZE / 2, y: 23 * TILE_SIZE + TILE_SIZE / 2 },
    blinky: { x: 13 * TILE_SIZE + TILE_SIZE / 2, y: 11 * TILE_SIZE + TILE_SIZE / 2 },
    pinky:  { x: 13 * TILE_SIZE + TILE_SIZE / 2, y: 14 * TILE_SIZE + TILE_SIZE / 2 },
    inky:   { x: 11 * TILE_SIZE + TILE_SIZE / 2, y: 14 * TILE_SIZE + TILE_SIZE / 2 },
    clyde:  { x: 15 * TILE_SIZE + TILE_SIZE / 2, y: 14 * TILE_SIZE + TILE_SIZE / 2 }
};

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scoreList = document.getElementById('score');
    this.levelList = document.getElementById('level');
    this.livesList = document.getElementById('lives');
    
    this.init();
  }

  init() {
    this.maze = new Maze();
    this.canvas.width = this.maze.cols * TILE_SIZE;
    this.canvas.height = this.maze.rows * TILE_SIZE;

    // USE STRICT INTEGERS - The Entity class will center them automatically
    this.pacman = new Pacman(13, 23); 
    this.maze.pacman = this.pacman; 

    this.ghosts = [
      new Ghost(13, 11, '#ff0000', 'Blinky'), // Starts outside, above the gate
      new Ghost(13, 14, '#ffb8ff', 'Pinky'),  // Inside house center
      new Ghost(11, 14, '#00ffff', 'Inky'),   // Inside house left
      new Ghost(15, 14, '#ffb852', 'Clyde')   // Inside house right
    ];

    this.behaviorCycle = [7, 20, 7, 20, 5, 20, 5, Infinity]; 
    this.behaviorIndex = 0;
    this.behaviorTimer = 0;
    this.globalState = GhostState.SCATTER;

    // GHOST TIMERS: Multiply by 60 for 60FPS (e.g., 300 = 5 seconds)
    this.ghosts[0].state = GhostState.CHASE; 
    this.ghosts[1].releaseTimer = 180;  // 3 seconds
    this.ghosts[2].releaseTimer = 420;  // 7 seconds
    this.ghosts[3].releaseTimer = 720;  // 12 seconds

    // Scatter targets
    this.ghosts[0].scatterTarget = { x: 25, y: -2 };
    this.ghosts[1].scatterTarget = { x: 2, y: -2 };
    this.ghosts[2].scatterTarget = { x: 27, y: 31 };
    this.ghosts[3].scatterTarget = { x: 0, y: 31 };

    this.maze.blinky = this.ghosts[0];

    this.running = false;
    this.level = 1;
    this.score = 0;
    this.powerTimer = 0;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  loop(now) {
    if (!this.running) return;

    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    this.pacman.update(this.maze);

    if (this.pacman.powerMode) {
      audio.playPower();
      this.pacman.powerMode = false;
      this.powerTimer = 600; 
      this.ghosts.forEach(g => {
        if (g.state !== GhostState.EATEN) g.state = GhostState.FRIGHTENED;
      });
    }

    if (this.powerTimer > 0) {
      this.powerTimer--;
      if (this.powerTimer === 0) {
         this.ghosts.forEach(g => {
           if (g.state === GhostState.FRIGHTENED) g.state = this.globalState;
         });
      }
    } else {
      this.behaviorTimer += dt;
      const currentDuration = this.behaviorCycle[this.behaviorIndex];
      if (this.behaviorTimer >= currentDuration) {
          this.behaviorTimer = 0;
          this.behaviorIndex = Math.min(this.behaviorIndex + 1, this.behaviorCycle.length - 1);
          this.globalState = this.behaviorIndex % 2 === 0 ? GhostState.SCATTER : GhostState.CHASE;
          this.ghosts.forEach(g => {
              if (g.state === GhostState.CHASE || g.state === GhostState.SCATTER) {
                  g.state = this.globalState;
              }
          });
      }
    }

    this.ghosts.forEach(g => {
      if (g.state === GhostState.LOCKED) {
          if (g.releaseTimer > 0) {
              g.releaseTimer--;
          } else {
              g.state = GhostState.LEAVING;
          }
      } else if (g.state === GhostState.CHASE || g.state === GhostState.SCATTER) {
          g.state = this.powerTimer > 0 ? GhostState.FRIGHTENED : this.globalState;
      }

      g.update(this.maze);

      const dx = g.x - this.pacman.x;
      const dy = g.y - this.pacman.y;
      const distSq = dx * dx + dy * dy;
      
      if (distSq < Math.pow(TILE_SIZE * 0.8, 2)) { 
        if (g.state === GhostState.FRIGHTENED) {
          g.state = GhostState.EATEN;
          this.score += 200;
          audio.playPower();
        } else if (g.state !== GhostState.EATEN) {
          audio.playDeath();
          this.onPlayerDeath();
        }
      }
    });

    if (!this.maze.data.some(row => row.some(t => t === TileType.PELLET))) {
      this.onLevelComplete();
    }

    this.updateHUD();
  }

  onPlayerDeath() {
    this.pacman.lives--;
    if (this.pacman.lives <= 0) {
      this.pacman.lives = 0;
      this.running = false;
      document.getElementById('overlay').classList.remove('hidden');
      document.getElementById('overlay-title').innerText = 'GAME OVER';
    } else {
      this.resetEntities();
    }
  }

  onLevelComplete() {
    this.level++;
    this.maze.generate();
    this.resetEntities();
  }

  resetEntities() {
    this.pacman.x = spawnPoints.pacman.x;
    this.pacman.y = spawnPoints.pacman.y;
    this.pacman.dir = { x: 0, y: 0 };
    this.pacman.nextDir = { x: 0, y: 0 };

    this.ghosts[0].x = spawnPoints.blinky.x;
    this.ghosts[0].y = spawnPoints.blinky.y;
    this.ghosts[1].x = spawnPoints.pinky.x;
    this.ghosts[1].y = spawnPoints.pinky.y;
    this.ghosts[2].x = spawnPoints.inky.x;
    this.ghosts[2].y = spawnPoints.inky.y;
    this.ghosts[3].x = spawnPoints.clyde.x;
    this.ghosts[3].y = spawnPoints.clyde.y;

    this.ghosts.forEach((g, i) => {
        g.homePos = { x: g.x, y: g.y };
        g.state = (i === 0) ? GhostState.CHASE : GhostState.LOCKED;
        
        // Match the specific timers from init
        if (i === 1) g.releaseTimer = 180;
        else if (i === 2) g.releaseTimer = 420;
        else if (i === 3) g.releaseTimer = 720;
        
        g.dir = { x: 0, y: 0 };
    });
  }

  updateHUD() {
    this.scoreList.innerText = this.pacman.score.toString().padStart(4, '0');
    this.levelList.innerText = this.level;
    this.livesList.innerText = this.pacman.lives;
  }

  draw() {
    this.ctx.fillStyle = '#050505';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.maze.rows; y++) {
      for (let x = 0; x < this.maze.cols; x++) {
        const t = this.maze.getTile(x, y);
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;
        
        if (t === TileType.WALL) {
          this.drawWall(x, y);
        } else if (t === TileType.PELLET) {
          this.ctx.fillStyle = '#ffb8ae';
          this.ctx.beginPath();
          // Math.floor to prevent floating point gaps
          this.ctx.arc(Math.floor(px + TILE_SIZE / 2), Math.floor(py + TILE_SIZE / 2), 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (t === TileType.POWER_PELLET) {
          this.ctx.fillStyle = '#ffb8ae';
          this.ctx.shadowBlur = 10;
          this.ctx.shadowColor = '#ffb8ae';
          this.ctx.beginPath();
          this.ctx.arc(Math.floor(px + TILE_SIZE / 2), Math.floor(py + TILE_SIZE / 2), 6, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.shadowBlur = 0;
        } else if (t === TileType.GATE) {
            this.ctx.fillStyle = '#ffb8ff';
            this.ctx.fillRect(px, py + TILE_SIZE / 2 - 2, TILE_SIZE, 4);
        }
      }
    }

    this.pacman.draw(this.ctx);
    this.ghosts.forEach(g => g.draw(this.ctx));
  }

  drawWall(x, y) {
    this.ctx.strokeStyle = '#2b57ff';
    this.ctx.lineWidth = 2;
    // Math.floor everything to eliminate sub-pixel gaps
    this.ctx.strokeRect(Math.floor(x * TILE_SIZE + 4), Math.floor(y * TILE_SIZE + 4), TILE_SIZE - 8, TILE_SIZE - 8);
  }
}
