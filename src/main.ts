import "./styles/style.scss";
import { renderHome } from "./pages/home";
import { renderSettings, initSettings } from "./pages/settings";
import { renderGameOver } from "./pages/game-over";
import { renderWinner } from "./pages/winner";
import { initGame } from "./game/game";
import type { GameSettings } from "./types/types";

const APP = document.getElementById("app") as HTMLElement;

/** Bootstraps the application by navigating to the home screen. */
function init(): void {
  showHome();
}

/**
 * Renders the home screen and wires up the Play button.
 */
function showHome(): void {
  APP.innerHTML = renderHome();
  const btnStart = document.getElementById("btn-start") as HTMLButtonElement;
  btnStart.addEventListener("click", showSettings);
}

/**
 * Renders the settings screen and initializes the settings form interactions.
 */
function showSettings(): void {
  APP.innerHTML = renderSettings();
  initSettings(startGame);
}

/**
 * Starts a new game with the given settings.
 * Passes showHome as the exit callback and showGameOver as the game-over callback.
 * @param settings - Settings selected by the player
 */
function startGame(settings: GameSettings): void {
  initGame(settings, showHome, showGameOver);
}

/**
 * Renders the game over screen and wires up the "See Winner" button.
 * @param settings - Final game settings with player scores
 */
function showGameOver(settings: GameSettings): void {
  APP.innerHTML = renderGameOver(settings);
  const btnWinner = document.getElementById("btn-see-winner") as HTMLButtonElement;
  btnWinner.addEventListener("click", () => showWinner(settings));
}

/**
 * Renders the winner screen and wires up "Back to start" and "Play again" buttons.
 * "Play again" resets both player scores and restarts with the same settings.
 * @param settings - Final game settings with player scores
 */
function showWinner(settings: GameSettings): void {
  APP.innerHTML = renderWinner(settings);
  const btnHome = document.getElementById("btn-back-home") as HTMLButtonElement;
  const btnPlay = document.getElementById("btn-play-again") as HTMLButtonElement;
  btnHome.addEventListener("click", showHome);
  btnPlay.addEventListener("click", () => startGame({
    ...settings,
    playerOne: { ...settings.playerOne, score: 0 },
    playerTwo: { ...settings.playerTwo, score: 0 },
  }));
}

init();
