import { TileType, TILE_SIZE } from './maze.js';
import { audio } from './audio.js';

export class Entity {
  constructor(x, y, baseSpeed) {
    this.x = x * TILE_SIZE + TILE_SIZE / 2;
    this.y = y * TILE_SIZE + TILE_SIZE / 2;
    this.dir = { x: 0, y: 0 };
    this.nextDir = { x: 0, y: 0 };
    this.baseSpeed = baseSpeed;
  }

  update(maze, level = 1) {
    const speed = this.getSpeed(maze, level);
    const mapX = Math.floor(this.x / TILE_SIZE);
    const mapY = Math.floor(this.y / TILE_SIZE);
    const centerX = mapX * TILE_SIZE + TILE_SIZE / 2;
    const centerY = mapY * TILE_SIZE + TILE_SIZE / 2;

    // If standing completely still, check if we can start moving
    if (this.dir.x === 0 && this.dir.y === 0) {
      this.onIntersection(maze, mapX, mapY);
    } else {
      const prevX = this.x;
      const prevY = this.y;

      // Move normally
      this.x += this.dir.x * speed;
      this.y += this.dir.y * speed;

      // Did we cross the exact center of the tile this frame?
      const crossedX = (this.dir.x > 0 && prevX < centerX && this.x >= centerX) ||
        (this.dir.x < 0 && prevX > centerX && this.x <= centerX);
      const crossedY = (this.dir.y > 0 && prevY < centerY && this.y >= centerY) ||
        (this.dir.y < 0 && prevY > centerY && this.y <= centerY);

      if (crossedX || crossedY) {
        // Snap to center
        this.x = centerX;
        this.y = centerY;

        // Ask the child class what to do at this intersection
        this.onIntersection(maze, mapX, mapY);

        // If we are still moving after the intersection, apply the remaining speed (overshoot)
        if (this.dir.x !== 0 || this.dir.y !== 0) {
          const distToCenter = Math.abs(centerX - prevX) + Math.abs(centerY - prevY);
          const remainingSpeed = speed - distToCenter;
          if (remainingSpeed > 0) {
            this.x += this.dir.x * remainingSpeed;
            this.y += this.dir.y * remainingSpeed;
          }
        }
      }
    }

    // Warp Tunnels
    const mazeWidth = maze.cols * TILE_SIZE;
    if (this.x < 0) this.x = mazeWidth - 1;
    if (this.x >= mazeWidth) this.x = 1;
  }

  getSpeed(maze, level) { return this.baseSpeed; }
  onIntersection(maze, mapX, mapY) { }
}

export class Pacman extends Entity {
  constructor(x, y) {
    super(x, y, 2.0);
    this.mouthOpen = 0;
    this.mouthSpeed = 0.2;
    this.score = 0;
    this.lives = 3;
    this.isEating = false;
  }

  getSpeed(maze, level) {
    const levelMultiplier = Math.min(1 + (level - 1) * 0.05, 1.4);
    const baseSpeed = this.isEating ? 1.6 : 2.0;
    return baseSpeed * levelMultiplier;
  }

  onIntersection(maze, mapX, mapY) {
    // 1. Buffered Turn (Can we go the way the player requested?)
    if (this.nextDir.x !== 0 || this.nextDir.y !== 0) {
      if (!maze.isWall(mapX + this.nextDir.x, mapY + this.nextDir.y)) {
        this.dir = { ...this.nextDir };
        this.nextDir = { x: 0, y: 0 };
      }
    }

    // 2. Wall Stop (If our current direction hits a wall, stop dead)
    if (maze.isWall(mapX + this.dir.x, mapY + this.dir.y)) {
      this.dir = { x: 0, y: 0 };
    }
  }

  update(maze, level) {
    super.update(maze, level);

    // Eating Logic
    const mapX = Math.floor(this.x / TILE_SIZE);
    const mapY = Math.floor(this.y / TILE_SIZE);
    const tile = maze.getTile(mapX, mapY);

    this.isEating = false;
    if (tile === TileType.PELLET) {
      maze.data[mapY][mapX] = TileType.EMPTY;
      this.score += 10;
      audio.playWaka();
      this.isEating = true;
    } else if (tile === TileType.POWER_PELLET) {
      maze.data[mapY][mapX] = TileType.EMPTY;
      this.score += 50;
      this.powerMode = true;
      this.isEating = true;
    }
  }

