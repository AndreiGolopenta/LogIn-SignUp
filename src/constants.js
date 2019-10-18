const signUpTitle = "Don't Have an account?";
const signUpContent =
  'Get access to all the features by creating an account now';
const signInTitle = 'Have an account?';
const signInContent =
  'Sign in with an existing account using your e-mail and your password.';

const elements = [
  { element: 'h2', content: 'Sign Up' },
  {
    element: 'input',
    placeholder: 'Full Name',
    regExp: [/^(\w\s?){3,25}$/],
    error: 'You must enter between 3 and 25 characters',
  },
  { element: 'i', content: 'person' },
  { element: 'span', content: 'Name is required' },
  {
    element: 'input',
    placeholder: 'Email',
    regExp: [/^\w+(\.|_)?\w+@\w+\.(com|net|org|ro)$/i],
    error: 'Invalid email format',
  },
  { element: 'i', content: 'email' },
  { element: 'span', content: 'Email is required' },
  {
    element: 'input',
    placeholder: 'Password',
    regExp: [/\W{1,37}/, /\d{1,37}/, /[a-z]{1,37}/, /[A-Z]{1,37}/, /^\w|\W{8,40}$/],
    error: 'Minimum 8 characters. At least one lowercase,\n one uppercase, one special character, one digit.',
  },
  { element: 'i', content: 'lock' },
  { element: 'span', content: 'Password is required' },
  { element: 'button', content: 'Sign Up' },
];

export { elements, signUpTitle, signUpContent, signInTitle, signInContent };