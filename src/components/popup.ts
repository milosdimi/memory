/**
 * Renders the exit confirmation popup HTML.
 * @returns HTML string for the popup overlay with Back and Exit buttons
 */
export function renderPopup(): string {
  return `
    <div class="popup-overlay" id="exit-popup">
      <div class="popup">
        <p class="popup__text">Are you sure you want to quit the game?</p>
        <div class="popup__btns">
          <button class="popup__btn popup__btn--secondary" id="btn-back-to-game">Back to game</button>
          <button class="popup__btn popup__btn--primary" id="btn-confirm-exit">Exit game</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Injects the exit popup into the DOM and wires up all button interactions.
 * Clicking "Back to game", the overlay background, or confirming exit all close the popup.
 * A `data-theme` attribute is set on the overlay so CSS can apply theme-specific styles.
 * @param onExit - Callback invoked when the player confirms exit
 * @param theme - Active game theme (applied as data-theme on the overlay)
 */
export function showExitPopup(onExit: () => void, theme?: string): void {
  document.body.insertAdjacentHTML("beforeend", renderPopup());

  const overlay = document.getElementById("exit-popup") as HTMLElement;
  if (theme) overlay.dataset.theme = theme;
  const btnBack = document.getElementById("btn-back-to-game") as HTMLButtonElement;
  const btnExit = document.getElementById("btn-confirm-exit") as HTMLButtonElement;

  const close = () => overlay.remove();

  btnBack.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  btnExit.addEventListener("click", () => {
    close();
    onExit();
  });
}
