// DOM's elements
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector(
  '.popup__closeButton'
);

const popupOpenButtonElement = document.querySelector('.profile__editButton');

const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

let formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input-name');
const jobInput = formElement.querySelector('.form__input-job');

// FORM's elements

const openPopup = function (e) {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

const closePopupOverlay = function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
  return;
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

// Регистрируем обработчики событий по клику

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupOverlay);
formElement.addEventListener('submit', formSubmitHandler);
