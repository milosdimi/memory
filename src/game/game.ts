import type { Card, GameSettings, PlayerColor } from "../types/types";
import { renderGameBoard } from "../pages/game-board";
import { showExitPopup } from "../components/popup";
import { renderArrowSvg, renderPawnIcon } from "../components/templates";

// ── State ─────────────────────────────────────────────────

let cards: Card[] = [];
let flippedCards: Card[] = [];
let isLocked = false;
let currentPlayer: 1 | 2 = 1;
let settings: GameSettings;
let onExitCallback: () => void;
let onGameOverCallback: (settings: GameSettings) => void;

// ── Init ──────────────────────────────────────────────────

/**
 * Initializes a new game: sets state, renders the board and attaches all events.
 * @param gameSettings - Settings chosen by the player (theme, board size, players)
 * @param onExit - Callback invoked when the player confirms exit
 * @param onGameOver - Callback invoked with final settings when all cards are matched
 */
export function initGame(
  gameSettings: GameSettings,
  onExit: () => void,
  onGameOver: (s: GameSettings) => void
): void {
  settings = gameSettings;
  onExitCallback = onExit;
  onGameOverCallback = onGameOver;
  currentPlayer = 1;
  flippedCards = [];
  isLocked = false;

  cards = generateCards(settings);

  const APP = document.getElementById("app") as HTMLElement;
  APP.innerHTML = renderGameBoard(settings, cards);

  updateCurrentPlayerDOM();
  attachEvents();
}

// ── Card Generation ───────────────────────────────────────

/**
 * Generates a shuffled array of card pairs based on the board size and theme.
 * @param s - Current game settings
 * @returns Shuffled array of Card objects
 */
function generateCards(s: GameSettings): Card[] {
  const pairCount = s.boardSize / 2;
  const result: Card[] = [];

  for (let i = 1; i <= pairCount; i++) {
    const padded = String(i).padStart(2, "0");
    const image = `/assets/cards/${s.theme}/card-${padded}.png`;

    result.push(
      { id: (i - 1) * 2,     pairId: i, image, isFlipped: false, isMatched: false },
      { id: (i - 1) * 2 + 1, pairId: i, image, isFlipped: false, isMatched: false }
    );
  }

  return shuffle(result);
}

/**
 * Returns a new array with the elements shuffled using the Fisher-Yates algorithm.
 * @param arr - Array to shuffle
 * @returns New shuffled array (original is not mutated)
 */
function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

// ── Events ────────────────────────────────────────────────

/**
 * Attaches click events to the card grid and the exit button.
 */
function attachEvents(): void {
  const grid = document.getElementById("card-grid") as HTMLElement;
  grid.addEventListener("click", (e) => {
    const cardEl = (e.target as HTMLElement).closest(".card") as HTMLElement;
    if (!cardEl) return;
    handleCardClick(Number(cardEl.dataset.id));
  });

  const btnExit = document.getElementById("btn-exit-game") as HTMLButtonElement;
  btnExit.addEventListener("click", () => showExitPopup(onExitCallback, settings.theme));
}

// ── Flip Logic ────────────────────────────────────────────

/**
 * Handles a card click: flips the card and triggers match check after two cards are flipped.
 * Ignores clicks when the board is locked or the card is already flipped/matched.
 * @param cardId - The id of the clicked card
 */
function handleCardClick(cardId: number): void {
  if (isLocked) return;

  const card = cards.find(c => c.id === cardId);
  if (!card || card.isFlipped || card.isMatched) return;

  card.isFlipped = true;
  updateCardDOM(card);
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    isLocked = true;
    setTimeout(checkMatch, 900);
  }
}

/**
 * Handles a successful card match: marks both cards, updates score and checks for game over.
 * @param firstCard - First flipped card
 * @param secondCard - Second flipped card
 */
function handleMatch(firstCard: Card, secondCard: Card): void {
  firstCard.isMatched = true;
  secondCard.isMatched = true;
  updateCardDOM(firstCard);
  updateCardDOM(secondCard);

  if (currentPlayer === 1) settings.playerOne.score++;
  else settings.playerTwo.score++;

  updateScoreDOM();
  flippedCards = [];
  isLocked = false;

  if (cards.every(c => c.isMatched)) {
    setTimeout(() => onGameOverCallback(settings), 600);
  }
}

/**
 * Handles a failed match: flips both cards back and passes the turn to the other player.
 * @param firstCard - First flipped card
 * @param secondCard - Second flipped card
 */
function handleMismatch(firstCard: Card, secondCard: Card): void {
  firstCard.isFlipped = false;
  secondCard.isFlipped = false;
  updateCardDOM(firstCard);
  updateCardDOM(secondCard);
  flippedCards = [];
  isLocked = false;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateCurrentPlayerDOM();
}

/**
 * Checks whether the two flipped cards form a pair and delegates to the appropriate handler.
 */
function checkMatch(): void {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.pairId === secondCard.pairId) handleMatch(firstCard, secondCard);
  else handleMismatch(firstCard, secondCard);
}

// ── DOM Updates ───────────────────────────────────────────

/**
 * Syncs the card element's CSS classes with its current flipped and matched state.
 * @param card - The card whose DOM element should be updated
 */
function updateCardDOM(card: Card): void {
  const el = document.querySelector(`[data-id="${card.id}"]`) as HTMLElement;
  if (!el) return;
  el.classList.toggle("card--flipped", card.isFlipped);
  el.classList.toggle("card--matched", card.isMatched);
}

/**
 * Updates both player score displays in the header.
 */
function updateScoreDOM(): void {
  const s1 = document.getElementById("score-p1");
  const s2 = document.getElementById("score-p2");
  if (s1) s1.textContent = String(settings.playerOne.score);
  if (s2) s2.textContent = String(settings.playerTwo.score);
}

/**
 * Renders the current player icon — arrow SVG for Code Vibes, chess pawn for all other themes.
 * @param color - Active player's color
 * @param theme - Active game theme
 * @returns HTML string for the current player icon
 */
function renderCurrentIcon(color: PlayerColor, theme: string): string {
  if (theme === "code-vibes") return renderArrowSvg(color, "game-board__current-icon");
  return renderPawnIcon(color, "game-board__current-icon");
}

/**
 * Updates the current player icon in the DOM after a turn change.
 */
function updateCurrentPlayerDOM(): void {
  const wrap = document.getElementById("current-player-icon") as HTMLElement;
  if (!wrap) return;
  const color = currentPlayer === 1 ? settings.playerOne.color : settings.playerTwo.color;
  wrap.innerHTML = renderCurrentIcon(color, settings.theme);
}
