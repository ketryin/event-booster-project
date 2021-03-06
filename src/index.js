import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import countries from './js/countries.js';
import modal from './js/modal.js';
import populateSelect from './js/select-populating.js';
import modalTeam from './js/modal-team.js';
import handleFormChange from './js/listen-form-events.js';
import customizeSelect from './js/customize-select';
import arrowUp from './js/arrow-up.js';
import modalAuthentication from './js/modal-authentication.js';
import changeTheme from './js/change-theme.js';

const selectRef = document.querySelector('#country-select');
const formRef = document.querySelector('.events__search-form');
const eventsListRef = document.querySelector('.js-list');
const inputRef = document.querySelector('#query-input');

populateSelect(countries, selectRef);
const customSelect = customizeSelect(selectRef);
handleFormChange(formRef, eventsListRef, selectRef, inputRef, customSelect);

// eventsListRef.addEventListener('mouseout', event => {
//   if (event.target.nodeName === 'LI') {
//     console.log('exited', event.target);
//   }
// });
// eventsListRef.addEventListener('mouseover', event => {
//   if (event.target.nodeName === 'LI') {
//     console.log('entered', event.target);
//   }
// });
