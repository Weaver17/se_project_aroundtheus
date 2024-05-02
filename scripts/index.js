const initialCards = [
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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#modal-name");
const profileDescriptionInput = document.querySelector("#modal-description");
const profileEditForm = document.forms["profile-form"];

const cardListEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddModal = document.querySelector("#add-card-modal");
const cardAddBtn = document.querySelector("#add-card-button");

const cardTitleInput = document.querySelector("#modal-title");
const cardLinkInput = document.querySelector("#modal-link");
const cardAddForm = document.forms["card-form"];
const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__image-title"
);
const modalCloseButtons = document.querySelectorAll(".modal__exit");
const modalBackgrounds = Array.from(
  document.querySelectorAll(".modal__background")
);
const modals = Array.from(document.querySelectorAll(".modal"));

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function renderCards(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

initialCards.forEach((cardData) => renderCards(cardData, cardListEl));

cardAddBtn.addEventListener("click", () => {
  openPopup(cardAddModal);
});

modalCloseButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closePopup(modal));
});

modalBackgrounds.forEach((modalBackground) => {
  const modal = modalBackground.closest(".modal");

  modalBackground.addEventListener("click", () => closePopup(modal));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      closePopup(modal);
    });
  }
});
