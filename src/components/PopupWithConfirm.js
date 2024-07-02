import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._confirmBtn = this._popupElement.querySelector(".modal__confirm");
  }

  handleConfirm(handleDeleteConfirm) {
    this._handleDeleteConfirm = handleDeleteConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteConfirm;
    });
  }
}
