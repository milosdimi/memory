import type { GameSettings } from "../types/types";

function renderConfetti(): string {
  const items = [
    ...Array.from({ length: 8 }, (_, i) => `winner__confetti--${i + 1}`),
    ...Array.from({ length: 8 }, (_, i) => `winner__confetti--${i + 1} winner__confetti--b${i + 1}`),
  ];
  return items.map((cls, i) => `
    <img src="/assets/confetti/confetti-${(i % 8) + 1}.png" alt="" class="winner__confetti ${cls}">
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
  const iconSrc = settings.theme === "gaming"
    ? "/assets/icons/pockal.png"
    : "/assets/icons/winner-player.png";

  return `
    <section class="winner winner--${settings.theme}">

      ${renderConfetti()}

      <div class="winner__content">
        <p class="winner__subtitle">The winner is</p>

        <h2 class="winner__title winner__title--${color}">
          ${label.toUpperCase()}
        </h2>

        <img
          src="${iconSrc}"
          alt=""
          class="winner__icon winner__icon--${color}"
        >

        <div class="winner__btns">
          <button class="winner__btn winner__btn--secondary" id="btn-back-home">Back to start</button>
          <button class="winner__btn winner__btn--primary" id="btn-play-again">Play again</button>
        </div>
      </div>

    </section>
  `;
}
