// IMPORTS //
import "./index.css";

import {
  selectors,
  validationSettings,
  profileEditBtn,
  cardAddBtn,
  profileInfo,
  profileEditForm,
  cardAddForm,
  profilePictureForm,
  profileNameInput,
  profileDescriptionInput,
  pictureEditBtn,
  pictureLinkInput,
  pictureEl,
  formValidators,
} from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupwithImage";
import PopupwithForm from "../components/PopupwithForm";
import PopupWithConfirm from "../components/PopupWithConfirm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

let cardSection;

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
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const initialCard = createCard(cardData);
          cardSection.addItem(initialCard);
        },
      },
      ".gallery__cards"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error(`Error setting up card section, ${err}`));

api
  .getUserInfo()
  .then((data) => {
    profileInfoClass.setUserInfo(data);
  })
  .catch((err) => console.error(`Error loading profile info. ${err}`));

const createCard = (cardData) => {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      isLiked: cardData.isLiked,
      _id: cardData._id,
    },
    "#card-template",
    handleImageClick,
    handleDeleteBtn,
    handleLikeBtn
  );
  return card.getView();
};

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

const confirmFormClass = new PopupWithConfirm("#confirm-modal");

const cardPreviewClass = new PopupWithImage("#image-modal");

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// INTITIALIZE //
cardPreviewClass.setEventListeners();
profileFormClass.setEventListeners();
cardAddFormClass.setEventListeners();
pictureFormClass.setEventListeners();
confirmFormClass.setEventListeners();

enableValidation(validationSettings);

// FUNCTIONS //
function handleImageClick(card) {
  cardPreviewClass.open({ name: card._name, link: card._link });
}

function handleCardAddSubmit(inputData) {
  cardAddFormClass.renderLoading(true);
  api
    .addCard(inputData)
    .then((data) => {
      const { _id, name, link, isLiked } = data;
      const newCardData = { _id, name, link, isLiked };
      cardSection.addItem(createCard(newCardData));
      formValidators[cardAddForm.getAttribute("name")].disableBtn();
      cardAddForm.reset();
      cardAddFormClass.close();
    })
    .catch((err) => {
      console.error(`Error: failed to add card. ${err}`);
    })
    .finally(() => {
      cardAddFormClass.renderLoading(false);
    });
}

function handleProfileFormSubmit(data) {
  profileFormClass.renderLoading(true);
  api
    .setUserInfo(data)
    .then(() => {
      profileInfoClass.setUserInfo({ name: data.name, about: data.about });
      formValidators[profileEditForm.getAttribute("name")].disableBtn();
      profileFormClass.close();
    })
    .catch((err) => {
      console.error(`Error handling profile form submit. ${err}`);
    })
    .finally(() => {
      profileFormClass.renderLoading(false);
    });
}

function handlePictureSubmit(avatarUrl) {
  pictureFormClass.renderLoading(true);
  api
    .changeAvatar(avatarUrl)
    .then(() => {
      profileInfoClass.setUserInfo({ avatar: avatarUrl.picture });
      formValidators[profilePictureForm.getAttribute("name")].disableBtn();
      pictureFormClass.close();
    })
    .catch(console.error)
    .finally(() => {
      pictureFormClass.renderLoading(false);
    });
}

function handleLikeBtn(card) {
  api
    .setCardLiked(card.id, card.getLikedStatus())
    .then((updatedCard) => {
      card.handleIsLiked(updatedCard.isLiked);
    })
    .catch(console.error);
}

function handleDeleteBtn(card) {
  confirmFormClass.open();
  confirmFormClass.handleConfirm(() => {
    confirmFormClass.viewLoading(true);
    api
      .removeCard(card.id)
      .then(() => {
        card.removeCard();
        confirmFormClass.close();
      })
      .catch((err) => {
        console.error(`Failed to delete card. ${err}`);
      })
      .finally(confirmFormClass.viewLoading(false));
  });
}

// LISTENERS //
pictureEditBtn.addEventListener("click", () => {
  formValidators[profilePictureForm.getAttribute("name")].resetValidation();
  pictureLinkInput.value = profileInfoClass.getUserInfo().avatar;
  pictureFormClass.open();
});

profileEditBtn.addEventListener("click", () => {
  formValidators[profileEditForm.getAttribute("name")].resetValidation();
  const { name, about } = profileInfoClass.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = about;
  profileFormClass.open();
});

cardAddBtn.addEventListener("click", () => {
  cardAddFormClass.open();
});
