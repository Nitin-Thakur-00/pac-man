export const TILE_SIZE = 32;

export const TileType = {
  EMPTY: 0,
  WALL: 1,
  PELLET: 2,
  POWER_PELLET: 3,
  GHOST_HOUSE: 4,
  GATE: 5
};

/* MAP 1: "The Plaza" (Wide open around the middle) */
const MAP_1 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W............WW............W",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "WoWW.WWWWWWW.WW.WWWWWWW.WWoW",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "W..........................W",
  "W.WW.WW.WWWWWWWWWWWW.WW.WW.W",
  "W.WW.WW.WWWWWWWWWWWW.WW.WW.W",
  "W....WW......WW......WW....W",
  "WWWW.WWWWWWW WW WWWWWWW.WWWW",
  "WWWW.WWWWWWW WW WWWWWWW.WWWW",
  "W                          W", // Massive open space!
  "W.WW WW WWWW GG WWWW WW WW.W",
  "W.WW WW W          W WW WW.W",
  "     WW W          W WW     ", // Tunnel
  "W.WW WW WWWWWWWWWWWW WW WW.W",
  "W.WW WW              WW WW.W",
  "W....WW WWWWWWWWWWWW WW....W",
  "WWWW.WW WWWWWWWWWWWW WW.WWWW",
  "W............WW............W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W....WW..............WW....W",
  "W.WW.WW.WW.      .WW.WW.WW.W", // Pac-Man spawn
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "W.WW....WW.WWWWWW.WW....WW.W",
  "W.WWWWWWWW.WWWWWW.WWWWWWWW.W",
  "W.WWWWWWWW.WWWWWW.WWWWWWWW.W",
  "W..........................W",
  "WoWWWWWWWWWWWWWWWWWWWWWWWWoW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 2: "Swiss Cheese" (Short, punchy walls) */
const MAP_2 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W............WW............W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "WoWWWW.WWWWW.WW.WWWWW.WWWWoW",
  "W..........................W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W......WW....WW....WW......W",
  "WWWWWW.WWWWW WW WWWWW.WWWWWW",
  "WWWWWW.WWWWW WW WWWWW.WWWWWW",
  "W                          W",
  "W.WW WW WWWW GG WWWW WW WW.W",
  "W.WW WW W          W WW WW.W",
  "     WW W          W WW     ",
  "W.WW WW WWWWWWWWWWWW WW WW.W",
  "W                          W",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "W............WW............W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "W...WW................WW...W",
  "WWW.WW.WW.        .WW.WW.WWW",
  "WWW.WW.WW.WWWWWWWW.WW.WW.WWW",
  "W......WW....WW....WW......W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W..........................W",
  "WoWWWWWWWWWWWWWWWWWWWWWWWWoW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 3: "The Blocks" (Extremely open corners) */
const MAP_3 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W..........................W",
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "WoWW.WW.WW.WWWWWW.WW.WW.WWoW",
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "W..........................W",
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "W....WW......WW......WW....W",
  "WWWW.WWWWWWW WW WWWWWWW.WWWW",
  "WWWW.WWWWWWW WW WWWWWWW.WWWW",
  "W                          W",
  "W.WW WW WWWW GG WWWW WW WW.W",
  "W.WW WW W          W WW WW.W",
  "     WW W          W WW     ",
  "W.WW WW WWWWWWWWWWWW WW WW.W",
  "W                          W",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "W..........................W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W............WW............W",
  "WWW.WW.WW.        .WW.WW.WWW",
  "WWW.WW.WW.WW.WW.WW.WW.WW.WWW",
  "W......WW.WW.WW.WW.WW......W",
  "W.WWWW.WW.WW.WW.WW.WW.WWWW.W",
  "W.WWWW.WW.WW.WW.WW.WW.WWWW.W",
  "W..........................W",
  "WoWWWWWWWWWWWWWWWWWWWWWWWWoW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 4: "The Cross" (Lots of short 2x2 pillars) */
