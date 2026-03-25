import "./styles/style.scss";
import { renderHome } from "./pages/home";
import { renderSettings, initSettings } from "./pages/settings";
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
  console.log("Game started with settings:", settings);
}

init();
