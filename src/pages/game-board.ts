import type { GameSettings, Card } from "../types/types";
import { renderCard } from "../components/card";

/** Renders the game board screen */
export function renderGameBoard(settings: GameSettings, cards: Card[]): string {
  return `
    <section class="game-board">

      <header class="game-board__header">

        <div class="game-board__players">
          <div class="game-board__player">
            <img src="/assets/icons/chess_pawn.png" alt="" class="game-board__player-icon game-board__player-icon--blue">
            <span class="game-board__player-name">${settings.playerOne.name}</span>
            <span class="game-board__player-score" id="score-p1">${settings.playerOne.score}</span>
          </div>
          <div class="game-board__player">
            <img src="/assets/icons/chess_pawn.png" alt="" class="game-board__player-icon game-board__player-icon--orange">
            <span class="game-board__player-name">${settings.playerTwo.name}</span>
            <span class="game-board__player-score" id="score-p2">${settings.playerTwo.score}</span>
          </div>
        </div>

        <div class="game-board__current">
          <span class="game-board__current-label">Current player</span>
          <img src="/assets/icons/chess_pawn.png" alt="" class="game-board__current-icon" id="current-player-icon">
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
