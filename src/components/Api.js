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

  _request(url, options) {
    return fetch(url, options).then(this._handleServerResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // CARDS //
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers });
  }

  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  removeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setCardLiked(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  // USER INFO //
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setUserInfo({ name, about, avatar, _id }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
        avatar,
        _id,
      }),
    });
  }

  changeAvatar(avatarUrl) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl.picture,
      }),
    });
  }
}
