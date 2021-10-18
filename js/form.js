var script = document.createElement('script');
script.src = "../js/contact.js";
document.head.appendChild(script);

window.addEventListener('DOMContentLoaded', (event) => {

  const name = document.querySelector('#name');
  name.addEventListener('input', function () {
    let names = document.querySelector('#name').value.split(" ");
    if (names[0].length == 0) {
      setErrorText('.name-error', "");
      return;
    }
    if (names.length == 2) {
      try {
        (new Contact()).firstName = names[0];
        setErrorText('.name-error', "");
        (new Contact()).lastName = names[1];
        setErrorText('.name-error', "");
      } catch (e) {
        setErrorText('.name-error', e);
      }
    }
    else {
      try {
        (new Contact()).firstName = names[0];
        setErrorText('.name-error', "");
        (new Contact()).lastName = "";
        setErrorText('.name-error', "");
      } catch (e) {
        setErrorText('.name-error', e);
      }
    }
  });

  const addressElement = document.querySelector('#address');
  addressElement.addEventListener('input', function () {
    let address = document.querySelector('#address').value;
    let words = address.split(" ");
    if (address == "") {
      setErrorText('.address-error', "");
      return;
    }
    if (words.length > 1) {
      try {
        (new Contact()).address = address;
        setErrorText('.address-error', "");
      } catch (e) {
        setErrorText('.address-error', e);
      }
    }
    else {
      setErrorText('.address-error', "Address should have multiple words");
    }
  });

  const phoneElement = document.querySelector('#phone');
  const phoneError = document.querySelector('.phone-error');
  phoneElement.addEventListener('input', function () {
    if (phoneElement.value == "") {
      setErrorText('.phone-error', "");
      return;
    }
    try {
      (new Contact()).phone = phoneElement.value;
      setErrorText('.phone-error', "");
    } catch (e) {
      setErrorText('.phone-error', e);
    }

  });

  const emailElement = document.querySelector('#email');
  const emailError = document.querySelector('.email-error');
  emailElement.addEventListener('input', function () {
    if (emailElement.value == "") {
      setErrorText('.email-error', "");
      return;
    }
    try {
      (new Contact()).email = emailElement.value;
      setErrorText('.email-error', "");
    } catch (e) {
      setErrorText('.email-error', e);
    }

  });

  const zipElement = document.querySelector('#zip');
  zipElement.addEventListener('input', function () {
    if (zipElement.value == "") {
      setErrorText('.zip-error', "");
      return;
    }
    try {
      (new Contact()).zip = zipElement.value;
      setErrorText('.zip-error', "");
    } catch (e) {
      setErrorText('.zip-error', e);
    }

  });

  let button = document.getElementById("submit-button");
  name.addEventListener('input', function () {
    if (name.value == "") {
      button.classList.remove("submit-button");
      button.classList.add("submit-button-disabled");
    } else {
      activateSubmitButton(button);
    }
  });
});
const activateSubmitButton = () => {
  let button = document.getElementById("submit-button");

  button.classList.remove("submit-button-disabled");
  button.classList.add("submit-button");
  button.disabled = false;
}
const setErrorText = (errorName, errorMessage) => {
  const textError = document.querySelector(errorName);
  textError.textContent = errorMessage;
  return;
}
const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  let contactData = createContact();
  let jsonObject = JSON.stringify(contactData);
  alert(contactData);
  createAndUpdateStorage(contactData);
}

const createContact = () => {
  let contactData = new Contact();
  let names = getInputValueById('#name').split(" ");
  contactData.firstName = names[0];
  contactData.lastName = names[1];
  contactData.address = getInputValueById('#address');
  contactData.city = getInputValueById('#city');
  contactData.state = getInputValueById('#state');
  contactData.zip = getInputValueById('#zip');
  contactData.phone = getInputValueById('#phone');
  contactData.email = getInputValueById('#email');
  return contactData;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}
function createAndUpdateStorage(contactData){
  let contactList = JSON.parse(localStorage.getItem("ContactList"));

  if(contactList != undefined){
      contactList.push(contactData);
  }
  else{
      contactList = [contactData];
  }
  alert(contactList.toString());
  localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const resetForm = () => {
  setValue('#name','');
  setValue('#address','');
  setSelectedIndex('#city',0);
  setSelectedIndex('#state',0);
  setValue('#zip','');
  setValue('#phone','');
  setValue('#email','');
  let listOfErrors = ['.name-error','.address-error','.phone-error','.email-error','.zip-error'];
  listOfErrors.forEach(errorElement => {
    setErrorText(errorElement,"");
  });
}

const setValue = (id,value) => {
const element = document.querySelector(id);
element.value = value;
}

const setSelectedIndex = (id,index) => {
const element = document.querySelector(id);
element.selectedIndex = index;
}