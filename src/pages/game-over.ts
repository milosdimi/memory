import type { GameSettings } from "../types/types";

function getPlayerBadge(name: string, color: "blue" | "orange", score: number, theme: string): string {
  const icon = theme === "code-vibes"
    ? `<svg viewBox="0 0 40 24" width="32" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 4 Q0 0 4 0 L28 0 L40 12 L28 24 L4 24 Q0 24 0 20 Z" fill="${color === "blue" ? "#4a7fa5" : "#f4a227"}"/>
       </svg>`
    : `<img src="/assets/icons/chess_pawn.png" class="game-over__badge-icon game-over__badge-icon--${color}" alt="">`;

  return `
    <div class="game-over__badge">
      ${icon}
      <span class="game-over__badge-name game-over__badge-name--${color}">${name}</span>
      <span class="game-over__badge-score game-over__badge-score--${color}">${score}</span>
    </div>
  `;
}

/** Renders the game over screen */
export function renderGameOver(settings: GameSettings): string {
  return `
    <section class="game-over game-over--${settings.theme}">

      <h2 class="game-over__title">Game over</h2>

      <div class="game-over__final">
        <span class="game-over__final-label">Final score</span>
        <div class="game-over__badges">
          ${getPlayerBadge(settings.playerOne.name, settings.playerOne.color, settings.playerOne.score, settings.theme)}
          ${getPlayerBadge(settings.playerTwo.name, settings.playerTwo.color, settings.playerTwo.score, settings.theme)}
        </div>
      </div>

      <button class="game-over__btn" id="btn-see-winner">See Winner &#8594;</button>

    </section>
  `;
}
