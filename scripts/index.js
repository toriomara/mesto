import { initialCards, config } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

/--------------------- ELEMENTS ---------------------/

// Profile

const popupProfileElement = document.querySelector('.popup_profile');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');
const profileFormElement = popupProfileElement.querySelector('.form');
const nameInput = profileFormElement.querySelector('.form__input_profile_name');
const jobInput = profileFormElement.querySelector('.form__input_profile_job');
// Validation
const formValidationProfile = new FormValidator(config, popupProfileElement);
formValidationProfile.enableValidation();

// Card

const popupCardElement = document.querySelector('.popup_card');
const popupCardOpenButtonElement = document.querySelector('.profile__button');
const cardsContainer = document.querySelector('.cards');
const formCardElement = popupCardElement.querySelector(
  '[name="popup-form_card"]'
  ); 
const formCardNameInput = popupCardElement.querySelector('[name="card-name"]');
const formCardLinkInput = popupCardElement.querySelector('[name="card-link"]');
// Validation
const formValidationCard = new FormValidator(config, popupCardElement);
formValidationCard.enableValidation();

// Image

const popupCaption = document.querySelector('.image-container__caption');
const popupImageElement = document.querySelector('.popup_image');
const popupImage = popupImageElement.querySelector('.image-container__image');
const saveCardButton = popupCardElement.querySelector('.form__save-button');
const popups = document.querySelectorAll('.popup');

/--------------------- FUNCTIONS ---------------------/

// Card

const createCard = (title, link, img) => {
  const card = new Card(title, link, img, handleImageOpen, '#card-template');
  return card.generateCard();
}

const handleImageOpen = (title, link) => {
  popupImage.src = link;
  popupCaption.textContent = title;
  popupImage.alt = title;
  openPopup(popupImageElement);
};

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.title, item.link, item.img, '#card-template'));
});

// Open/close popup

const openPopup = (element) => {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyUp);
  formValidationCard.disableBtn()
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
    createCard(
      formCardNameInput.value,
      formCardLinkInput.value,
      handleImageOpen,
      '#card-template'
    )
  );
  closePopup(popupCardElement);
  e.target.reset()
  formValidationCard.disableBtn(saveCardButton, config);
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
