/** Renders the home screen */
export function renderHome(): string {
  return `
    <section class="home">
      <div class="home__content">
        <p class="home__subtitle">It's play time.</p>
        <h1 class="home__title">Ready to play?</h1>
        <button class="home__btn" id="btn-start">
          <img src="/assets/icons/stadia_controller_bnt.png" alt="" class="home__btn-icon">
          Play
          <span class="home__btn-arrow">&#8594;</span>
        </button>
      </div>
      <div class="home__controller">
        <img src="/assets/icons/stadia_controller.png" alt="Controller Icon" class="home__controller-img">
      </div>
    </section>
  `;
}
