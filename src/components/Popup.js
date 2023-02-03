export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('popup') ||
        e.target.classList.contains('popup__close-button')
      ) {
        this.close();
      }
    });
  }
}
