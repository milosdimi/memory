import type { Card, GameSettings } from "../types/types";
import { renderGameBoard } from "../pages/game-board";

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
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  btnExit.addEventListener("click", onExitCallback);
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
  const [a, b] = flippedCards;

  if (a.pairId === b.pairId) {
    a.isMatched = true;
    b.isMatched = true;
    updateCardDOM(a);
    updateCardDOM(b);

    if (currentPlayer === 1) settings.playerOne.score++;
    else settings.playerTwo.score++;

    updateScoreDOM();
    flippedCards = [];
    isLocked = false;

    if (cards.every(c => c.isMatched)) {
      setTimeout(() => onGameOverCallback(settings), 600);
    }
  } else {
    a.isFlipped = false;
    b.isFlipped = false;
    updateCardDOM(a);
    updateCardDOM(b);
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

function updateCurrentPlayerDOM(): void {
  const icon = document.getElementById("current-player-icon") as HTMLImageElement;
  if (!icon) return;
  const color = currentPlayer === 1 ? settings.playerOne.color : settings.playerTwo.color;
  icon.className = `game-board__current-icon game-board__current-icon--${color}`;
}
