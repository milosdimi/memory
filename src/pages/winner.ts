import type { GameSettings } from "../types/types";

/** Renders the winner screen */
export function renderWinner(settings: GameSettings): string {
  const winner =
    settings.playerOne.score > settings.playerTwo.score
      ? settings.playerOne
      : settings.playerTwo.score > settings.playerOne.score
      ? settings.playerTwo
      : null;

  const isDraw = winner === null;

  return `
    <section class="winner winner--${settings.theme}">
      <div class="winner__content">

        <div class="winner__icon-wrap">
          ${isDraw
            ? `<img src="/assets/icons/chess_pawn.png" alt="" class="winner__icon winner__icon--blue">
               <img src="/assets/icons/chess_pawn.png" alt="" class="winner__icon winner__icon--orange">`
            : `<img src="/assets/icons/chess_pawn.png" alt="" class="winner__icon winner__icon--${winner!.color}">`
          }
        </div>

        <h2 class="winner__title">
          ${isDraw ? "It's a Draw!" : `${winner!.name} Wins!`}
        </h2>

        <p class="winner__score">
          ${settings.playerOne.score} — ${settings.playerTwo.score}
        </p>

        <button class="winner__btn" id="btn-back-home">
          Back to Start
        </button>

      </div>
    </section>
  `;
}
