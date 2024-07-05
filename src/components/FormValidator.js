export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputEls = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  disableBtn() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _enableBtn() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this.disableBtn(this._submitBtn, this._inactiveButtonClass);
      return;
    }
    this._enableBtn(this._submitBtn, this._inactiveButtonClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _setEventListeners() {
    this._submitBtn = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.disableBtn();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._inputEls.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
    this._formElement.reset();
  }
}
