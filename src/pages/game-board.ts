import type { GameSettings, Card } from "../types/types";
import { renderCard } from "../components/card";

const LABEL_COLORS = {
  blue: "#4a7fa5",
  orange: "#f4a227",
};

function getLabelSvg(color: "blue" | "orange"): string {
  const fill = LABEL_COLORS[color];
  return `
    <svg class="game-board__player-icon game-board__player-icon--${color}" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" width="40" height="24">
      <path d="M0 4 Q0 0 4 0 L28 0 L40 12 L28 24 L4 24 Q0 24 0 20 Z" fill="${fill}"/>
    </svg>
  `;
}

function renderPlayerIcon(color: "blue" | "orange", isCodeVibes: boolean): string {
  if (isCodeVibes) return getLabelSvg(color);
  return `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__player-icon game-board__player-icon--${color}">`;
}

function renderPlayer(name: string, score: number, icon: string, scoreId: string): string {
  return `
    <div class="game-board__player">
      ${icon}
      <span class="game-board__player-name">${name}</span>
      <span class="game-board__player-score" id="${scoreId}">${score}</span>
    </div>`;
}

function renderCurrentPlayer(settings: GameSettings, isCodeVibes: boolean): string {
  const icon = isCodeVibes
    ? getLabelSvg(settings.playerOne.color)
    : `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__current-icon">`;
  return `
    <div class="game-board__current">
      <span class="game-board__current-label">Current player</span>
      <div id="current-player-icon">${icon}</div>
    </div>`;
}

function renderExitButton(): string {
  return `
    <button class="game-board__exit-btn" id="btn-exit-game">
      <img src="/assets/icons/move_item.png" alt="" class="game-board__exit-icon">
      Exit
    </button>`;
}

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

function renderCardGrid(settings: GameSettings, cards: Card[]): string {
  return `
    <div class="game-board__grid game-board__grid--${settings.boardSize}" id="card-grid">
      ${cards.map(card => renderCard(card, settings.theme)).join("")}
    </div>`;
}

/** Renders the game board screen */
export function renderGameBoard(settings: GameSettings, cards: Card[]): string {
  return `
    <section class="game-board game-board--${settings.theme}">
      ${renderHeader(settings)}
      ${renderCardGrid(settings, cards)}
    </section>`;
}
