export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtn = this._popupElement.querySelector(".modal__exit");
    this._modalBackground =
      this._popupElement.querySelector(".modal__background");
  }

  open() {
    document.addEventListener("keydown", this._handleEscapeClose);
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  viewLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = "Save";
    }
  }

  _handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeBtn.addEventListener("click", () => {
      this.close();
    });

    this._modalBackground.addEventListener("click", () => {
      this.close();
    });
  }
}
