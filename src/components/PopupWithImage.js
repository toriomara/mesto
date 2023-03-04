import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(
      '.image-container__image'
    );
    this._popupCaption = this._popupElement.querySelector(
      '.image-container__caption'
    );
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;

    super.open();
  }
}
