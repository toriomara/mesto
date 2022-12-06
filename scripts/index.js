import { initialCards } from './cards.js';

/--------------------- DOM's elements ---------------------/;

const popupProfileElement = document.querySelector('.popup_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupProfileElement.querySelector(
  '.popup__close-button'
);

const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_profile_name');
const jobInput = formElement.querySelector('.form__input_profile_job');

// Card
const popupCardElement = document.querySelector('.popup_card');
const popupCardOpenButtonElement = document.querySelector('.profile__button');
const popupCardCloseButtonElement = popupCardElement.querySelector(
  '.popup__close-button_card'
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

// Image

const popupImageElement = document.querySelector('.popup_image');
const popupImage = document.querySelector('.image-container__image');
const popupCaption = document.querySelector('.image-container__caption');
const popupImageCloseButtonElement = popupImageElement.querySelector(
  '.image-container__close-button'
);

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

const renderCard = (item) => {
  cardsContainer.append(createCard(item));
};

initialCards.forEach((item) => {
  renderCard(item);
});

/--------------------- FORM's elements ---------------------/;

const openPopup = (element) => {
  element.classList.add('popup_opened');
};

const closePopup = (element) => {
  element.classList.remove('popup_opened');
};

const initialInputValue = () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

// Card
// const closePopupOverlay = (e) => {
//   if (e.target === e.currentTarget) {
//     closePopup();
//   }
//   return;
// };

const handleChangeProfile = (e) => {
  e.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupProfileElement);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  cardsContainer.prepend(
    createCard({
      title: formCardNameInput.value,
      link: formCardLinkInput.value,
    })
  );
  closePopup(popupCardElement);
  formCardNameInput.value = '';
  formCardLinkInput.value = '';
};

/--------------------- Register event listener by click ---------------------/;

popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupProfileElement, initialInputValue());
});
popupCloseButtonElement.addEventListener('click', () => {
  closePopup(popupProfileElement);
});
// popupElement.addEventListener('click', closePopupOverlay);
formElement.addEventListener('submit', handleChangeProfile);

// Card
popupCardOpenButtonElement.addEventListener('click', () => {
  openPopup(popupCardElement);
});
popupCardCloseButtonElement.addEventListener('click', () => {
  closePopup(popupCardElement);
});
popupCardCloseButtonElement.addEventListener('click', () => {
  closePopup(popupImageElement);
});
formCardElement.addEventListener('submit', handleFormSubmit);

// Image
popupImageCloseButtonElement.addEventListener('click', () => {
  closePopup(popupImageElement);
});
