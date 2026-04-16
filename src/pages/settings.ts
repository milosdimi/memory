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

function renderThemeFieldset(): string {
  return `
    <fieldset class="settings__group">
      <legend class="settings__group-title">
        <img src="/assets/icons/palette.png" alt="" class="settings__group-icon">
        Game themes
      </legend>
      <ul class="settings__options">
        <li><label class="settings__option"><input type="radio" name="theme" value="code-vibes"> Code vibes theme</label></li>
        <li><label class="settings__option"><input type="radio" name="theme" value="gaming"> Gaming theme</label></li>
        <li><label class="settings__option"><input type="radio" name="theme" value="da-projects"> DA Projects theme</label></li>
        <li><label class="settings__option"><input type="radio" name="theme" value="foods"> Foods theme</label></li>
      </ul>
    </fieldset>`;
}

function renderPlayerFieldset(): string {
  return `
    <fieldset class="settings__group">
      <legend class="settings__group-title">
        <img src="/assets/icons/chess_pawn.png" alt="" class="settings__group-icon">
        Choose player
      </legend>
      <ul class="settings__options">
        <li><label class="settings__option"><input type="radio" name="player" value="blue"> Blue</label></li>
        <li><label class="settings__option"><input type="radio" name="player" value="orange"> Orange</label></li>
      </ul>
    </fieldset>`;
}

function renderSizeFieldset(): string {
  return `
    <fieldset class="settings__group">
      <legend class="settings__group-title">
        <img src="/assets/icons/style.png" alt="" class="settings__group-icon">
        Board size
      </legend>
      <ul class="settings__options">
        <li><label class="settings__option"><input type="radio" name="size" value="16"> 16 cards</label></li>
        <li><label class="settings__option"><input type="radio" name="size" value="24"> 24 cards</label></li>
        <li><label class="settings__option"><input type="radio" name="size" value="36"> 36 cards</label></li>
      </ul>
    </fieldset>`;
}

function renderPreview(): string {
  return `
    <div class="settings__preview">
      <div class="settings__preview-img">
        <img src="/assets/previews/preview-code-vibes.png" alt="Theme preview" id="theme-preview-img">
      </div>
      <div class="settings__summary">
        <div class="settings__summary-info">
          <span id="summary-theme" class="settings__summary-placeholder">Theme</span>
          <span class="settings__summary-divider"></span>
          <span id="summary-player" class="settings__summary-placeholder">Player</span>
          <span class="settings__summary-divider"></span>
          <span id="summary-size" class="settings__summary-placeholder">Board size</span>
        </div>
        <button class="settings__start-btn" id="btn-start-game" disabled data-tooltip="Please select theme, player &amp; board size to start">
          <img src="/assets/icons/smart_display.png" alt="" class="settings__start-icon">
          Start
        </button>
      </div>
    </div>`;
}

/** Renders the settings screen */
export function renderSettings(): string {
  return `
    <section class="settings">
      <div class="settings__layout">
        <div class="settings__left">
          <header class="settings__header">
            <h2 class="settings__title">Settings</h2>
          </header>
          <form class="settings__form" id="settings-form">
            ${renderThemeFieldset()}
            ${renderPlayerFieldset()}
            ${renderSizeFieldset()}
          </form>
        </div>
        ${renderPreview()}
      </div>
    </section>`;
}

/** Initializes settings interactions and calls onStart with selected settings */
export function initSettings(onStart: (settings: GameSettings) => void): void {
  const form = document.getElementById("settings-form") as HTMLFormElement;
  const previewImg = document.getElementById("theme-preview-img") as HTMLImageElement;
  const summaryTheme = document.getElementById("summary-theme") as HTMLSpanElement;
  const summaryPlayer = document.getElementById("summary-player") as HTMLSpanElement;
  const summarySize = document.getElementById("summary-size") as HTMLSpanElement;
  const btnStart = document.getElementById("btn-start-game") as HTMLButtonElement;

  // Hover preview — zeigt Theme-Vorschau beim Hovern
  const themeLabels = form.querySelectorAll<HTMLLabelElement>('label:has(input[name="theme"])');
  themeLabels.forEach(label => {
    const input = label.querySelector('input') as HTMLInputElement;

    label.addEventListener("mouseenter", () => {
      previewImg.src = THEME_PREVIEWS[input.value as Theme];
    });

    label.addEventListener("mouseleave", () => {
      const selected = (form.querySelector('input[name="theme"]:checked') as HTMLInputElement)?.value as Theme;
      previewImg.src = selected ? THEME_PREVIEWS[selected] : THEME_PREVIEWS["code-vibes"];
    });
  });

  form.addEventListener("change", () => {
    const data = new FormData(form);
    const theme = data.get("theme") as Theme;
    const player = data.get("player") as PlayerColor;
    const size = data.get("size") as string;

    if (theme) {
      previewImg.src = THEME_PREVIEWS[theme];
      summaryTheme.textContent = THEME_LABELS[theme];
      summaryTheme.classList.remove("settings__summary-placeholder");
    }
    if (player) {
      summaryPlayer.textContent = player === "blue" ? "Blue" : "Orange";
      summaryPlayer.classList.remove("settings__summary-placeholder");
    }
    if (size) {
      summarySize.textContent = `${size} cards`;
      summarySize.classList.remove("settings__summary-placeholder");
    }

    const allSelected = !!theme && !!player && !!size;
    btnStart.disabled = !allSelected;

    const summary = document.querySelector(".settings__summary");
    summary?.classList.toggle("settings__summary--active", allSelected);
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
