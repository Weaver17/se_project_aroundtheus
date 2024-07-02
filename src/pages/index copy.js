// IMPORTS //
import "./index.css";

import {
  cardData,
  selectors,
  editFormEl,
  addFormEl,
  pictureFormEl,
  validationSettings,
  profileEditBtn,
  cardAddBtn,
  profileInfo,
  cardAddForm,
  profileNameInput,
  profileDescriptionInput,
  pictureEditBtn,
  pictureLinkInput,
  pictureEl,
  confirmModalForm,
} from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupwithImage";
import PopupwithForm from "../components/PopupwithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

// API //
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "40adfe4e-c0e4-40a1-9506-b555db893f72",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cardSectionClass.renderItems(cards);
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

// CLASSES //

const profileInfoClass = new UserInfo(profileInfo);

const pictureFormClass = new PopupwithForm(
  "#profile-picture-modal",
  handlePictureSubmit
);

const profileFormClass = new PopupwithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const cardAddFormClass = new PopupwithForm(
  "#add-card-modal",
  handleCardAddSubmit
);
const cardPreviewClass = new PopupWithImage("#image-modal");
const cardSectionClass = new Section(
  {
    items: cardData,
    renderer: renderCard,
  },
  selectors.cardSection
);
const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const pictureFormValidator = new FormValidator(
  validationSettings,
  pictureFormEl
);

// INTITIALIZE //
cardSectionClass.renderItems(cardData);
cardPreviewClass.setEventListeners();
profileFormClass.setEventListeners();
cardAddFormClass.setEventListeners();
pictureFormClass.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
pictureFormValidator.enableValidation();

// FUNCTIONS //
function handleImageClick(card) {
  cardPreviewClass.open({ name: card._name, link: card._link });
}

function handleCardAddSubmit(data) {
  renderCard({ name: data.title, link: data.link });
  cardAddFormClass.close();
  cardAddForm.reset();
}

function handleProfileFormSubmit(data) {
  profileInfoClass.setUserInfo(data);
  profileFormClass.close();
}

function handlePictureSubmit() {
  pictureEl.src = pictureLinkInput.value;
  pictureFormClass.close();
}

function renderCard(card) {
  const cardElementClass = new Card({
    name: card.name,
    link: card.link,
    cardSelector: "#card-template",
    handleImageClick: handleImageClick,
  });
  cardSectionClass.addItem(cardElementClass.getView());
}

// LISTENERS //
pictureEditBtn.addEventListener("click", () => {
  pictureLinkInput.value = pictureEl.src;
  pictureFormClass.open();
});

profileEditBtn.addEventListener("click", () => {
  const { name, description } = profileInfoClass.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  profileFormClass.open();
});

cardAddBtn.addEventListener("click", () => {
  cardAddFormClass.open();
});
