export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__name');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }

  _handleButtonDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleButtonLike() {
    this._element
      .querySelector('.card__button')
      .classList.toggle('card__button_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__button_trash')
      .addEventListener('click', () => {
        this._handleButtonDelete();
      });

    this._element
      .querySelector('.card__button')
      .addEventListener('click', () => {
        this._handleButtonLike();
      });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }
}
