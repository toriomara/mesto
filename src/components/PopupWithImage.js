import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector('.image-container__caption').textContent =
      name;
    const image = this._popupElement.querySelector('.image-container__image');
    image.src = link;
    image.alt = `Изображение ${name}`;

    super.open();
  }
}
