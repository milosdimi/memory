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

function getPlayerIcon(color: "blue" | "orange", theme: string): string {
  return `/assets/icons/chess_pawn.png`;
}

/** Renders the game board screen */
export function renderGameBoard(settings: GameSettings, cards: Card[]): string {
  const isCodeVibes = settings.theme === "code-vibes";

  const iconP1 = isCodeVibes
    ? getLabelSvg(settings.playerOne.color)
    : `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__player-icon game-board__player-icon--${settings.playerOne.color}">`;

  const iconP2 = isCodeVibes
    ? getLabelSvg(settings.playerTwo.color)
    : `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__player-icon game-board__player-icon--${settings.playerTwo.color}">`;

  const iconCurrent = isCodeVibes
    ? getLabelSvg(settings.playerOne.color).replace('id=""', 'id="current-player-icon"')
    : `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__current-icon" id="current-player-icon">`;

  return `
    <section class="game-board game-board--${settings.theme}">

      <header class="game-board__header">

        <div class="game-board__players">
          <div class="game-board__player">
            ${iconP1}
            <span class="game-board__player-name">${settings.playerOne.name}</span>
            <span class="game-board__player-score" id="score-p1">${settings.playerOne.score}</span>
          </div>
          <div class="game-board__player">
            ${iconP2}
            <span class="game-board__player-name">${settings.playerTwo.name}</span>
            <span class="game-board__player-score" id="score-p2">${settings.playerTwo.score}</span>
          </div>
        </div>

        <div class="game-board__current">
          <span class="game-board__current-label">Current player</span>
          <div id="current-player-icon">${isCodeVibes ? getLabelSvg(settings.playerOne.color) : `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__current-icon">`}</div>
        </div>

        <button class="game-board__exit-btn" id="btn-exit-game">
          <img src="/assets/icons/move_item.png" alt="" class="game-board__exit-icon">
          Exit
        </button>

      </header>

      <div class="game-board__grid game-board__grid--${settings.boardSize}" id="card-grid">
        ${cards.map(card => renderCard(card, settings.theme)).join("")}
      </div>

    </section>
  `;
}
