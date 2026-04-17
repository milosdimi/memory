import type { GameSettings, Card } from "../types/types";
import { renderCard, renderArrowSvg, renderPawnIcon } from "../components/templates";

/**
 * Returns the player icon — SVG label for Code Vibes, chess pawn for all other themes.
 * @param color - Player color
 * @param isCodeVibes - Whether the active theme is "code-vibes"
 * @returns HTML string for the player icon
 */
function renderPlayerIcon(color: "blue" | "orange", isCodeVibes: boolean): string {
  if (isCodeVibes) return renderArrowSvg(color, `game-board__player-icon game-board__player-icon--${color}`);
  return renderPawnIcon(color, "game-board__player-icon");
}

/**
 * Renders a single player block with icon, name and score.
 * @param name - Player display name
 * @param score - Current score
 * @param icon - Pre-rendered icon HTML string
 * @param scoreId - DOM id for the score span (used for live updates)
 * @returns HTML string for one player block
 */
function renderPlayer(name: string, score: number, icon: string, scoreId: string): string {
  return `
    <div class="game-board__player">
      ${icon}
      <span class="game-board__player-name">${name}</span>
      <span class="game-board__player-score" id="${scoreId}">${score}</span>
    </div>`;
}

/**
 * Renders the "Current player" indicator section.
 * @param settings - Current game settings
 * @param isCodeVibes - Whether the active theme is "code-vibes"
 * @returns HTML string for the current player section
 */
function renderCurrentPlayer(settings: GameSettings, isCodeVibes: boolean): string {
  const icon = isCodeVibes
    ? renderArrowSvg(settings.playerOne.color, "game-board__current-icon")
    : `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__current-icon">`;
  return `
    <div class="game-board__current">
      <span class="game-board__current-label">Current player</span>
      <div id="current-player-icon">${icon}</div>
    </div>`;
}

/**
 * Renders the exit button in the game board header.
 * @returns HTML string for the exit button
 */
function renderExitButton(): string {
  return `
    <button class="game-board__exit-btn" id="btn-exit-game">
      <img src="/assets/icons/move_item.png" alt="" class="game-board__exit-icon">
      Exit
    </button>`;
}

/**
 * Renders the full game board header with both players, current player and exit button.
 * @param settings - Current game settings
 * @returns HTML string for the header element
 */
function renderHeader(settings: GameSettings): string {
  const isCodeVibes = settings.theme === "code-vibes";
  const iconP1 = renderPlayerIcon(settings.playerOne.color, isCodeVibes);
  const iconP2 = renderPlayerIcon(settings.playerTwo.color, isCodeVibes);
  return `
    <header class="game-board__header">
      <div class="game-board__players">
        ${renderPlayer(settings.playerOne.name, settings.playerOne.score, iconP1, "score-p1")}
        ${renderPlayer(settings.playerTwo.name, settings.playerTwo.score, iconP2, "score-p2")}
      </div>
      ${renderCurrentPlayer(settings, isCodeVibes)}
      ${renderExitButton()}
    </header>`;
}

/**
 * Builds the BEM modifier string for a card based on its current state.
 * @param card - The card to check
 * @returns Space-separated modifier class string
 */
function getCardModifiers(card: Card): string {
  const flipped = card.isFlipped ? "card--flipped" : "";
  const matched = card.isMatched ? "card--matched" : "";
  return `${flipped} ${matched}`.trim();
}

/**
 * Renders the card grid with all cards for the current game.
 * @param settings - Current game settings (used for board size and theme)
 * @param cards - Array of card objects to render
 * @returns HTML string for the card grid
 */
function renderCardGrid(settings: GameSettings, cards: Card[]): string {
  return `
    <ul class="game-board__grid game-board__grid--${settings.boardSize}" id="card-grid">
      ${cards.map(card => renderCard(card, settings.theme, getCardModifiers(card))).join("")}
    </ul>`;
}

/**
 * Renders the complete game board screen.
 * @param settings - Current game settings
 * @param cards - Shuffled array of cards to display
 * @returns HTML string for the full game board section
 */
export function renderGameBoard(settings: GameSettings, cards: Card[]): string {
  return `
    <section class="game-board game-board--${settings.theme}">
      ${renderHeader(settings)}
      ${renderCardGrid(settings, cards)}
    </section>`;
}
