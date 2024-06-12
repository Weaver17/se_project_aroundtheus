import Popup from "./Popup";

export default class PopupwithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__save");
  }

  _getInputValues() {
    const inputsArr = Array.from(
      this._popupElement.querySelectorAll(".modal__input").value
    );
    const inputValues = {};

    inputsArr.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    console.log(inputsArr);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