const MAP_4 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W..........................W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "WoWWWW.WW.WWWWWWWW.WW.WWWWoW",
  "W......WW..........WW......W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W..........................W",
  "WWWWWW.WWWWW WW WWWWW.WWWWWW",
  "WWWWWW.WWWWW WW WWWWW.WWWWWW",
  "W                          W",
  "W.WW WW WWWW GG WWWW WW WW.W",
  "W.WW WW W          W WW WW.W",
  "     WW W          W WW     ",
  "W.WW WW WWWWWWWWWWWW WW WW.W",
  "W                          W",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "W..........................W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W......WW..........WW......W",
  "W.WWWW.WW.        .WW.WWWW.W",
  "W.WWWW.WW.WWWWWWWW.WW.WWWW.W",
  "W.........WWWWWWWW.........W",
  "WWWWWW.WW..........WW.WWWWWW",
  "WWWWWW.WW.WWWWWWWW.WW.WWWWWW",
  "WWWWWW.WW.WWWWWWWW.WW.WWWWWW",
  "W..........................W",
  "WoWWWWWWWWWWWWWWWWWWWWWWWWoW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 5: "The Funhouse" (Very erratic, lots of escape routes) */
const MAP_5 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W.o........W....W........o.W",
  "W.WW.WWWWW.W.WW.W.WWWWW.WW.W",
  "W.W......W.W.WW.W.W......W.W",
  "W.W.WWWW.W.W.WW.W.W.WWWW.W.W",
  "W.W.W....W.W....W.W....W.W.W",
  "W.W.W.WWWW.WWWWWW.WWWW.W.W.W",
  "W.W.W.W....W....W....W.W.W.W",
  "W.W.W.W.WWWW WW WWWW.W.W.W.W",
  "W.......W....WW....W.......W",
  "WWWWWW.WWWWW    WWWWW.WWWWWW",
  "W                          W",
  "W.WW WW WWWW GG WWWW WW WW.W",
  "W.WW WW W          W WW WW.W",
  "     WW W          W WW     ",
  "W.WW WW WWWWWWWWWWWW WW WW.W",
  "W                          W",
  "WWWWWW.WW WW.WW.WW WW.WWWWWW",
  "WWWWWW.WW WW.WW.WW WW.WWWWWW",
  "W.........W......W.........W",
  "W.WWWWWWW.W.WWWW.W.WWWWWWW.W",
  "W.W.......W.W..W.W.......W.W",
  "W.W.WWWWW.W.W..W.W.WWWWW.W.W",
  "WWW.WW.WW.        .WW.WW.WWW",
  "WWW.WW.WW.WWWWWWWW.WW.WW.WWW",
  "W.W.W.....W......W.....W.W.W",
  "W.W.W.WWWWW.WWWW.WWWWW.W.W.W",
  "W.W.W.W.....W..W.....W.W.W.W",
  "W.W.W.W.WWWWW..WWWWW.W.W.W.W",
  "Wo.................W......oW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

const MAP_POOL = [MAP_1, MAP_2, MAP_3, MAP_4, MAP_5];

export class Maze {
  constructor() {
    this.cols = 28;
    this.rows = 31;
    this.data = [];
    this.generate();
  }

  generate() {
    this.data = [];
    const randomIndex = Math.floor(Math.random() * MAP_POOL.length);
    const selectedTemplate = MAP_POOL[randomIndex];

    for (let y = 0; y < this.rows; y++) {
      const row = [];
      const stringRow = selectedTemplate[y];
      for (let x = 0; x < this.cols; x++) {
        const char = stringRow[x];

        if (char === 'W') row.push(TileType.WALL);
        else if (char === '.') row.push(TileType.PELLET);
        else if (char === 'o') row.push(TileType.POWER_PELLET);
        else if (char === 'G') row.push(TileType.GATE);
        else row.push(TileType.EMPTY);
      }
      this.data.push(row);
    }
  }

  getTile(x, y) {
    if (y === 14 && (x < 0 || x >= this.cols)) return TileType.EMPTY;
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return TileType.WALL;
    return this.data[Math.floor(y)][Math.floor(x)];
  }

  isWall(x, y) {
    const t = this.getTile(x, y);
    return t === TileType.WALL || t === TileType.GATE;
  }
}