/*
Павел!

Огромное спасибо за ревью!
Замечания очень понятные и позволили мне относительно быстро всё (я надеюсь) поправить. 
Благодаря им разобрался в написанном ещё чуть глубже!

Ещё раз огромное спасибо!

P.S. Я импортировал и enableBtn (хотя она и не используется). Скорее всего нужна будет далее
*/

import { initialCards } from './constants.js';
import { disableBtn, enableBtn } from './validate.js';
import { config } from './constants.js';

/--------------------- ELEMENTS ---------------------/

// Popup

const popupProfileElement = document.querySelector('.popup_profile');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');
const profileFormElement = popupProfileElement.querySelector('.form');
const nameInput = profileFormElement.querySelector('.form__input_profile_name');
const jobInput = profileFormElement.querySelector('.form__input_profile_job');

// Card

const popupCardElement = document.querySelector('.popup_card');
const popupCardOpenButtonElement = document.querySelector('.profile__button');
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document
  .querySelector('#card-template')
  .content.querySelector('.card');
const formCardElement = popupCardElement.querySelector(
  '[name="popup-form_card"]'
  );
const formCardNameInput = popupCardElement.querySelector('[name="card-name"]');
const formCardLinkInput = popupCardElement.querySelector('[name="card-link"]');

// Image

const popupCaption = document.querySelector('.image-container__caption');
const popupImageElement = document.querySelector('.popup_image');
const popupImage = popupImageElement.querySelector('.image-container__image');
const saveCardButton = popupCardElement.querySelector('.form__save-button');
const popups = document.querySelectorAll('.popup');

/--------------------- FUNCTIONS ---------------------/

// Card

const createCard = (item) => {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__name');
  cardTitle.textContent = item.title;
  const img = card.querySelector('.card__image');
  img.src = item.link;
  img.alt = item.title;
  
  const cardButtonDelete = card.querySelector('.card__button_trash');
  cardButtonDelete.addEventListener('click', handleClickDeleteButton);
  
  const cardButtonActive = card.querySelector('.card__button');
  cardButtonActive.addEventListener('click', handleClickActiveButton);
  
  img.addEventListener('click', () => {
    handleImageOpen(item);
  });
  
  return card;
};

const handleImageOpen = (item) => {
  popupImage.src = item.link;
  popupCaption.textContent = item.title;
  popupImage.alt = item.title;
  openPopup(popupImageElement);
};

const handleClickActiveButton = (e) => {
  e.target.classList.toggle('card__button_active');
};

const handleClickDeleteButton = (e) => {
  e.target.closest('.card').remove();
};

const renderInitialCard = (item) => {
  cardsContainer.append(createCard(item));
};

initialCards.forEach((item) => {
  renderInitialCard(item);
});

// Open/close popup

const openPopup = (element) => {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyUp)
};

const closePopup = (element) => {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyUp)
};

const handleKeyUp = (e) => {
  if (e.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup)
  }
}

popups.forEach(popup => {
  popup.addEventListener('click', e => {
    if ((e.target.classList.contains('popup')) || (e.target.classList.contains('popup__close-button'))) {
      closePopup(popup)
    }
  })
})

// Change content

const fillEditPopupInputs = () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

const handleChangeProfile = (e) => {
  e.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupProfileElement);
};

const handleCardSubmit = (e) => {
  e.preventDefault();
  cardsContainer.prepend(
    createCard({
      title: formCardNameInput.value,
      link: formCardLinkInput.value,
    })
    );
  closePopup(popupCardElement);
  e.target.reset()
  disableBtn(saveCardButton, config);
};

/--------------------- LISTENERS ---------------------/

popupProfileEditButton.addEventListener('click', () => {
  openPopup(popupProfileElement), fillEditPopupInputs();
});
popupCardOpenButtonElement.addEventListener('click', () => {
  openPopup(popupCardElement);
});
profileFormElement.addEventListener('submit', handleChangeProfile);
formCardElement.addEventListener('submit', handleCardSubmit);
