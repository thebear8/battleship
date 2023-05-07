export type FieldState = "Empty" | "Miss" | "Hit" | "Sunk";

export type GameState = {
  selectedTile: [number, number] | null;
  board: FieldState[][];
};
