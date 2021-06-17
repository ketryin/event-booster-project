import './sass/main.scss';
import countries from './js/countries.js';
import modal from './js/modal.js';
import populateSelect from './js/select-populating.js';
import modalTeam from './js/modal-team.js';
import handleFormChange from './js/listen-form-events.js';
import initialPagePopulate from './js/initial-fetch.js';
import arrowUp from './js/arrow-up.js';

const selectRef = document.querySelector('#country-select');
const formRef = document.querySelector('.events__search-form');
const eventsListRef = document.querySelector('.js-list');
const inputRef = document.querySelector('#query-input');

initialPagePopulate(eventsListRef);
populateSelect(countries, selectRef);
handleFormChange(formRef, eventsListRef, selectRef, inputRef);
