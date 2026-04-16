/** Available game themes */
export type Theme = "code-vibes" | "gaming" | "da-projects" | "foods";

/** Number of cards on the board */
export type BoardSize = 16 | 24 | 36;

/** Player color identifier */
export type PlayerColor = "blue" | "orange";

/** Represents a player with their display name, color and current score */
export interface Player {
  name: string;
  color: PlayerColor;
  score: number;
}

/** All settings chosen before a game starts */
export interface GameSettings {
  playerOne: Player;
  playerTwo: Player;
  boardSize: BoardSize;
  theme: Theme;
}

/** Represents a single memory card with its state */
export interface Card {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}
