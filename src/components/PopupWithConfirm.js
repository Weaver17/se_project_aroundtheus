import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._confirmBtn = this._popupElement.querySelector(".modal__confirm");
    this._handleDeleteConfirm = null;
  }

  handleConfirm(handleDeleteConfirm) {
    this._handleDeleteConfirm = handleDeleteConfirm;
  }

  viewLoading(isLoading) {
    if (isLoading) {
      this._confirmBtn.textContent = "Deleting...";
    } else {
      this._confirmBtn.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._handleDeleteConfirm === "function") {
        this._handleDeleteConfirm();
      }
    });
  }
}
