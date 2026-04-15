import type { GameSettings } from "../types/types";

function renderConfetti(): string {
  return Array.from({ length: 8 }, (_, i) => `
    <img src="/assets/confetti/confetti-${i + 1}.png" alt="" class="winner__confetti winner__confetti--${i + 1}">
  `).join("");
}

/** Renders the winner screen */
export function renderWinner(settings: GameSettings): string {
  const winner =
    settings.playerOne.score > settings.playerTwo.score
      ? settings.playerOne
      : settings.playerTwo.score > settings.playerOne.score
      ? settings.playerTwo
      : null;

  const isDraw = winner === null;
  const color = isDraw ? "blue" : winner!.color;
  const label = isDraw ? "It's a Draw!" : winner!.name;

  return `
    <section class="winner winner--${settings.theme}">

      ${renderConfetti()}

      <div class="winner__content">
        <p class="winner__subtitle">The winner is</p>

        <h2 class="winner__title winner__title--${color}">
          ${label.toUpperCase()}
        </h2>

        <img
          src="/assets/icons/chess_pawn.png"
          alt=""
          class="winner__icon winner__icon--${color}"
        >

        <button class="winner__btn" id="btn-back-home">Back to start</button>
      </div>

    </section>
  `;
}
