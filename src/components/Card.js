import PopupwithForm from "./PopupwithForm";

export default class Card {
  constructor(
    { name, link, isLiked, _id },
    cardSelector,
    handleImageClick,
    handleDeleteBtn,
    handleLikeBtn
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this.id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteBtn = handleDeleteBtn;
    this._handleLikeBtn = handleLikeBtn;

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeBtn(this);
    });

    this._cardDeleteBtn.addEventListener("click", () => {
      this._handleDeleteBtn(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  removeCard() {
    this._cardElement.remove();
  }

  getCardId() {
    return this.id;
  }

  getLikedStatus() {
    return this._isLiked;
  }

  handleIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderisLiked();
  }

  _renderisLiked() {
    if (this._isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
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
    this._renderisLiked();

    console.log(this._cardLikeButton);
    console.log(this._cardDeleteBtn);

    return this._cardElement;
  }
}
