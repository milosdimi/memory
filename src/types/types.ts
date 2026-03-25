export type Theme = "code-vibes" | "gaming" | "da-projects" | "foods";

export type BoardSize = 16 | 24 | 36;

export type PlayerColor = "blue" | "orange";

export interface Player {
  name: string;
  color: PlayerColor;
  score: number;
}

export interface GameSettings {
  playerOne: Player;
  playerTwo: Player;
  boardSize: BoardSize;
  theme: Theme;
}

export interface Card {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}
