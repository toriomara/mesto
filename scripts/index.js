import { initialCards } from './cards.js';

/--------------------- DOM's elements ---------------------/;

const popupProfileElement = document.querySelector('.popup_profile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_profile_name');
const jobInput = formElement.querySelector('.form__input_profile_job');

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

const popups = document.querySelectorAll('.popup')
popups.forEach(popup => {
  popup.addEventListener('click', e => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
})

popups.forEach(popup => {
  const closeButton = popup.querySelector('.popup__close-button')
  popup.addEventListener('click', e => {
    if (e.target == closeButton) {
      closePopup(popup)
    }
  })
})

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
  const popupImageElement = document.querySelector('.popup_image');
  const popupImage = popupImageElement.querySelector('.image-container__image');
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

const initialInputValue = () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

// Card

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
popupCardOpenButtonElement.addEventListener('click', () => {
  openPopup(popupCardElement);
});
formElement.addEventListener('submit', handleChangeProfile);
formCardElement.addEventListener('submit', handleFormSubmit);


// const popupImageElement = document.querySelector('.popup_image');
// const popupCloseButtonElement = popupProfileElement.querySelector(
  //   '.popup__close-button'
  // );
  // const popupCardCloseButtonElement = popupCardElement.querySelector(
    //   '.popup__close-button_card'
    // );
// const popupImageCloseButtonElement = popupImageElement.querySelector(
  //   '.image-container__close-button'
  // );

  // popupCloseButtonElement.addEventListener('click', () => {
//   closePopup(popupProfileElement);
// });
// Card
// popupCardCloseButtonElement.addEventListener('click', () => {
  //   closePopup(popupCardElement);
  // });
  // popupCardCloseButtonElement.addEventListener('click', () => {
    //   closePopup(popupImageElement);
    // });
  // // Image
  // popupImageCloseButtonElement.addEventListener('click', () => {
    //   closePopup(popupImageElement);
// });



