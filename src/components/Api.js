export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponse);
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  addCard({ name, link }) {
    return this._request(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  removeCard(card) {
    this._cardId = card.cardId;
    return this._request(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  addLikeCard(card) {
    this._cardId = card.cardId;
    return this._request(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  removeLikeCard(card) {
    this._cardId = card.cardId;
    return this._request(`${this._baseUrl}cards/likes/${this._cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}users/me`, {
  //     method: 'GET',
  //     headers: this._headers,
  //   }).then(this._getResponse);
  // }

  setUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  setUserAvatar(avatar) {
    return this._request(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
}
