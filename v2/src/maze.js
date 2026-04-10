export const TILE_SIZE = 32;

export const TileType = {
  EMPTY: 0,
  WALL: 1,
  PELLET: 2,
  POWER_PELLET: 3,
  GHOST_HOUSE: 4,
  GATE: 5
};

/* MAP 1: The "Thin Arcade" (Your sleek standard map) */
const MAP_1 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W............WW............W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "WoWWWW.WWWWW.WW.WWWWW.WWWWoW",
  "W..........................W",
  "W.WW.WWWWWWWWWWWWWWWWWW.WW.W",
  "W.WW.........WW.........WW.W",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "W............WW............W",
  "WWWWWW.WWWWW    WWWWW.WWWWWW", // <-- GHOST HOUSE ANCHOR (Rows 10-16)
  "     W.WW          WW.W     ",
  "     W.WW WW GG WW WW.W     ",
  "WWWWWW.WW W      W WW.WWWWWW",
  "      .   W      W   .      ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "     W.WW          WW.W     ",
  "     W.WW WWWWWWWW WW.W     ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "W............WW............W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "W...WW................WW...W",
  "WWW.WW.WW.        .WW.WW.WWW", // <-- PAC-MAN SPAWN ANCHOR (Row 23)
  "WWW.WW.WW.WWWWWWWW.WW.WW.WWW",
  "W......WW....WW....WW......W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W..........................W",
  "W.WWWWWWWWWWWWWWWWWWWWWWWW.W",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 2: "The Grid" (Blocky, lots of tight intersections) */
const MAP_2 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W............WW............W",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "WoWW.WWWWWWW.WW.WWWWWWW.WWoW",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "W..........................W",
  "W.WWWW.WWWWWWWWWWWWWW.WWWW.W",
  "W.WWWW.WWWWWWWWWWWWWW.WWWW.W",
  "W......WW..........WW......W",
  "WWWWWW.WW.WWWWWWWW.WW.WWWWWW",
  "WWWWWW.WWWWW    WWWWW.WWWWWW",
  "     W.WW          WW.W     ",
  "     W.WW WW GG WW WW.W     ",
  "WWWWWW.WW W      W WW.WWWWWW",
  "      .   W      W   .      ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "     W.WW          WW.W     ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "W............WW............W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "W.WWWW.WWWWW.WW.WWWWW.WWWW.W",
  "W......WW..........WW......W",
  "WWW.WW.WW.        .WW.WW.WWW",
  "WWW.WW.WW.WWWWWWWW.WW.WW.WWW",
  "W...WW.WW.WWWWWWWW.WW.WW...W",
  "W.W.WW................WW.W.W",
  "W.W.WWWWWWWW.WW.WWWWWWWW.W.W",
  "W.W..........WW..........W.W",
  "WoWWWWWWWWWWWWWWWWWWWWWWWWoW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 3: "The Rings" (Nested outer and inner paths) */
const MAP_3 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W..........................W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "WoW........W.WW.W........WoW",
  "W.W.WWWWWW.W.WW.W.WWWWWW.W.W",
  "W.W.WWWWWW.W.WW.W.WWWWWW.W.W",
  "W.W.WWWWWW.W.WW.W.WWWWWW.W.W",
  "W.W........W....W........W.W",
  "W.WWWWWWWWWW.WW.WWWWWWWWWW.W",
  "W............WW............W",
  "WWWWWW.WWWWW    WWWWW.WWWWWW",
  "     W.WW          WW.W     ",
  "     W.WW WW GG WW WW.W     ",
  "WWWWWW.WW W      W WW.WWWWWW",
  "      .   W      W   .      ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "     W.WW          WW.W     ",
  "     W.WW.WWWWWWWW.WW.W     ",
  "WWWWWW.WW.WWWWWWWW.WW.WWWWWW",
  "W..........................W",
  "W.WWWW.WWWWWWWWWWWWWW.WWWW.W",
  "W.WWWW.WWWWWWWWWWWWWW.WWWW.W",
  "W......WW..........WW......W",
  "WWW.WW.WW.        .WW.WW.WWW",
  "WWW.WW.WW.WWWWWWWW.WW.WW.WWW",
  "W......WW.WWWWWWWW.WW......W",
  "W.WWWWWW.................W.W",
  "W.WWWWWW.WW.WWWWWWWW.WW.WW.W",
  "W........WW.WWWWWWWW.WW....W",
  "WoWWWWWWWWWWWWWWWWWWWWWWWWoW",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];

/* MAP 4: "The Highway" (Long straights, fast chases) */
const MAP_4 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W..........................W",
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "WoWW.WW.WW.WWWWWW.WW.WW.WWoW",
  "W.WW.WW.WW.WWWWWW.WW.WW.WW.W",
  "W..........................W",
  "W.WW.WW.WWWWWWWWWWWW.WW.WW.W",
  "W.WW.WW.WWWWWWWWWWWW.WW.WW.W",
  "W.WW.WW......WW......WW.WW.W",
  "W.WW.WWWWWWW.WW.WWWWWWW.WW.W",
  "WWWWWW.WWWWW    WWWWW.WWWWWW",
  "     W.WW          WW.W     ",
  "     W.WW WW GG WW WW.W     ",
  "WWWWWW.WW W      W WW.WWWWWW",
  "      .   W      W   .      ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "     W.WW          WW.W     ",
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

/* MAP 5: "The Labyrinth" (Highly Complex. Extreme Zig-Zags.) */
const MAP_5 = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W.o........W....W........o.W",
  "W.WW.WWWWW.W.WW.W.WWWWW.WW.W",
  "W.W......W.W.WW.W.W......W.W",
  "W.W.WWWW.W.W.WW.W.W.WWWW.W.W",
  "W.W.W....W.W....W.W....W.W.W",
  "W.W.W.WWWW.WWWWWW.WWWW.W.W.W",
  "W.W.W.W....W....W....W.W.W.W",
  "W.W.W.W.WWWW.WW.WWWW.W.W.W.W",
  "W.......W....WW....W.......W",
  "WWWWWW.WWWWW    WWWWW.WWWWWW",
  "     W.WW          WW.W     ",
  "     W.WW WW GG WW WW.W     ",
  "WWWWWW.WW W      W WW.WWWWWW",
  "      .   W      W   .      ",
  "WWWWWW.WW WWWWWWWW WW.WWWWWW",
  "     W.WW          WW.W     ",
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

// Combine all maps into a pool
const MAP_POOL = [MAP_1, MAP_2, MAP_3, MAP_4, MAP_5];

export class Maze {
  constructor() {
    this.cols = 28;
    this.rows = 31;
    this.data = [];
    this.generate(); // Automatically selects a random map on load
  }

  generate() {
    this.data = [];

    // Pick a random index between 0 and 4
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