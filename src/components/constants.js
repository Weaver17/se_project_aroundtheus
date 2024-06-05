export const cardData = [
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

export const selectors = {
  cardSection: ".gallery__cards",
  infoSection: ".profile",
};

export const profileInfo = {
  name: document.querySelector(".profile__name").textContent,
  description: document.querySelector(".profile__description").textContent,
};

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditModal = document.querySelector("#profile-edit-modal");
const cardAddModal = document.querySelector("#add-card-modal");

export const editFormEl = profileEditModal.querySelector(".modal__form");
export const addFormEl = cardAddModal.querySelector(".modal__form");

export const profileEditBtn = document.querySelector("#profile-edit-button");
export const cardAddBtn = document.querySelector("#add-card-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileNameInput = document.querySelector("#modal-name");
export const profileDescriptionInput =
  document.querySelector("#modal-description");
export const cardTitleInput = document.querySelector("#modal-title");
export const cardLinkInput = document.querySelector("#modal-link");
export const previewImage = document.querySelector("#modal-image");
export const previewImageTitle = document.querySelector("#modal-image-title");
