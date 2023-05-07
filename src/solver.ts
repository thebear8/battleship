export enum FieldState {
  Empty,
  Miss,
  Hit,
  Sunk,
  Preliminary,
}

function oracle(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createBoard() {
  return Array.from(Array(10), () => Array.from(Array(10), () => FieldState.Empty));
}

function copyBoard(from: FieldState[][], to: FieldState[][]) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      to[i][j] = from[i][j];
    }
  }
}

function placeShip(board: FieldState[][], x: number, y: number, dx: number, dy: number): boolean {
  if (x + dx > 10 || y + dy > 10) return false;

  for (let i = x; i < x + dx; ++i) {
    for (let j = y; j < y + dy; ++j) {
      if (
        board[i][j] == FieldState.Miss ||
        board[i][j] == FieldState.Sunk ||
        board[i][j] == FieldState.Preliminary
      )
        return false;
    }
  }

  for (let i = x; i < x + dx; ++i) {
    for (let j = y; j < y + dy; ++j) {
      board[i][j] = FieldState.Preliminary;
    }
  }

  return true;
}

function populateBoard(board: FieldState[][], ships: number[], attempts: number): boolean {
  for (let i = 0; i < attempts; ++i) {
    const [dx, dy] = oracle(0, 2) == 0 ? [ships[0], 1] : [1, ships[0]];
    if (placeShip(board, oracle(0, 10), oracle(0, 10), dx, dy)) {
      if (ships.length >= 2) return populateBoard(board, ships.slice(1), attempts);
      return true;
    }
  }

  return false;
}

export function solve(base: FieldState[][], timeout: number, attempts: number): number[][] {
  const board = createBoard();
  const density = Array.from(Array(10), () => Array.from(Array(10), () => 0));

  while (Date.now() < timeout) {
    copyBoard(base, board);
    if (populateBoard(board, [5, 4, 3, 3, 2], attempts)) {
      for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
          if (board[i][j] == FieldState.Preliminary) density[i][j]++;
        }
      }
    }
  }

  console.log(density);
  const max = Math.max(...density.map((a) => Math.max(...a)), 1);
  return density.map((a) => a.map((b) => b / max));
}
