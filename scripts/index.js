// Делаем выборку элементов DOM
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector(
  '.popup__closeButton'
);
const popupOpenButtonElement = document.querySelector('.profile__editButton');

// FORM
let formElement = document.querySelector('.popup__form');

const openPopup = function (e) {
  popupElement.classList.add('popup_is-opened');
  console.log('Open popup clicked');
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

const closePopupOverlay = function (e) {
  console.log(e.target, e.currentTarget);
  if (e.target === e.currentTarget) {
    closePopup();
  }
  return;
};

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupOverlay);

//