  draw(ctx) {
    this.mouthOpen += this.mouthSpeed;
    const mouthSize = Math.abs(Math.sin(this.mouthOpen)) * 0.2 * Math.PI;

    let rotation = 0;
    if (this.dir.x === 1) rotation = 0;
    if (this.dir.x === -1) rotation = Math.PI;
    if (this.dir.y === -1) rotation = -Math.PI / 2;
    if (this.dir.y === 1) rotation = Math.PI / 2;

    ctx.save();
    ctx.translate(Math.round(this.x), Math.round(this.y));
    ctx.rotate(rotation);
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();

    if (this.dir.x === 0 && this.dir.y === 0) {
      ctx.arc(0, 0, TILE_SIZE / 2 - 4, 0, 2 * Math.PI);
    } else {
      ctx.arc(0, 0, TILE_SIZE / 2 - 4, mouthSize, 2 * Math.PI - mouthSize);
      ctx.lineTo(0, 0);
    }
    ctx.fill();
    ctx.restore();
  }
}

export const GhostState = {
  CHASE: 'CHASE', SCATTER: 'SCATTER', FRIGHTENED: 'FRIGHTENED', EATEN: 'EATEN', LOCKED: 'LOCKED', LEAVING: 'LEAVING'
};

export class Ghost extends Entity {
  constructor(x, y, color, name) {
    super(x, y, 2.0);
    this.color = color;
    this.name = name;
    this.state = GhostState.LOCKED;
    this.scatterTarget = { x: 0, y: 0 };
    this.homePos = { x: x * TILE_SIZE + TILE_SIZE / 2, y: y * TILE_SIZE + TILE_SIZE / 2 };
    this.bounceDir = 1;
    this.forceReverse = false;
  }

  getSpeed(maze, level) {
    const mapX = Math.floor(this.x / TILE_SIZE);
    const mapY = Math.floor(this.y / TILE_SIZE);
    const inTunnel = mapY === 14 && (mapX < 6 || mapX > maze.cols - 7);

    if (this.state === GhostState.EATEN) return 4.0;
    if (this.state === GhostState.FRIGHTENED) return 1.0;

    const levelMultiplier = Math.min(1 + (level - 1) * 0.055, 1.45);
    const base = inTunnel ? 1.0 : 2.0;
    return base * levelMultiplier;
  }

  update(maze, level) {
    if (this.state === GhostState.LOCKED) {
      this.y += 0.5 * this.bounceDir;
      if (Math.abs(this.y - this.homePos.y) > 8) this.bounceDir *= -1;
      return;
    }

    if (this.state === GhostState.LEAVING) {
      const targetY = 11 * TILE_SIZE + TILE_SIZE / 2;
      const targetX = 13 * TILE_SIZE + TILE_SIZE / 2;

      if (Math.abs(this.x - targetX) > 1) {
        this.x += (targetX > this.x ? 1 : -1) * 1.5;
      } else {
        this.x = targetX;
        this.y -= 1.5;
        if (this.y <= targetY) {
          this.y = targetY;
          this.state = GhostState.CHASE;
          this.dir = { x: -1, y: 0 };
        }
      }
      return;
    }

    super.update(maze, level);
  }

  onIntersection(maze, mapX, mapY) {
    if (this.state === GhostState.EATEN && Math.abs(this.x - this.homePos.x) < TILE_SIZE && Math.abs(this.y - this.homePos.y) < TILE_SIZE) {
      this.state = GhostState.LEAVING;
      this.dir = { x: 0, y: 0 };
      return;
    }

    if (this.forceReverse) {
      this.dir = { x: -this.dir.x, y: -this.dir.y };
      this.forceReverse = false;
      return;
    }

    const targetPos = this.getTargetPosition(maze.pacman, maze.blinky);
    const targetMapX = Math.floor(targetPos.x / TILE_SIZE);
    const targetMapY = Math.floor(targetPos.y / TILE_SIZE);

    const possibleDirs = [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }];

