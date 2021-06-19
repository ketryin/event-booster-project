const body = document.querySelector('body');
const checkbox = document.querySelector('.theme-switch__toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

checkbox.addEventListener('change', changeTheme);

function changeTheme(event) {
  event.currentTarget.checked ? checkedInput() : notCheckedInput();
}

function checkedInput() {
  body.classList.add(Theme.DARK);
  body.classList.remove(Theme.LIGHT);
  localStorage.setItem('theme', Theme.DARK);
  checkbox.checked = true;
}

function notCheckedInput() {
  body.classList.add(Theme.LIGHT);
  body.classList.remove(Theme.DARK);
  localStorage.setItem('theme', Theme.LIGHT);
  checkbox.checked = false;
}

function carrentTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.LIGHT || savedTheme === null) {
    notCheckedInput();
    return;
  }
  if (savedTheme === Theme.DARK) {
    checkedInput();
    return;
  }
}

carrentTheme();
