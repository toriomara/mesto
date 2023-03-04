import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector('.form');
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    this._button = this._popupForm.querySelector('.form__save-button');
    this._buttonDefaultText = this._button.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputListValues = {};
    this._inputList.forEach((input) => {
      this._inputListValues[input.name] = input.value;
    });
    return this._inputListValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  changeButtonTextForLoading(isSending) {
    if (isSending) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._buttonDefaultText;
    }
  }
}
