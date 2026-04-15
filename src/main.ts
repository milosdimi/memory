import "./styles/style.scss";
import { renderHome } from "./pages/home";
import { renderSettings, initSettings } from "./pages/settings";
import { renderGameOver } from "./pages/game-over";
import { renderWinner } from "./pages/winner";
import { initGame } from "./game/game";
import type { GameSettings } from "./types/types";

const APP = document.getElementById("app") as HTMLElement;

function init(): void {
  showHome();
}

function showHome(): void {
  APP.innerHTML = renderHome();
  const btnStart = document.getElementById("btn-start") as HTMLButtonElement;
  btnStart.addEventListener("click", showSettings);
}

function showSettings(): void {
  APP.innerHTML = renderSettings();
  initSettings(startGame);
}

function startGame(settings: GameSettings): void {
  initGame(settings, showHome, showGameOver);
}

function showGameOver(settings: GameSettings): void {
  APP.innerHTML = renderGameOver(settings);
  const btnWinner = document.getElementById("btn-see-winner") as HTMLButtonElement;
  btnWinner.addEventListener("click", () => showWinner(settings));
}

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
