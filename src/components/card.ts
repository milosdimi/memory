import type { Card, Theme } from "../types/types";

/**
 * Renders a single memory card with front and back face.
 * @param card - The card data object (id, image, flip/match state)
 * @param theme - Active game theme (determines the back face image)
 * @param modifiers - Additional BEM modifier classes (e.g. "card--flipped card--matched")
 * @returns HTML string for the card element
 */
export function renderCard(card: Card, theme: Theme, modifiers = ""): string {
  return `
    <div class="card ${modifiers}" data-id="${card.id}" data-pair-id="${card.pairId}">
      <div class="card__inner">
        <div class="card__back">
          <img src="/assets/cards/${theme}/front-card.png" alt="" class="card__back-img">
        </div>
        <div class="card__front">
          <img src="${card.image}" alt="" class="card__front-img">
        </div>
      </div>
    </div>
  `;
}
