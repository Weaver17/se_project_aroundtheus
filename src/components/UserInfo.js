export default class UserInfo {
  constructor({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this.id = _id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._name.textContent = name;
    if (about) this._about.textContent = about;
    if (avatar) this._avatar.src = avatar;
  }
}
