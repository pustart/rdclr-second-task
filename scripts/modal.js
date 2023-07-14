export default class Modal {
  constructor(modalId) {
    this._modalBackground = document.getElementById(`${modalId}`);
    this._closeModalButtons = this._modalBackground.querySelectorAll('.close-modal-button');
    this.#initializeEventListeners();
  }

  openModal() {
    if (this._modalBackground) {
      this._modalBackground.classList.add('active');
    }
  }

  closeModal() {
    this._modalBackground.classList.remove('active');
  }

  #initializeEventListeners() {
    this._closeModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.closeModal();
      });
    });

    this._modalBackground.addEventListener('click', (event) => {
      if (event.target === this._modalBackground) {
        this.closeModal();
      }
    });
  }
}
