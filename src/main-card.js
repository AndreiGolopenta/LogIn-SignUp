export class MainCard {
  
  constructor(signUpTitle, signUpContent, signInTitle, signInContent) {
    this.signUpTitle = signUpTitle;
    this.signUpContent = signUpContent;
    this.signInTitle = signInTitle;
    this.signInContent = signInContent;
  }

  render() {
    const container = document.querySelector('#app');

    const elements = [
      { element: 'h2', content: this.signUpTitle, id: 'signUpTitle' },
      { element: 'div', content: this.signUpContent, id: 'signUpContent' },
      { element: 'button', content: 'Sign Up', id: 'signUpButton' },
      { element: 'h2', content: this.signInTitle, id: 'singInTitle' },
      { element: 'div', content: this.signInContent, id: 'signInContent' },
      { element: 'button', content: 'Sign In', id: 'signInButton' },
    ];

    for (let data of elements) {
      const el = document.createElement(data.element);
      el.textContent = data.content;
      el.id = data.id;
      container.appendChild(el);
    }
  }
}
