export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = name;
    this._job = description;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._job.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._job.textContent = description;
  }

  setAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
