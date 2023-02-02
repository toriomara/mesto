// import { Popup } from './Popup.js';

// export class PopupWithImage extends Popup {
//   open({ title, link }) {
//     this.popupImage = this._popup.querySelector('.image-container__image');
//     this.popupCaption = this._popup.querySelector('.image-container__caption');
//     this.popupImage.src = link;
//     this.popupCaption.textContent = title;
//     this.popupImage.alt = title;

//     super.open();
//   }
// }

import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImage = this._popup.querySelector('.image-container__image');
    this.popupCaption = this._popup.querySelector('.image-container__caption');
  }

  open({ title, link }) {
    super.open();
    this.popupImage.src = link;
    this.popupCaption.textContent = title;
    this.popupImage.alt = title;
    console.log('Class Works');
  }
}
