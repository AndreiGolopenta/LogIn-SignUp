import { UserProfile } from './userProfile';

export class Validation {
  inputValidation(data, selector) {
    const error = selector.nextElementSibling.nextElementSibling;
    const icon = selector.nextElementSibling;
    const errorCheck = data.regExp.filter(expression => {
      return expression.test(selector.value) === true;
    });
    if (selector.value.length === 0) {
      error.innerText = `${data.placeholder} is required`;
      error.style.visibility = 'visible';
    } else if (errorCheck.length !== data.regExp.length) {
      error.innerText = data.error;
      error.style.visibility = 'visible';
    } else {
      error.style.visibility = 'hidden';
    }

    if (error.style.visibility === 'visible') {
      icon.style.color = '#D32F2F';
      selector.style.borderBottomColor = '#D32F2F';
    } else {
      icon.style.color = '#451771';
      selector.style.borderBottomColor = '#451771';
    }
  }

  signUp() {
    const errors = [...document.querySelectorAll('.form-card > span')];
    const inputSelectors = [...document.querySelectorAll('input')];
    const icons = [...document.querySelectorAll('.form-card > .material-icons')];
    const message = document.querySelector('.successful-message');
    
    let status = 0;
    const inputSelectorsValue = [];

    for (let info of inputSelectors) {
      inputSelectorsValue.push(info.value);
      info.value.length !== 0 ? status++ : null;
    }

    for (let error of errors) {
      error.style.visibility === 'hidden' ? status++ : null;
    }

    for (let i = 0; i < inputSelectors.length; i++) {
      if (inputSelectors[i].value.length === 0) {
        inputSelectors[i].style.borderBottomColor = '#D32F2F';
        icons[i].style.color = '#D32F2F';
        icons[i].style.borderBottomColor = '#D32F2F';
        errors[i].style.visibility = 'visible';
      }
    }
    
    if (status === 6) {
      message.style.display = 'block';
      const [userName, email, password] = inputSelectorsValue;
      const user = { userName, email, password };
      if (window.localStorage.getItem('usersDb') === null) {
        window.localStorage.setItem('usersDb', JSON.stringify([user]));
      } else {
        const usersDb = JSON.parse(window.localStorage.getItem('usersDb'));
        usersDb.push(user);
        window.localStorage.setItem('usersDb', JSON.stringify(usersDb));
      }
      for (let select of inputSelectors) {
        select.value = '';
      }
      setTimeout(() => (message.style.display = 'none'), 3000);
    }
  }

  singIn() {
    const logInSingUpContainer = document.querySelector('#app');
    const message = document.querySelector('.message-error');
    const usersDb = JSON.parse(window.localStorage.getItem('usersDb'));
    const inputEmail = document.querySelector('.form-card :nth-child(5)');
    const inputPassword = document.querySelector('.form-card :nth-child(8)');
    if (usersDb) {
      for (let user of usersDb) {
        if (user.email === inputEmail.value && user.password === inputPassword.value) {
          message.style.visibility = 'hidden';
          logInSingUpContainer.style.animation = 'scaleDecrease 0.5s ease-in';
          const userProfile = new UserProfile(
            user.userName,
            user.email,
            user.password
          );
          setTimeout(() => {
            logInSingUpContainer.style.transform = 'scale(0)';
            logInSingUpContainer.style.animation = '';
            userProfile.renderCard();
          }, 500);
          break;
        } else {
          message.style.visibility = 'visible';
        }
      }
    } else {
      message.style.visibility = 'visible';
    }
  }
}