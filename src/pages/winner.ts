import type { GameSettings } from "../types/types";

/**
 * Renders all 16 confetti images (8 top + 8 bottom variants) for the winner animation.
 * @returns HTML string with all confetti img elements
 */
function renderConfetti(): string {
  const items = [
    ...Array.from({ length: 8 }, (_, i) => `winner__confetti--${i + 1}`),
    ...Array.from({ length: 8 }, (_, i) => `winner__confetti--${i + 1} winner__confetti--b${i + 1}`),
  ];
  return items.map((cls, i) => `
    <img src="/assets/confetti/confetti-${(i % 8) + 1}.png" alt="" class="winner__confetti ${cls}">
  `).join("");
}

/**
 * Determines the winner by comparing scores, or detects a draw.
 * @param settings - Current game settings with final player scores
 * @returns Object with `color` (for styling) and `label` (display name or draw text)
 */
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

/**
 * Renders the winner trophy or player icon — trophy for Gaming theme, player icon for all others.
 * @param theme - Active game theme
 * @param color - Winner's color (used for the color modifier class)
 * @returns HTML string for the winner icon
 */
function renderWinnerIcon(theme: string, color: string): string {
  const src = theme === "gaming" ? "/assets/icons/pockal.png" : "/assets/icons/winner-player.png";
  return `<img src="${src}" alt="Winner trophy" class="winner__icon winner__icon--${color}">`;
}

/**
 * Renders the action buttons on the winner screen.
 * @returns HTML string with "Back to start" and "Play again" buttons
 */
function renderWinnerButtons(): string {
  return `
    <div class="winner__btns">
      <button class="winner__btn winner__btn--secondary" id="btn-back-home">Back to start</button>
      <button class="winner__btn winner__btn--primary" id="btn-play-again">Play again</button>
    </div>`;
}

/**
 * Renders the winner content block with title, name, icon and action buttons.
 * @param settings - Current game settings with final player scores
 * @returns HTML string for the winner content div
 */
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

/**
 * Renders the complete winner screen with confetti and winner announcement.
 * @param settings - Current game settings with final player scores
 * @returns HTML string for the winner section
 */
export function renderWinner(settings: GameSettings): string {
  return `
    <section class="winner winner--${settings.theme}">
      ${renderConfetti()}
      ${renderWinnerContent(settings)}
    </section>`;
}
