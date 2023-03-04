import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.form');
    this._button = this._popupForm.querySelector('.form__save-button');
    this._buttonDefaultText = this._button.textContent;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._popupForm.addEventListener('click', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._card);
    });
    super.setEventListeners();
  }

  changeButtonTextForLoading(isSending) {
    if (isSending) {
      this._button.textContent = 'Удаление...';
    } else {
      this._button.textContent = this._buttonDefaultText;
    }
  }
}
