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
  profileName,
  profileNameInput,
  profileDescription,
  profileDescriptionInput,
  cardTitleInput,
  cardLinkInput,
  previewImage,
  previewImageTitle,
} from "../components/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupwithImage";
import PopupwithForm from "../components/PopupwithForm";
import UserInfo from "../components/UserInfo";

// CLASSES //
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
    renderer: (card) => {
      const CardElement = new Card(card, "#card-template", handleImageClick);
      CardSection.addItems(CardElement.getView());
    },
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
  const NewCard = new Card(
    { name: data.cardTitle, link: data.cardLink },
    "#card-template",
    handleImageClick
  );
  CardSection.addItems(NewCard.getView());
}

function handleProfileFormSubmit(data) {
  data = ProfileInfo.setUserInfo();
  CardAddForm.close();
  CardAddForm.reset();
}

// LISTENERS //
profileEditBtn.addEventListener("click", () => {
  ProfileInfo.getUserInfo();
  ProfileForm.open();
});

cardAddBtn.addEventListener("click", () => {
  CardAddForm.open();
});
