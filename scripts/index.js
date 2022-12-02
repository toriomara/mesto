import { initialCards } from './cards.js';

/--------------------- DOM's elements ---------------------/;

const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector(
  '.popup__close-button'
);

const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

let formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_profile_name');
const jobInput = formElement.querySelector('.form__input_profile_job');

// Card
const popupCardElement = document.querySelector('.popup_card');
const popupCardOpenButtonElement = document.querySelector('.profile__button');
const popupCardCloseButtonElement = popupCardElement.querySelector(
  '.card__close-button'
);

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');

const formCardElement = popupCardElement.querySelector(
  '[name="popup-form_card"]'
);
const formCardNameInput = popupCardElement.querySelector('[name="card-name"]');
const formCardLinkInput = popupCardElement.querySelector('[name="card-link"]');

const createCard = (item) => {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__name');
  const img = card.querySelector('.card__image');
  img.src = item.link;

  const cardButtonActive = card.querySelector('.card__button');
  const cardButtonDelete = card.querySelector('.card__button_trash');

  cardButtonActive.addEventListener('click', handleClickActiveButton);
  cardButtonDelete.addEventListener('click', handleClickDeleteButton);

  cardTitle.textContent = item.title;

  return card;
};

const handleClickActiveButton = (e) => {
  e.target.closest('.card__button').classList.toggle('card__button_active');
};

const handleClickDeleteButton = (e) => {
  e.target.closest('.card').remove();
};

const renderCard = (item, wrapElement) => {
  const element = createCard(item);
  wrapElement.append(element);
};

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});

/--------------------- FORM's elements ---------------------/;

const openPopup = () => {
  popupElement.classList.add('popup_opened');
  updateInputValue();
};

const closePopup = () => {
  popupElement.classList.remove('popup_opened');
};

const updateInputValue = () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

// Card

const openCardPopup = () => {
  popupCardElement.classList.add('popup_opened');
  updateInputValue();
};

const closeCardPopup = () => {
  popupCardElement.classList.remove('popup_opened');
};

// const closePopupOverlay = (e) => {
//   if (e.target === e.currentTarget) {
//     closePopup();
//   }
//   return;
// };

const formSubmitHandler = (e) => {
  e.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const card = {
    title: formCardNameInput.value,
    link: formCardLinkInput.value,
  };
  renderCard(card, cardsContainer);
  formCardNameInput.value = '';
  formCardLinkInput.value = '';
  closeCardPopup();
  // return wrapElement.prepend(card);
};

/--------------------- Register event listener by click ---------------------/;

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// popupElement.addEventListener('click', closePopupOverlay);
formElement.addEventListener('submit', formSubmitHandler);

// Card
popupCardOpenButtonElement.addEventListener('click', openCardPopup);
popupCardCloseButtonElement.addEventListener('click', closeCardPopup);
formCardElement.addEventListener('submit', handleFormSubmit);
