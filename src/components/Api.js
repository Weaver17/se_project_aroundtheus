export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
    this._contentType = headers.contentType;
  }

  // GENERAL PROMISES //
  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // CARDS //
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._handleServerResponse)
      .catch((err) => console.error(`Api error getting cards, ${err}`));
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleServerResponse)
      .catch((err) => console.error(err));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch((err) => console.error(err));
  }

  setCardLiked(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch((err) => console.error(err));
  }

  // USER INFO //
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch((err) => console.error(err));
  }

  setUserInfo({ name, about, avatar, _id }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
        avatar,
        _id,
      }),
    })
      .then(this._handleServerResponse)
      .catch((err) => console.error(`Error setting api user info. ${err}`));
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl.picture,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => console.error(err));
  }
}
