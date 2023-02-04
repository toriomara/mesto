import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
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
} from '../utils/constants';

// Validation
const formValidationProfile = new FormValidator(config, popupProfileElement);
formValidationProfile.enableValidation();
const formValidationCard = new FormValidator(config, popupCardElement);
formValidationCard.enableValidation();

const formEditProfile = new PopupWithForm({
  popupElement: popupProfileElement,
  handleSubmitForm: (data) =>
    userInfo.setUserInfo({
      name: data.name,
      job: data.job,
    }),
});
formEditProfile.setEventListeners();

const formAddCard = new PopupWithForm({
  popupElement: popupCardElement,
  handleSubmitForm: (values) => {
    const newData = { title: values['card-name'], link: values['card-link'] };
    cards.addItem(createCard(newData));
  },
});
formAddCard.setEventListeners();

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

cards.renderItems();

popupProfileEditButton.addEventListener('click', () => {
  formValidationProfile.resetErrors();
  const { name, job } = userInfo.getUserInfo();
  formEditProfile.open();
  nameInput.value = name;
  jobInput.value = job;
});

popupCardOpenButtonElement.addEventListener('click', () => {
  formValidationCard.disableBtn();
  formValidationCard.resetErrors();
  formAddCard.open();
});
