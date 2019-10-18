import { elements } from './constants';
import { Validation } from './validation';

export class FormCard extends Validation {

  inputFocus(selector) {
    selector.nextElementSibling.style.borderBottom = '2px solid';
  }

  inputFocusOut(selector) {
    selector.nextElementSibling.style.borderBottom = '1.5px solid';
  }

  passwordViewOrHide(selector) {
    if (selector.innerText === 'lock') {
      selector.innerText = 'lock_open';
      selector.previousElementSibling.setAttribute('type', 'text');
    } else {
      selector.innerText = 'lock';
      selector.previousElementSibling.setAttribute('type', 'password');
    }
  }

  renderCard() {
    const container = document.querySelector('#app');
    const createCard = document.createElement('div');
    createCard.classList.add('form-card');
    container.appendChild(createCard);
    const card = document.querySelector('.form-card');

    for (let data of elements) {
      const el = document.createElement(data.element);
      data.content ? (el.textContent = data.content) : null;
      data.element === 'i' ? (el.className = 'material-icons') : null;
      data.placeholder === 'Password' ? el.setAttribute('type', 'password') : null; 
      card.appendChild(el);
      if (data.element === 'input') {
        el.addEventListener('focus', this.inputFocus.bind(null, el));
        el.addEventListener('focusout', this.inputFocusOut.bind(null, el));
      }
      if (data.content === 'lock') {
        el.addEventListener('click', this.passwordViewOrHide.bind(null, el));
      }
      if (data.element === 'button') {
        el.addEventListener('click', this.signUp);
      }
      if (data.placeholder) {
        el.setAttribute('placeholder', data.placeholder);
      }
    }
    this.renderSignIn();
    this.renderSignUpMessage();
    this.renderErrorMessage();
  }

  addInputEvents(selectors) {
    for (let selected of selectors) {
      const [, el] = selected;
      const method = this.inputValidation.bind(null, ...selected);
      el.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
      el.value = '';
      selected.push(method);
      el.addEventListener('keyup', method);
    }
  }

  removeInputEvents(selectors) {
    for (let selected of selectors) {
      const [, el, method] = selected;
      el.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
      el.value = '';
      el.removeEventListener('keyup', method);
      selected.length = 2;
    }
  }

  renderSignUpMessage() {
    const container = document.querySelector('.form-card');
    const messageContainer = document.createElement('div');
    const icon = document.createElement('i');
    const textMessage = document.createElement('span');

    messageContainer.classList.add('successful-message');
    icon.classList.add('material-icons');
    icon.textContent = 'check_circle';
    textMessage.textContent = 'Your registration was successful';
    messageContainer.appendChild(icon);
    messageContainer.appendChild(textMessage);
    container.appendChild(messageContainer); 
  }

  renderErrorMessage() {
    const card = document.querySelector('.form-card');
    const messageContainer = document.createElement('div');
    const message = document.createElement('div');
    const icon = document.createElement('i');
    const textError = document.createElement('span');
    const closeButton = document.createElement('i');

    closeButton.addEventListener('click', () => {
      messageContainer.style.visibility = 'hidden';
    });
  
    closeButton.textContent = 'close';
    closeButton.classList.add('material-icons', 'closeButton');
    textError.textContent = 'The email or password did not\n match. Please try again.'; 
    icon.textContent = 'error';
    icon.classList.add('material-icons');
    messageContainer.classList.add('message-error');
    messageContainer.appendChild(message);
    message.appendChild(icon);
    message.appendChild(textError);
    message.appendChild(closeButton);
    card.appendChild(messageContainer);
  }

  selectors() {
    const title = document.querySelector('.form-card').firstElementChild;
    const inputName = title.nextElementSibling;
    const iconName = inputName.nextElementSibling;
    const errorName = iconName.nextElementSibling;
    const button = document.querySelector('.form-card button');
    return [title, button, inputName, iconName, errorName];
  }

  renderSignUp() {
    const [title, button, ...restSelectors] = this.selectors();
    const messageError = document.querySelector('.message-error');

    messageError.style.visibility = 'hidden';
    button.removeEventListener('click', this.singIn);
    button.addEventListener('click', this.signUp);

    for (let selected of restSelectors) {
      selected.style.animation = 'fadeIn 0.4s ease-in-out';
      setTimeout(() => (selected.style.opacity = '1'), 400);
    }

    title.style.animation = 'titleUp 0.4s ease-in-out';
    setTimeout(() => {
      title.style.top = '60px';
      title.innerHTML = 'Sign Up';
      button.innerText = 'Sign Up';
    }, 400);
  }

  renderSignIn() {
    const [title, button, ...restSelectors] = this.selectors();
    const input = [...document.querySelectorAll('input')];
    const icon = [...document.querySelectorAll('i')];

    button.removeEventListener('click', this.signUp);
    button.addEventListener('click', this.singIn);

    for (let selected of restSelectors) {
      selected.style.animation = 'fadeOut 0.4s ease-in-out';
      setTimeout(() => (selected.style.opacity = '0'), 400);
    }
  
    title.style.animation = 'titleDown 0.4s ease-in-out';
    setTimeout(() => {
      title.style.top = '116px';
      title.innerHTML = 'Sign In';
      button.innerText = 'Sign In';
    }, 400);

    for (let selected of input) {
      selected.style.borderBottomColor = '#451771';
    }
    icon.length = 3;
    for (let selected of icon) {
      selected.style.color = '#451771';
      selected.style.borderBottomColor = '#451771';
    }
  }
}
