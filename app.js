const form = document.querySelector('#form');
const fullName = document.querySelector('#fullName');
const passportNumber = document.querySelector('#passportNumber');
const birthDate = document.querySelector('#date-of-birth');
const selectCity = document.querySelector('#city');
const phoneNumber = document.querySelector('#phone');
const email = document.querySelector('#email');
const gender = document.querySelectorAll('#gender');
const termsAndConditions = document.querySelector('#checkbox')

// Full Name Function

const checkFullName = () => {
  let valid = false;
  const fullNameValue = fullName.value;
  if (!isRequired(fullNameValue)) {
    showError(fullName, 'Необходимо заполнить ФИО');
  } else if (!isFullNameValid(fullNameValue)) {
    showError(fullName, `Проверяйте фио`)
  } else {
    showSuccess(fullName);
    valid = true;
  }
  return valid;
};

const isFullNameValid = (fullNameValue) => {
  const regFullName = /^[А-Я][а-я]*([-][А-Я][а-я]*)?\s[А-Я][а-я]*\s[А-Я][а-я]*$/;
  return regFullName.test(fullNameValue);
};


// Номер Серия passport

const checkpassportNumber = () => {
  let valid = false;
  const passportNumberValue = passportNumber.value;
  if(!isRequired(passportNumberValue)) {
    showError(passportNumber ,'Необходимо заполнить серия и номер паспорта')
  } else if(!isPassportNumberValid(passportNumberValue)) {
    showError(passportNumber,'Проверяйте серия и номер паспорта')
  } else {
    showSuccess(passportNumber)
    valid = true
  }
  return valid
}

const isPassportNumberValid = (passportNumber) => {
  const passportSeriaReg = /^([0-9]{2}\s{1}[0-9]{2}\s{1}[0-9]{6})?$/
  return passportSeriaReg.test(passportNumber)
}

// date input
// restrict date input
const birthDateValue = birthDate.max = new Date().toISOString().split("T")[0];

// birthDate function

const dateOfBirth = () => {
  let valid = false;
  if(birthDate.value) {
    showSuccess(birthDate)
    valid = true
  } else {
    showError(birthDate ,'Необходимо заполнить дату рождения')
  }
  return valid
}

// selectCity function

const selectList = () => {
  let valid = false
  const selectCityValue = selectCity.value
  if(selectCityValue === '0') {
    // console.log('Please Chosee your country');
    optionsError(selectCity ,'Необходимо выбрать город')
    // showError()
  } else {
    optionsSuccess(selectCity)
    valid = true
    
  }
  return valid
}

// check phone function
const checkPhone = () => {
  let valid = false;
  const phone = phoneNumber.value;
  if (!isRequired(phone)) {
    showError(phoneNumber, 'Необходимо заполнить номер телефон.');
  } else if (!isPhoneValid(phone)) {
    showError(phoneNumber, 'Проверяйте номер телефон.')
  } else {
    showSuccess(phoneNumber);
    valid = true;
  }
  return valid;
};

const isPhoneValid = (phone) => {
  const regPhone = /^((\+7|7|8)+([0-9]){10})$/;
  return regPhone.test(phone);
};

// check Email function

const checkEmail = () => {
  let valid = false;
  const emailValue = email.value.trim();
  if (!isRequired(emailValue)) {
    showError(email, 'Необходимо заполнить электронную почту');
  } else if (!isEmailValid(emailValue)) {
    showError(email, 'Электронную почту не верно заполнена.')
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const regEmail = /[a-zA-Z0-9_\-\.]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com|yandex.com|yandex.ru|mail.ru)/;
  return regEmail.test(email);
};

// Radio button function

const checkGender = () => {
  let valid = false;
  let value
  for(let i = 0; i < gender.length; i++) {
    if(gender[i].type === 'radio' && gender[i].checked) {
      value = gender[i].value
      RadioSuccess()
      valid = true
    } else {
      // document.getElementById('radio').style.background = 'red'
      RadioError()
    }
  }
  return valid
}

// termsAndConditions function

const checkAgree = () => {
  let valid = false;
  if(termsAndConditions.checked) {
    valid = true
  } else {
    document.getElementById('alert').style.color = 'red'
  }
  return valid
}


// Required Field Validation 
const isRequired = value => value === '' ? false : true;


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Show Erorr For Inputs Type Text & numbers //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// Show Error Function
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // show the error message
  const error = formField.querySelector('span');
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  // hide the error message
  const error = formField.querySelector('span');
  error.textContent = '';
}

///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// Show Erorr For Drop Down List /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

// show function erorr for options
const optionsError = (option, alertMessage) => {
  // get the select element
  const optionField = option.parentElement;
  // add the error class
  optionField.classList.remove('success');
  optionField.classList.add('error');

  // show alert message
  const alertMsg = optionField.querySelector('.select-city-alert');
  alertMsg.textContent = alertMessage
}

// show erorr for options
const optionsSuccess = (option) => {
  // get the select element
  const optionField = option.parentElement;
  // add the error class
  optionField.classList.remove('error');
  optionField.classList.add('success');

  // show alert message
  const alertMsg = optionField.querySelector('.select-city-alert');
  alertMsg.textContent = ''
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////////Show Erorr For Radio Inputs///////////////////////////
////////////////////////////////////////////////////////////////////////////////

// show erorr for radio input
const RadioError = () => {
  const radioBtnSpan = document.getElementById('radio-alert');
  radioBtnSpan.innerText = 'Необходимо выбрать пол'
}
// show Success  for radio input
const RadioSuccess = () => {
  const radioBtnSpan = document.getElementById('radio-alert');
  radioBtnSpan.innerText = ''
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////Submit EventListener for Form/////////////////////
////////////////////////////////////////////////////////////////////////////////

// form event Listener
form.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate form
  let isUsernameValid = checkFullName(),
    isEmailValid = checkEmail(),
    isPhoneValid = checkPhone(),
    isCheckValid = checkGender(),
    isCheckBoxValid = checkAgree(),
    isCheckBoxAgree = selectList(),
    isDateChecked = dateOfBirth(),
    isPassportNumberValid = checkpassportNumber();

  let isFormValid = isUsernameValid && isEmailValid && isPhoneValid 
  && isCheckValid && isCheckBoxValid && isCheckBoxAgree && isDateChecked && isPassportNumberValid
    
  // submit to the server if the form is valid
  if (isFormValid) {
    window.location.href = "http://www.google.com";
  }
});
