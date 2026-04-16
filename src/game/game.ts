import type { Card, GameSettings } from "../types/types";
import { renderGameBoard } from "../pages/game-board";
import { showExitPopup } from "../components/popup";

// ── State ─────────────────────────────────────────────────

let cards: Card[] = [];
let flippedCards: Card[] = [];
let isLocked = false;
let currentPlayer: 1 | 2 = 1;
let settings: GameSettings;
let onExitCallback: () => void;
let onGameOverCallback: (settings: GameSettings) => void;

// ── Init ──────────────────────────────────────────────────

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

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

// ── Events ────────────────────────────────────────────────

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

function checkMatch(): void {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.pairId === secondCard.pairId) {
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
  } else {
    firstCard.isFlipped = false;
    secondCard.isFlipped = false;
    updateCardDOM(firstCard);
    updateCardDOM(secondCard);
    flippedCards = [];
    isLocked = false;

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayerDOM();
  }
}

// ── DOM Updates ───────────────────────────────────────────

function updateCardDOM(card: Card): void {
  const el = document.querySelector(`[data-id="${card.id}"]`) as HTMLElement;
  if (!el) return;
  el.classList.toggle("card--flipped", card.isFlipped);
  el.classList.toggle("card--matched", card.isMatched);
}

function updateScoreDOM(): void {
  const s1 = document.getElementById("score-p1");
  const s2 = document.getElementById("score-p2");
  if (s1) s1.textContent = String(settings.playerOne.score);
  if (s2) s2.textContent = String(settings.playerTwo.score);
}

const LABEL_COLORS: Record<string, string> = { blue: "#4a7fa5", orange: "#f4a227" };

function renderCurrentIcon(color: string, theme: string): string {
  if (theme === "code-vibes") {
    const fill = LABEL_COLORS[color];
    return `<svg class="game-board__current-icon" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" width="40" height="24">
      <path d="M0 4 Q0 0 4 0 L28 0 L40 12 L28 24 L4 24 Q0 24 0 20 Z" fill="${fill}"/>
    </svg>`;
  }
  return `<img src="/assets/icons/chess_pawn.png" alt="" class="game-board__current-icon game-board__current-icon--${color}">`;
}

function updateCurrentPlayerDOM(): void {
  const wrap = document.getElementById("current-player-icon") as HTMLElement;
  if (!wrap) return;
  const color = currentPlayer === 1 ? settings.playerOne.color : settings.playerTwo.color;
  wrap.innerHTML = renderCurrentIcon(color, settings.theme);
}
