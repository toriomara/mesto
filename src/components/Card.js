export class Card {
  constructor(
    data,
    cardSelector,
    { userId, handleCardClick, handleDeleteClick, handleLikeClick }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._title = this._element.querySelector('.card__name');
    this._likeButton = this._element.querySelector('.card__button');
    this._deleteButton = this._element.querySelector('.card__button_trash');
    this._likesCounter = this._element.querySelector('.card__likes-counter');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  likeToggler() {
    this._likeButton.classList.toggle('card__button_active');
  }

  _likeCard() {
    this._handleLikeClick();
  }

  isLiked() {
    return this._likeButton.classList.contains('card__button_active')
      ? true
      : false;
  }

  updateLikes(res) {
    this._likesCounter.textContent = res.likes.length;
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this.cardId);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  getView() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }

    if (this._likes.some((like) => like._id === this._userId)) {
      this._likeButton.classList.add('card__button_active');
    }

    this._setEventListeners();
    return this._element;
  }
}
