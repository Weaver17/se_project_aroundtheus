import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Popup from "../components/Popup";
import PopupwithForm from "../components/PopupwithForm";
import PopupwithImage from "../components/PopupwithImage";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import "./index.css";

const cardData = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditBtn = document.querySelector("#profile-edit-button");

export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileNameInput = document.querySelector("#modal-name");
export const profileDescriptionInput =
  document.querySelector("#modal-description");
const profileEditForm = document.forms["profile-form"];

const cardListEl = document.querySelector(".gallery__cards");
const cardAddModal = document.querySelector("#add-card-modal");
const cardAddBtn = document.querySelector("#add-card-button");

export const cardTitleInput = document.querySelector("#modal-title");
export const cardLinkInput = document.querySelector("#modal-link");
const cardAddForm = document.forms["card-form"];
const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__image-title"
);
export const modalCloseButtons = document.querySelectorAll(".modal__exit");
export const modalBackgrounds = Array.from(
  document.querySelectorAll(".modal__background")
);
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = cardAddModal.querySelector(".modal__form");
const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleImageClick() {
  previewImage.src = this._link;
  previewImage.alt = this._name;
  previewImageTitle.textContent = this._name;
  openPopup(previewImageModal);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function closePopupWithEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function renderCards(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  wrapper.prepend(card.getView());
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCards({ name, link }, cardListEl);
  closePopup(cardAddModal);
  e.target.reset();
}

profileEditBtn.addEventListener("click", () => {
  profileEditPopup.open();
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

cardData.forEach((cardData) => renderCards(cardData, cardListEl));

cardAddBtn.addEventListener("click", () => {
  addCardPopup.open();
});

modalCloseButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener(
    "click",
    () => addCardPopup.close() || profileEditPopup.close()
  );
});

modalBackgrounds.forEach((modalBackground) => {
  const modal = modalBackground.closest(".modal");

  modalBackground.addEventListener("click", () => addCardPopup.close());
});
