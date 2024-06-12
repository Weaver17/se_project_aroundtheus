import { profileNameInput, profileDescriptionInput } from "../utils/constants";

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._job = description;
  }

  getUserInfo() {
    profileNameInput.value = this._name;
    profileDescriptionInput.value = this._job;
  }

  setUserInfo({ name, description }) {
    this._name = name;
    this._job = description;
  }
}
