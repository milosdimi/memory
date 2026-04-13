/** Renders the exit confirmation popup */
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

/** Shows the popup and wires up the buttons */
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
