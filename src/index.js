import '../assets/scss/styles.scss';
import { MainCard } from './main-card';
import { FormCard } from './form-card';

import { signUpTitle, signUpContent, signInTitle, signInContent, elements } from './constants';

const mainCard = new MainCard(signUpTitle, signUpContent, signInTitle, signInContent);
const formCard = new FormCard();

mainCard.render();
formCard.renderCard();

const signUpButton = document.querySelector('#app :nth-child(3)');
const singInButton = document.querySelector('#app :nth-child(6)');
const formCardSelect = document.querySelector('.form-card');
const inputName = document.querySelector('.form-card :nth-child(2)');
const inputEmail = document.querySelector('.form-card :nth-child(5)');
const inputPassword = document.querySelector('.form-card :nth-child(8)');

const input = [];

for (let element of elements) {
  element.placeholder === 'Full Name' ? input.push([element, inputName]) : null;
  element.placeholder === 'Email' ? input.push([element, inputEmail]) : null;
  element.placeholder === 'Password' ? input.push([element, inputPassword]) : null; 
}

function signUpButtonMethod() {
  formCardSelect.classList.add('sign-in');
  formCardSelect.removeAttribute('style');
  setTimeout(() => {
    formCardSelect.style.left = '50px';
    formCardSelect.classList.remove('sign-in');
  }, 800);
  formCard.renderSignUp();
  formCard.addInputEvents(input);
}

function singInButtonMethod() {
  formCardSelect.classList.add('sing-up');
  formCardSelect.removeAttribute('style');
  setTimeout(() => {
    formCardSelect.style.left = '371px';
    formCardSelect.classList.remove('sing-up');
  }, 800);
  formCard.renderSignIn();
  formCard.removeInputEvents(input);
}


signUpButton.addEventListener('click', signUpButtonMethod);
singInButton.addEventListener('click', singInButtonMethod);
