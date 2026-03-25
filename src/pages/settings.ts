import type { Theme, BoardSize, PlayerColor, GameSettings } from "../types/types";

const THEME_PREVIEWS: Record<Theme, string> = {
  "code-vibes": "/assets/previews/preview-code-vibes.png",
  "gaming": "/assets/previews/preview-gaming.png",
  "da-projects": "/assets/previews/preview-da-projects.png",
  "foods": "/assets/previews/preview-foods.png",
};

const THEME_LABELS: Record<Theme, string> = {
  "code-vibes": "Code vibes theme",
  "gaming": "Gaming theme",
  "da-projects": "DA Projects theme",
  "foods": "Foods theme",
};

/** Renders the settings screen */
export function renderSettings(): string {
  return `
    <section class="settings">
      <header class="settings__header">
        <h2 class="settings__title">Settings</h2>
      </header>

      <div class="settings__layout">

        <form class="settings__form" id="settings-form">

          <fieldset class="settings__group">
            <legend class="settings__group-title">
              <img src="/assets/icons/palette.png" alt="" class="settings__group-icon">
              Game themes
            </legend>
            <ul class="settings__options">
              <li>
                <label class="settings__option">
                  <input type="radio" name="theme" value="code-vibes" checked>
                  Code vibes theme
                </label>
              </li>
              <li>
                <label class="settings__option">
                  <input type="radio" name="theme" value="gaming">
                  Gaming theme
                </label>
              </li>
              <li>
                <label class="settings__option">
                  <input type="radio" name="theme" value="da-projects">
                  DA Projects theme
                </label>
              </li>
              <li>
                <label class="settings__option">
                  <input type="radio" name="theme" value="foods">
                  Foods theme
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="settings__group">
            <legend class="settings__group-title">
              <img src="/assets/icons/chess_pawn.png" alt="" class="settings__group-icon">
              Choose player
            </legend>
            <ul class="settings__options">
              <li>
                <label class="settings__option">
                  <input type="radio" name="player" value="blue" checked>
                  Blue
                </label>
              </li>
              <li>
                <label class="settings__option">
                  <input type="radio" name="player" value="orange">
                  Orange
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="settings__group">
            <legend class="settings__group-title">
              <img src="/assets/icons/style.png" alt="" class="settings__group-icon">
              Board size
            </legend>
            <ul class="settings__options">
              <li>
                <label class="settings__option">
                  <input type="radio" name="size" value="16" checked>
                  16 cards
                </label>
              </li>
              <li>
                <label class="settings__option">
                  <input type="radio" name="size" value="24">
                  24 cards
                </label>
              </li>
              <li>
                <label class="settings__option">
                  <input type="radio" name="size" value="36">
                  36 cards
                </label>
              </li>
            </ul>
          </fieldset>

        </form>

        <div class="settings__preview">
          <div class="settings__preview-img">
            <img src="/assets/previews/preview-code-vibes.png" alt="Theme preview" id="theme-preview-img">
          </div>

          <div class="settings__summary">
            <div class="settings__summary-info">
              <span id="summary-theme">Code vibes theme</span>
              <span class="settings__summary-divider"></span>
              <span id="summary-player">Blue</span>
              <span class="settings__summary-divider"></span>
              <span id="summary-size">16 cards</span>
            </div>
            <button class="settings__start-btn" id="btn-start-game">
              <img src="/assets/icons/stadia_controller_bnt.png" alt="" class="settings__start-icon">
              Start
            </button>
          </div>
        </div>

      </div>
    </section>
  `;
}

/** Initializes settings interactions and calls onStart with selected settings */
export function initSettings(onStart: (settings: GameSettings) => void): void {
  const form = document.getElementById("settings-form") as HTMLFormElement;
  const previewImg = document.getElementById("theme-preview-img") as HTMLImageElement;
  const summaryTheme = document.getElementById("summary-theme") as HTMLSpanElement;
  const summaryPlayer = document.getElementById("summary-player") as HTMLSpanElement;
  const summarySize = document.getElementById("summary-size") as HTMLSpanElement;
  const btnStart = document.getElementById("btn-start-game") as HTMLButtonElement;

  form.addEventListener("change", () => {
    const data = new FormData(form);
    const theme = data.get("theme") as Theme;
    const player = data.get("player") as PlayerColor;
    const size = data.get("size") as string;

    previewImg.src = THEME_PREVIEWS[theme];
    summaryTheme.textContent = THEME_LABELS[theme];
    summaryPlayer.textContent = player === "blue" ? "Blue" : "Orange";
    summarySize.textContent = `${size} cards`;
  });

  btnStart.addEventListener("click", () => {
    const data = new FormData(form);
    const theme = data.get("theme") as Theme;
    const playerColor = data.get("player") as PlayerColor;
    const size = Number(data.get("size")) as BoardSize;

    const settings: GameSettings = {
      playerOne: {
        name: playerColor === "blue" ? "Blue Player" : "Orange Player",
        color: playerColor,
        score: 0,
      },
      playerTwo: {
        name: playerColor === "blue" ? "Orange Player" : "Blue Player",
        color: playerColor === "blue" ? "orange" : "blue",
        score: 0,
      },
      boardSize: size,
      theme,
    };

    onStart(settings);
  });
}
