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
  cardLikeBtn,
  cardDeleteBtn,
  confirmModalBtn,
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
    profileInfoClass.setUserInfo(data.name, data.about);
    profileInfoClass.setAvatar(data.avatar);
  })
  .catch((err) => console.error(err));

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

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
const pictureFormValidator = new FormValidator(
  validationSettings,
  pictureFormEl
);

// INTITIALIZE //
cardPreviewClass.setEventListeners();
profileFormClass.setEventListeners();
cardAddFormClass.setEventListeners();
pictureFormClass.setEventListeners();
confirmFormClass.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
pictureFormValidator.enableValidation();

// FUNCTIONS //
function handleImageClick(card) {
  cardPreviewClass.open({ name: card._name, link: card._link });
}

function handleCardAddSubmit(inputData) {
  cardAddFormClass.isLoading(true);
  api
    .addCard(inputData)
    .then((data) => {
      const { _id, name, link, isLiked } = data;
      const newCardData = { _id, name, link, isLiked };
      cardSection.addItem(createCard(newCardData));
      addFormValidator.disableBtn();
      cardAddForm.reset();
      cardAddFormClass.close();
    })
    .catch((err) => {
      console.error(`Error: failed to add card. ${err}`);
    })
    .finally(() => {
      cardAddFormClass.isLoading(false);
    });
}

function handleProfileFormSubmit(data) {
  profileFormClass.isLoading(true);
  api
    .setUserInfo(data.name, data.about)
    .then(() => {
      profileInfoClass.setUserInfo(data.name, data.about);
      editFormValidator.disableBtn();
      profileFormClass.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileFormClass.isLoading(false);
    });
}

function handlePictureSubmit({ picture }) {
  console.log({ picture });
  pictureFormClass.isLoading(true);
  api
    .changeAvatar({ picture })
    .then(() => {
      profileInfoClass.setAvatar({ picture });
      pictureFormValidator.disableBtn();
      pictureFormClass.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      pictureFormClass.isLoading(false);
    });
}

function handleLikeBtn(card) {
  api
    .setCardLiked(card.id, card.getLikedStatus())
    .then((updatedCard) => {
      card.handleIsLiked(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteBtn(card) {
  confirmFormClass.open();
  confirmFormClass.handleConfirm(() => {
    confirmFormClass.viewLoading(true);
    api
      .removeCard(card.id)
      .then(() => {
        card.removeCard();
        confirmFormClass.viewLoading(false);
        confirmFormClass.close();
      })
      .catch((err) => {
        console.error(`Failed to delete card. ${err}`);
        confirmFormClass.viewLoading(false);
      });
  });
}

// LISTENERS //
pictureEditBtn.addEventListener("click", () => {
  pictureLinkInput.value = pictureEl.src;
  pictureFormClass.open();
});

profileEditBtn.addEventListener("click", () => {
  const { name, about } = profileInfoClass.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = about;
  profileFormClass.open();
});

cardAddBtn.addEventListener("click", () => {
  cardAddFormClass.open();
});
