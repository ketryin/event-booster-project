import './sass/main.scss';
import countries from './js/countries.js';
import populateSelect from './js/select-populating.js';
import handleFormChange from './js/listen-form-events.js';

const selectRef = document.querySelector('#country-select');
const formRef = document.querySelector('.events__search-form');
const eventsListRef = document.querySelector('.js-list');
const inputRef = document.querySelector('#query-input');

populateSelect(countries, selectRef);
handleFormChange(formRef, eventsListRef, selectRef, inputRef);
// animateSpinner(spinnerRef);
