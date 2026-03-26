import type { GameSettings } from "../types/types";

/** Renders the game over screen */
export function renderGameOver(settings: GameSettings): string {
  return `
    <section class="game-over">
      <div class="game-over__card">

        <h2 class="game-over__title">Final Score</h2>

        <div class="game-over__scores">
          <div class="game-over__player">
            <img src="/assets/icons/chess_pawn.png" alt="" class="game-over__player-icon game-over__player-icon--blue">
            <span class="game-over__player-name">${settings.playerOne.name}</span>
            <span class="game-over__player-score">${settings.playerOne.score}</span>
          </div>

          <span class="game-over__vs">VS</span>

          <div class="game-over__player">
            <img src="/assets/icons/chess_pawn.png" alt="" class="game-over__player-icon game-over__player-icon--orange">
            <span class="game-over__player-name">${settings.playerTwo.name}</span>
            <span class="game-over__player-score">${settings.playerTwo.score}</span>
          </div>
        </div>

        <button class="game-over__btn" id="btn-see-winner">
          See Winner
          <span>&#8594;</span>
        </button>

      </div>
    </section>
  `;
}
