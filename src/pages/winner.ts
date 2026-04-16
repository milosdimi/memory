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

function resolveWinner(settings: GameSettings): { color: string; label: string } {
  const winner =
    settings.playerOne.score > settings.playerTwo.score
      ? settings.playerOne
      : settings.playerTwo.score > settings.playerOne.score
      ? settings.playerTwo
      : null;
  const isDraw = winner === null;
  return {
    color: isDraw ? "blue" : winner!.color,
    label: isDraw ? "It's a Draw!" : winner!.name,
  };
}

function renderWinnerIcon(theme: string, color: string): string {
  const src = theme === "gaming" ? "/assets/icons/pockal.png" : "/assets/icons/winner-player.png";
  return `<img src="${src}" alt="" class="winner__icon winner__icon--${color}">`;
}

function renderWinnerButtons(): string {
  return `
    <div class="winner__btns">
      <button class="winner__btn winner__btn--secondary" id="btn-back-home">Back to start</button>
      <button class="winner__btn winner__btn--primary" id="btn-play-again">Play again</button>
    </div>`;
}

function renderWinnerContent(settings: GameSettings): string {
  const { color, label } = resolveWinner(settings);
  return `
    <div class="winner__content">
      <p class="winner__subtitle">The winner is</p>
      <h2 class="winner__title winner__title--${color}">${label.toUpperCase()}</h2>
      ${renderWinnerIcon(settings.theme, color)}
      ${renderWinnerButtons()}
    </div>`;
}

/** Renders the winner screen */
export function renderWinner(settings: GameSettings): string {
  return `
    <section class="winner winner--${settings.theme}">
      ${renderConfetti()}
      ${renderWinnerContent(settings)}
    </section>`;
}
