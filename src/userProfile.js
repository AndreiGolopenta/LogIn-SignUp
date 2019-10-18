export class UserProfile {

  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }

  renderCard() {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const list = document.createElement('ul');
    const button = document.createElement('button');
    const inputs = [...document.querySelectorAll('input')];
    const htmlElements = [title, list, button];
    const leftPositionCard = `${(window.innerWidth / 2) - 200}px`;

    const userProfile = [
      { name: 'Full Name', value: this.userName },
      { name: 'Email', value: this.email },
      { name: 'password', value: this.password }
    ];

    card.id = 'user-profile';
    title.textContent = 'User Info'
    button.textContent = 'Sign Out';
    card.style.left = leftPositionCard;

    for (let input of inputs) {
      input.value = '';
    }

    for (let detail of userProfile) {
      const listEntry = document.createElement('li');
      listEntry.textContent = `${detail.name} : ${detail.value}`;
      list.appendChild(listEntry);
    }

    for (let element of htmlElements) {
      card.appendChild(element);
    }
    document.body.appendChild(card);
    button.addEventListener('click', this.signOut);
  }

  signOut() {
    const userProfile = document.querySelector('#user-profile');
    const app = document.querySelector('#app');
    userProfile.style.animation = 'scaleDecrease 0.5s ease-in';
    setTimeout(() =>{
      app.style.transform = 'scale(1)';
      userProfile.remove();
    }, 500);
  }
}