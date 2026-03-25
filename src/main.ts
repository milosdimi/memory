import "./styles/style.scss";
import { renderHome } from "./pages/home";

const APP = document.getElementById("app") as HTMLElement;

function init(): void {
  APP.innerHTML = renderHome();
}

init();
