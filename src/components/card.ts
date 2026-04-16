import type { Card, Theme } from "../types/types";

/**
 * Renders a single memory card with front and back face.
 * Applies `card--flipped` and `card--matched` modifier classes based on card state.
 * @param card - The card data object (id, image, flip/match state)
 * @param theme - Active game theme (determines the back face image)
 * @returns HTML string for the card element
 */
export function renderCard(card: Card, theme: Theme): string {
  const flipped = card.isFlipped ? "card--flipped" : "";
  const matched = card.isMatched ? "card--matched" : "";

  return `
    <div class="card ${flipped} ${matched}" data-id="${card.id}" data-pair-id="${card.pairId}">
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