    const validDirs = possibleDirs.filter(d => {
      const isWall = maze.isWall(mapX + d.x, mapY + d.y);
      const isGate = maze.getTile(mapX + d.x, mapY + d.y) === TileType.GATE;
      if (isWall && !(isGate && this.state === GhostState.EATEN)) return false;

      // No U-Turns allowed in standard movement
      if (this.dir.x !== 0 || this.dir.y !== 0) {
        if (d.x === -this.dir.x && d.y === -this.dir.y) return false;
      }
      return true;
    });

    if (validDirs.length === 0) {
      this.dir = { x: -this.dir.x, y: -this.dir.y };
      return;
    }

    if (this.state === GhostState.FRIGHTENED) {
      this.dir = validDirs[Math.floor(Math.random() * validDirs.length)];
    } else {
      validDirs.sort((a, b) => {
        const da = Math.pow((mapX + a.x) - targetMapX, 2) + Math.pow((mapY + a.y) - targetMapY, 2);
        const db = Math.pow((mapX + b.x) - targetMapX, 2) + Math.pow((mapY + b.y) - targetMapY, 2);
        return da - db;
      });
      this.dir = validDirs[0];
    }
  }

  getTargetPosition(pacman, blinky) {
    if (this.state === GhostState.FRIGHTENED) return { x: 0, y: 0 };
    if (this.state === GhostState.SCATTER) return { x: this.scatterTarget.x * TILE_SIZE, y: this.scatterTarget.y * TILE_SIZE };
    if (this.state === GhostState.EATEN) return this.homePos;

    switch (this.name) {
      case 'Blinky': return { x: pacman.x, y: pacman.y };
      case 'Pinky': return { x: pacman.x + (pacman.dir.x * 4 * TILE_SIZE), y: pacman.y + (pacman.dir.y * 4 * TILE_SIZE) };
      case 'Inky':
        if (!blinky) return { x: pacman.x, y: pacman.y };
        const pivotX = pacman.x + (pacman.dir.x * 2 * TILE_SIZE);
        const pivotY = pacman.y + (pacman.dir.y * 2 * TILE_SIZE);
        return { x: pivotX + (pivotX - blinky.x), y: pivotY + (pivotY - blinky.y) };
      case 'Clyde':
        const distSq = Math.pow(this.x - pacman.x, 2) + Math.pow(this.y - pacman.y, 2);
        return distSq > Math.pow(8 * TILE_SIZE, 2) ? { x: pacman.x, y: pacman.y } : { x: this.scatterTarget.x * TILE_SIZE, y: this.scatterTarget.y * TILE_SIZE };
      default: return { x: pacman.x, y: pacman.y };
    }
  }

  draw(ctx) {
    const px = Math.round(this.x);
    const py = Math.round(this.y);
    const r = Math.round(TILE_SIZE / 2 - 2);

    ctx.fillStyle = this.state === GhostState.FRIGHTENED ? '#0000ff' : this.color;
    if (this.state === GhostState.EATEN) ctx.fillStyle = 'transparent';

    if (this.state !== GhostState.EATEN) {
      ctx.beginPath();
      ctx.arc(px, py - 2, r, Math.PI, 0);
      ctx.lineTo(px + r, py + r);
      ctx.lineTo(px + r / 3, py + r - 4);
      ctx.lineTo(px - r / 3, py + r);
      ctx.lineTo(px - r, py + r - 4);
      ctx.fill();
    }

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(px - 6, py - 6, 4, 0, Math.PI * 2);
    ctx.arc(px + 6, py - 6, 4, 0, Math.PI * 2);
    ctx.fill();

    const lookX = this.dir.x * 2;
    const lookY = this.dir.y * 2;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(px - 6 + lookX, py - 6 + lookY, 2, 0, Math.PI * 2);
    ctx.arc(px + 6 + lookX, py - 6 + lookY, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}