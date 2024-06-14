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
} from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupwithImage";
import PopupwithForm from "../components/PopupwithForm";
import UserInfo from "../components/UserInfo";

// CLASSES //
// "Start class names with a capital letter, use PascalCase for names."
// review says to use camelCase for variables... but classes need upper case, right?
const ProfileInfo = new UserInfo(profileInfo);

const ProfileForm = new PopupwithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
const CardAddForm = new PopupwithForm("#add-card-modal", handleCardAddSubmit);
const CardPreview = new PopupWithImage("#image-modal");
const CardSection = new Section(
  {
    items: cardData,
    renderer: renderCard,
  },
  selectors.cardSection
);
const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);

// INTITIALIZE //
CardSection.renderItems(cardData);
CardPreview.setEventListeners();
ProfileForm.setEventListeners();
CardAddForm.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// FUNCTIONS //
function handleImageClick(card) {
  CardPreview.open({ name: card._name, link: card._link });
}

function handleCardAddSubmit(data) {
  renderCard({ name: data.title, link: data.link });
  CardAddForm.close();
  cardAddForm.reset();
}

function handleProfileFormSubmit(data) {
  ProfileInfo.setUserInfo(data);
  ProfileForm.close();
}

function renderCard(card) {
  const CardElement = new Card({
    name: card.name,
    link: card.link,
    cardSelector: "#card-template",
    handleImageClick: handleImageClick,
  });
  CardSection.addItem(CardElement.getView());
}

// LISTENERS //
profileEditBtn.addEventListener("click", () => {
  // Reviewer stated "You should fill the form using the info", but it was my understanding
  // that it already does that with the getUserInfo method upon opening the popup.
  ProfileInfo.getUserInfo();
  ProfileForm.open();
});

cardAddBtn.addEventListener("click", () => {
  CardAddForm.open();
});
