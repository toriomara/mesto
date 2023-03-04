import './index.css';
import { Api } from '../components/Api';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  defaultFormConfig,
  popupConfig,
  cardConfig,
  userInfoConfig,
  mestoApiConfig,
} from '../utils/constants';

const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__button');
const openAvatarFormButton = document.querySelector(
  '.profile__avatar-container'
);

const api = new Api(mestoApiConfig);
const userInfo = new UserInfo(userInfoConfig);

// VALIDATION

const editFormValidator = new FormValidator(
  defaultFormConfig,
  popupConfig.editFormModalWindow
);
editFormValidator.enableValidation();
const cardFormValidator = new FormValidator(
  defaultFormConfig,
  popupConfig.cardFormModalWindow
);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(
  defaultFormConfig,
  popupConfig.changeAvatarModalWindow
);
avatarFormValidator.enableValidation();

// CARD

const createCard = (data) => {
  const card = new Card(data, cardConfig.cardTemplate, {
    userId: userInfo.getUserId(),
    handleCardClick: () => {
      imagePopup.open({ name: data.name, link: data.link });
    },
    handleDeleteClick: () => {
      cardInfoSubmit.open(card);
    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api
          .removeLikeCard(card)
          .then((res) => card.updateLikes(res))
          .catch((err) =>
            console.log(`Ошибка изменения статуса лайка: ${err}`)
          );
      } else {
        api
          .addLikeCard(card)
          .then((res) => {
            card.updateLikes(res);
            card.likeToggler();
          })
          .catch((err) => console.log(err));
      }
    },
  });
  return card.getView();
};

const cardInfoSubmit = new PopupWithSubmit(popupConfig.removeCardModalWindow, {
  handleFormSubmit: (card) => {
    cardInfoSubmit.changeButtonTextForLoading(true);
    api
      .removeCard(card)
      .then(() => {
        card.removeCard();
        cardInfoSubmit.close();
      })
      .catch((err) => console.log(`Ошибка при удалении: ${err}`))
      .finally(() => cardInfoSubmit.changeButtonTextForLoading(false));
  },
});
cardInfoSubmit.setEventListeners();

const cardsList = new Section(
  {
    renderer: (cardItem) => cardsList.addItem(createCard(cardItem)),
  },
  cardConfig.cardSelector
);

const imagePopup = new PopupWithImage(popupConfig.imageModalWindow);
imagePopup.setEventListeners();

const newCardPopup = new PopupWithForm(popupConfig.cardFormModalWindow, {
  handleFormSubmit: (inputListValues) => {
    newCardPopup.changeButtonTextForLoading(true);
    api
      .addCard({
        name: inputListValues['card-name'],
        link: inputListValues['card-link'],
      })
      .then((res) => {
        cardsList.addItem(createCard(res));
        newCardPopup.close();
      })
      .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
      .finally(() => newCardPopup.changeButtonTextForLoading(false));
  },
});
newCardPopup.setEventListeners();

const userInfoPopup = new PopupWithForm(popupConfig.editFormModalWindow, {
  handleFormSubmit: (inputListValues) => {
    userInfoPopup.changeButtonTextForLoading(true);
    api
      .setUserInfo({
        name: inputListValues['name'],
        about: inputListValues['job'],
      })
      .then((res) => {
        userInfo.setUserInfo(res);
        userInfoPopup.close();
      })
      .catch((err) =>
        console.log(`Ошибка при обновлении информации о пользователе: ${err}`)
      )
      .finally(() => userInfoPopup.changeButtonTextForLoading(false));
  },
});
userInfoPopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(
  popupConfig.changeAvatarModalWindow,
  {
    handleFormSubmit: (inputListValues) => {
      changeAvatarPopup.changeButtonTextForLoading(true);
      api
        .setUserAvatar(inputListValues['card-avatar'])
        .then((res) => {
          userInfo.setUserInfo(res);
          changeAvatarPopup.close();
        })
        .catch((err) =>
          console.log(
            `При изменении аватара пользователя произошла ошибка: ${err}`
          )
        )
        .finally(() => changeAvatarPopup.changeButtonTextForLoading(false));
    },
  }
);
changeAvatarPopup.setEventListeners();

// LISTENERS

openEditFormButton.addEventListener('click', () => {
  const dataInfo = userInfo.getUserInfo();
  userInfoPopup.setInputValues({ name: dataInfo.name, job: dataInfo.about });
  editFormValidator.resetErrors();
  userInfoPopup.open();
});

openCardFormButton.addEventListener('click', () => {
  cardFormValidator.resetErrors();
  newCardPopup.open();
});

openAvatarFormButton.addEventListener('click', () => {
  avatarFormValidator.resetErrors();
  changeAvatarPopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
