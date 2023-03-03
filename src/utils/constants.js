export const defaultFormConfig = {
  // formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

export const popupConfig = {
  cardFormModalWindow: '.popup_card',
  imageModalWindow: '.popup_image',
  removeCardModalWindow: '.popup_confirm',
  editFormModalWindow: '.popup_profile',
  changeAvatarModalWindow: '.popup_avatar',
};

export const cardConfig = {
  cardSelector: '.cards',
  cardTemplate: '#card-template',
};

export const userInfoConfig = {
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar',
};

export const mestoApiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59/',
  token: 'b063a258-13a4-49af-ad5b-48e5626339ec',
};
