import type { Theme, BoardSize, PlayerColor, GameSettings, Player } from "../types/types";

/** Preview image paths per theme */
const THEME_PREVIEWS: Record<Theme, string> = {
  "code-vibes": "/assets/previews/preview-code-vibes.png",
  "gaming": "/assets/previews/preview-gaming.png",
  "da-projects": "/assets/previews/preview-da-projects.png",
  "foods": "/assets/previews/preview-foods.png",
};

/** Display labels per theme */
const THEME_LABELS: Record<Theme, string> = {
  "code-vibes": "Code vibes theme",
  "gaming": "Gaming theme",
  "da-projects": "DA Projects theme",
  "foods": "Foods theme",
};

/**
 * Renders the theme selection fieldset with all 4 theme radio options.
 * @returns HTML string for the theme fieldset
 */
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

/**
 * Renders the player color selection fieldset (Blue / Orange).
 * @returns HTML string for the player fieldset
 */
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

/**
 * Renders the board size selection fieldset (16 / 24 / 36 cards).
 * @returns HTML string for the size fieldset
 */
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

/**
 * Renders the preview panel with the theme image and selection summary bar.
 * @returns HTML string for the preview section
 */
function renderPreview(): string {
  return `
    <div class="settings__preview">
      <figure class="settings__preview-img">
        <img src="/assets/previews/preview-code-vibes.png" alt="Theme preview" id="theme-preview-img">
        <figcaption class="sr-only">Theme preview image</figcaption>
      </figure>
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

/**
 * Renders the complete settings screen with form and preview panel.
 * @returns HTML string for the settings section
 */
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

// ── Init helpers ──────────────────────────────────────────

/**
 * Attaches mouseenter/mouseleave listeners to theme labels to preview the theme image on hover.
 * @param form - The settings form element
 * @param previewImg - The theme preview image element
 */
function initHoverPreview(form: HTMLFormElement, previewImg: HTMLImageElement): void {
  const labels = form.querySelectorAll<HTMLLabelElement>('label:has(input[name="theme"])');
  labels.forEach(label => {
    const input = label.querySelector("input") as HTMLInputElement;
    label.addEventListener("mouseenter", () => {
      previewImg.src = THEME_PREVIEWS[input.value as Theme];
    });
    label.addEventListener("mouseleave", () => {
      const checked = (form.querySelector('input[name="theme"]:checked') as HTMLInputElement)?.value as Theme;
      previewImg.src = checked ? THEME_PREVIEWS[checked] : THEME_PREVIEWS["code-vibes"];
    });
  });
}

/**
 * Updates the summary bar spans with the currently selected theme, player and board size.
 * Removes the placeholder style once a value is selected.
 * @param theme - Selected theme (or null if not yet chosen)
 * @param player - Selected player color (or null if not yet chosen)
 * @param size - Selected board size as string (or null if not yet chosen)
 */
function updateSummary(theme: Theme, player: PlayerColor, size: string): void {
  const summaryTheme = document.getElementById("summary-theme") as HTMLSpanElement;
  const summaryPlayer = document.getElementById("summary-player") as HTMLSpanElement;
  const summarySize = document.getElementById("summary-size") as HTMLSpanElement;
  if (theme) { summaryTheme.textContent = THEME_LABELS[theme]; summaryTheme.classList.remove("settings__summary-placeholder"); }
  if (player) { summaryPlayer.textContent = player === "blue" ? "Blue" : "Orange"; summaryPlayer.classList.remove("settings__summary-placeholder"); }
  if (size) { summarySize.textContent = `${size} cards`; summarySize.classList.remove("settings__summary-placeholder"); }
}

/**
 * Attaches a change listener to the form to update the preview image, summary bar and start button state.
 * @param form - The settings form element
 * @param previewImg - The theme preview image element
 * @param btnStart - The start game button element
 */
function initFormChange(form: HTMLFormElement, previewImg: HTMLImageElement, btnStart: HTMLButtonElement): void {
  form.addEventListener("change", () => {
    const data = new FormData(form);
    const theme = data.get("theme") as Theme;
    const player = data.get("player") as PlayerColor;
    const size = data.get("size") as string;
    if (theme) previewImg.src = THEME_PREVIEWS[theme];
    updateSummary(theme, player, size);
    const allSelected = !!theme && !!player && !!size;
    btnStart.disabled = !allSelected;
    document.querySelector(".settings__summary")?.classList.toggle("settings__summary--active", allSelected);
  });
}

/**
 * Builds a Player object for player one or player two based on the chosen color.
 * @param color - The color chosen by player one
 * @param isPlayerOne - True for player one, false for player two
 * @returns A Player object with name, color and score 0
 */
function buildPlayer(color: PlayerColor, isPlayerOne: boolean): Player {
  const otherColor: PlayerColor = color === "blue" ? "orange" : "blue";
  return isPlayerOne
    ? { name: color === "blue" ? "Blue Player" : "Orange Player", color, score: 0 }
    : { name: color === "blue" ? "Orange Player" : "Blue Player", color: otherColor, score: 0 };
}

/**
 * Attaches a click listener to the start button that builds GameSettings and triggers the game start.
 * @param form - The settings form element
 * @param btnStart - The start game button element
 * @param onStart - Callback to invoke with the assembled GameSettings
 */
function initStartButton(form: HTMLFormElement, btnStart: HTMLButtonElement, onStart: (s: GameSettings) => void): void {
  btnStart.addEventListener("click", () => {
    const data = new FormData(form);
    const playerColor = data.get("player") as PlayerColor;
    const settings: GameSettings = {
      playerOne: buildPlayer(playerColor, true),
      playerTwo: buildPlayer(playerColor, false),
      boardSize: Number(data.get("size")) as BoardSize,
      theme: data.get("theme") as Theme,
    };
    onStart(settings);
  });
}

/**
 * Initializes all settings interactions and wires up the start callback.
 * @param onStart - Callback invoked with GameSettings when the user clicks Start
 */
export function initSettings(onStart: (settings: GameSettings) => void): void {
  const form = document.getElementById("settings-form") as HTMLFormElement;
  const previewImg = document.getElementById("theme-preview-img") as HTMLImageElement;
  const btnStart = document.getElementById("btn-start-game") as HTMLButtonElement;
  initHoverPreview(form, previewImg);
  initFormChange(form, previewImg, btnStart);
  initStartButton(form, btnStart, onStart);
}
