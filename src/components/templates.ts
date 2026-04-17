import type { Card, PlayerColor, Theme } from "../types/types";

/** Hex fill colors per player color */
export const LABEL_COLORS: Record<PlayerColor, string> = {
  blue: "#4a7fa5",
  orange: "#f4a227",
};

/**
 * Renders the arrow-shaped SVG label used in the Code Vibes theme.
 * @param color - Player color
 * @param cssClass - CSS class(es) to apply to the SVG (omit for no class attribute)
 * @param width - SVG width in px (default: 40)
 * @param height - SVG height in px (default: 24)
 * @returns SVG HTML string
 */
export function renderArrowSvg(color: PlayerColor, cssClass = "", width = 40, height = 24): string {
  const fill = LABEL_COLORS[color];
  const classAttr = cssClass ? ` class="${cssClass}"` : "";
  return `<svg${classAttr} viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <path d="M0 4 Q0 0 4 0 L28 0 L40 12 L28 24 L4 24 Q0 24 0 20 Z" fill="${fill}"/>
  </svg>`;
}

/**
 * Renders a chess pawn icon used in all non-Code-Vibes themes.
 * The color modifier class is appended automatically: `${cssClass}--${color}`.
 * @param color - Player color
 * @param cssClass - Base CSS class for the img element
 * @returns img HTML string
 */
export function renderPawnIcon(color: PlayerColor, cssClass: string): string {
  return `<img src="/assets/icons/chess_pawn.png" alt="" class="${cssClass} ${cssClass}--${color}">`;
}

/**
 * Renders a single memory card with front and back face.
 * @param card - The card data object (id, image, flip/match state)
 * @param theme - Active game theme (determines the back face image)
 * @param modifiers - Additional BEM modifier classes (e.g. "card--flipped card--matched")
 * @returns HTML string for the card element
 */
export function renderCard(card: Card, theme: Theme, modifiers = ""): string {
  return `
    <li class="card ${modifiers}" data-id="${card.id}" data-pair-id="${card.pairId}">
      <div class="card__inner">
        <div class="card__back">
          <img src="/assets/cards/${theme}/front-card.png" alt="" class="card__back-img">
        </div>
        <div class="card__front">
          <img src="${card.image}" alt="" class="card__front-img">
        </div>
      </div>
    </li>
  `;
}
