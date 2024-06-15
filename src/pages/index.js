// IMPORTS //
import "./index.css";

import {
  cardData,
  selectors,
  editFormEl,
  addFormEl,
  validationSettings,
  profileEditBtn,
  cardAddBtn,
  profileInfo,
  cardAddForm,
  profileNameInput,
  profileDescriptionInput,
} from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupwithImage";
import PopupwithForm from "../components/PopupwithForm";
import UserInfo from "../components/UserInfo";

// CLASSES //

const profileInfoClass = new UserInfo(profileInfo);

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

// INTITIALIZE //
cardSectionClass.renderItems(cardData);
cardPreviewClass.setEventListeners();
profileFormClass.setEventListeners();
cardAddFormClass.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

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
profileEditBtn.addEventListener("click", () => {
  profileDescriptionInput.value = profileInfoClass.getUserInfo().description;
  profileNameInput.value = profileInfoClass.getUserInfo().name;
  profileFormClass.open();
});

cardAddBtn.addEventListener("click", () => {
  cardAddFormClass.open();
});
