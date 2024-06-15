export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._job = description;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._job.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._job.textContent = description;
  }
}
