const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    const fieldsetList = [...document.querySelectorAll('.form__set')];
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, config);
    }); 
  });
};

enableValidation(config); 

// const enableValidation = (config) => {
//   const forms = [...document.querySelectorAll(config.formSelector)];
  
//   forms.forEach(form => {
//     const inputs = [...document.querySelectorAll(config.inputSelector)];
//     const button = document.querySelector(config.submitButtonSelector);
    
//     form.addEventListener('submit', (e) => {
//       e.preventDefault()
//     })
    
//     inputs.forEach(input => {
//       input.addEventListener('input', () => {
//         checkInputValidity(input, config)
//         toggleButtonState(inputs, button, config)
//       })
//     });
//   });
// }

// const checkInputValidity  = (input, config) => {
//   const error = document.querySelector(`#${input.id}-error`)
  
//   if (input.validity.valid) {
//     error.textContent = ''
//     error.classList.remove(config.errorClass)
//     input.classList.remove(config.inputErrorClass)
//   } else {
//     error.textContent = input.validationMessage
//     error.classList.add(config.errorClass)
//     input.classList.add(config.inputErrorClass)
//   }
// }

// const toggleButtonState = (inputs, button, config) => {
//   const isFormValid = inputs.every(input => input.validity.valid)
    
//   if (!isFormValid) {
//     button.classList.add(config.inactiveButtonClass)
//     button.disabled = 'disabled'
//   } else {
//     button.classList.remove(config.inactiveButtonClass)
//     button.disabled = ''
//   }
// }
