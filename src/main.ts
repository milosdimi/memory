import "./styles/style.scss";
import { renderHome } from "./pages/home";
import { renderSettings } from "./pages/settings";

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
}

init();
