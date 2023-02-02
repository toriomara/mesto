import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
      console.log(this._values);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
