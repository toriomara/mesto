import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import {
  initialCards,
  config,
  popupProfileElement,
  popupProfileEditButton,
  popupImageElement,
  popupCardElement,
  popupCardOpenButtonElement,
  cardsContainer,
  nameInput,
  jobInput,
} from './constants.js';

// Validation
const formValidationProfile = new FormValidator(config, popupProfileElement);
formValidationProfile.enableValidation();
const formValidationCard = new FormValidator(config, popupCardElement);
formValidationCard.enableValidation();

const editProfileForm = new PopupWithForm({
  popupSelector: popupProfileElement,
  handleSubmitForm: (data) =>
    userInfo.setUserInfo({
      name: data.name,
      job: data.job,
    }),
});
editProfileForm.setEventListeners();

const addCardForm = new PopupWithForm({
  popupSelector: popupCardElement,
  handleSubmitForm: (values) => {
    const newData = { title: values['card-name'], link: values['card-link'] };
    cards.addItem(createCard(newData));
  },
});
addCardForm.setEventListeners();

const imagePopup = new PopupWithImage(popupImageElement);
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job',
});

const createCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: (title, link) => imagePopup.open({ title, link }),
    },
    '#card-template'
  );
  return card.generateCard();
};

const cards = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => cards.addItem(createCard(item)),
  },
  cardsContainer
);

cards.renderer();

popupProfileEditButton.addEventListener('click', () => {
  formValidationProfile.resetErrors();
  const { name, job } = userInfo.getUserInfo();
  editProfileForm.open();
  nameInput.value = name;
  jobInput.value = job;
});

popupCardOpenButtonElement.addEventListener('click', () => {
  formValidationCard.disableBtn();
  formValidationCard.resetErrors();
  addCardForm.open();
});
