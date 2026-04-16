import type { GameSettings, PlayerColor } from "../types/types";
import { renderArrowSvg, renderPawnIcon } from "../components/templates";

/**
 * Renders the player badge icon — small SVG label for Code Vibes, chess pawn for all other themes.
 * @param color - Player color
 * @param theme - Active game theme
 * @returns HTML string for the badge icon
 */
function renderBadgeIcon(color: PlayerColor, theme: string): string {
  if (theme === "code-vibes") return renderArrowSvg(color, "", 32, 20);
  return renderPawnIcon(color, "game-over__badge-icon");
}

/**
 * Renders a single player score badge with icon, name and score.
 * @param name - Player display name
 * @param color - Player color
 * @param score - Final score
 * @param theme - Active game theme (determines icon style)
 * @returns HTML string for one player badge
 */
function renderPlayerBadge(name: string, color: PlayerColor, score: number, theme: string): string {
  return `
    <div class="game-over__badge">
      ${renderBadgeIcon(color, theme)}
      <span class="game-over__badge-name game-over__badge-name--${color}">${name}</span>
      <span class="game-over__badge-score game-over__badge-score--${color}">${score}</span>
    </div>`;
}

/**
 * Renders the final score section with both player badges.
 * @param settings - Current game settings with player scores
 * @returns HTML string for the final score block
 */
function renderFinalScore(settings: GameSettings): string {
  return `
    <div class="game-over__final">
      <span class="game-over__final-label">Final score</span>
      <div class="game-over__badges">
        ${renderPlayerBadge(settings.playerOne.name, settings.playerOne.color, settings.playerOne.score, settings.theme)}
        ${renderPlayerBadge(settings.playerTwo.name, settings.playerTwo.color, settings.playerTwo.score, settings.theme)}
      </div>
    </div>`;
}

/**
 * Renders the game over screen with final scores and a button to see the winner.
 * @param settings - Current game settings with final player scores
 * @returns HTML string for the game over section
 */
export function renderGameOver(settings: GameSettings): string {
  return `
    <section class="game-over game-over--${settings.theme}">
      <h2 class="game-over__title">Game over</h2>
      ${renderFinalScore(settings)}
      <button class="game-over__btn" id="btn-see-winner">See Winner &#8594;</button>
    </section>`;
}
