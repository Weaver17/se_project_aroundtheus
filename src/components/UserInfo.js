import { profileNameInput, profileDescriptionInput } from "./constants";

export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    profileNameInput.value = this._name;
    profileDescriptionInput.value = this._job;
  }

  setUserInfo() {
    this._name.textContent = profileNameInput.value;
    this._job.textContent = profileDescriptionInput.value;
  }
}
