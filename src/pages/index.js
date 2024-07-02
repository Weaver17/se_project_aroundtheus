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
  confirmModalForm,
} from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupwithImage";
import PopupwithForm from "../components/PopupwithForm";
import PopupWithConfirm from "../components/PopupWithConfirm";
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
  .then(() => {
    const cardSection = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const initialCard = createCard(cardData);
          cardSection.addItem(initialCard);
        },
      },
      ".gallery__cards"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

api
  .getUserInfo()
  .then((data) => {
    console.log(data);
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

function handleCardAddSubmit(data) {
  cardAddFormClass.viewLoading(true);
  api
    .addCard(data)
    .then((data) => {
      cardSection.addItem(createCard({ name: data.name, link: data.link }));
      addFormValidator.disableBtn();
      cardAddFormClass.reset();
      cardAddFormClass.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardAddFormClass.viewLoading(false);
    });
}

function handleProfileFormSubmit(inputData) {
  profileFormClass.viewLoading(true);
  api
    .setUserInfo(inputData.name, inputData.about)
    .then((data) => {
      profileInfoClass.setUserInfo(data.name, data.about);
      editFormValidator.disableBtn();
      profileFormClass.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileInfoClass.viewLoading(false);
    });
}

function handlePictureSubmit(image) {
  api.changeAvatar(image).then((avatar) => {
    profileInfoClass.setAvatar(avatar.src);
  });
}

function handleLikeBtn(card) {
  const cardId = card.getCardId();
  const isLiked = card.getLikedStatus();
  console.log(cardId);

  // if (isLiked) {
  //   api
  //     .removeLike(cardId)
  //     .then((isLikedCard) => {
  //       card.handleIsLiked(isLikedCard.getLikedStatus);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // } else {
  //   api
  //     .addLike(cardId)
  //     .then((isLikedCard) => {
  //       card.handleIsLiked(isLikedCard.getLikedStatus);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
}

function handleDeleteBtn(card) {
  confirmFormClass.open();

  confirmFormClass.handleConfirm(() => {
    api.removeCard(card._id);
  });
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
