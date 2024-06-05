import { profileNameInput, profileDescriptionInput } from "./constants";

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._job = description;
  }

  getUserInfo() {
    profileNameInput.value = this._name;
    profileDescriptionInput.value = this._job;
  }

  setUserInfo() {
    this._name = profileNameInput.value;
    this._job = profileDescriptionInput.value;
  }
}
