import { profileNameInput, profileDescriptionInput } from "../utils/constants";

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._job = description;
  }

  getUserInfo() {
    return (
      (profileNameInput.value = this._name.textContent),
      (profileDescriptionInput.value = this._job.textContent)
    );
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._job.textContent = description;
  }
}
