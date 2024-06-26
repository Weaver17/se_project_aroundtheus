import PopupwithForm from "./PopupwithForm";

export default class Card {
  constructor({ name, link, cardSelector, handleImageClick }) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._confirmModalEl = new PopupwithForm(
      "#confirm-modal",
      this._handleConfirmBtn
    );
    this._confirmForm = document.querySelector("#confirm-modal-form");
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLikeBtn);

    this._cardDeleteBtn.addEventListener("click", this._handleDeleteBtn);

    this._confirmForm.addEventListener("submit", this._handleConfirmBtn);

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeBtn = () => {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteBtn = () => {
    this._confirmModalEl.open();
    this._confirmModalEl.setEventListeners();
  };

  _handleConfirmBtn() {
    this._cardElement.remove();
    this._cardElement = null;
    this._confirmModalEl.close();
  }

  getView() {
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
