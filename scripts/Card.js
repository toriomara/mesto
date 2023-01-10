export class Card {

  static selectors = {
    template: '#card-template',
    card: '.card',
    title: '.card__name',
    img: '.card__image',
    trashButton: '.card__button_trash',
    likeButton: '.card__button',
  }

  constructor(title, link, img, handleImageOpen, templateSelector ) {
    this._title = title;
    this._link = link;
    this._img = img;
    this._handleImageOpen = handleImageOpen;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(Card.selectors.card)
      .cloneNode(true);

    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._img = this._element.querySelector(Card.selectors.img);
    this._element.querySelector(Card.selectors.title).textContent = this._title;
    this._img.src = this._link;
    this._img.alt = this._title;
    this._setEventListeners();

    return this._element;
  }

  _handleButtonDelete() {
    this._element.remove();
  }
  
  _handleButtonLike() {
    this._element.querySelector(Card.selectors.likeButton).classList.toggle('card__button_active');
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.trashButton).addEventListener('click', () => {
      this._handleButtonDelete();
    });

    this._element.querySelector(Card.selectors.likeButton).addEventListener('click', () => {
      this._handleButtonLike();
    });

    this._element.querySelector(Card.selectors.img).addEventListener('click', () => {
      this._handleImageOpen(this._title, this._link);
    });
  }
}