export class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponse);
  }

  removeCard(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponse);
  }

  addLikeCard(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponse);
  }

  removeLikeCard(card) {
    this._cardId = card.cardId;
    return fetch(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponse);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar }),
    }).then(this._getResponse);
  }
}
