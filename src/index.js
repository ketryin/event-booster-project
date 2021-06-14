import './sass/main.scss';
import countries from './js/countries.js';
import populateSelect from './js/select-populating.js';
import handleFormChange from './js/listen-form-events.js';

const formRef = document.querySelector('.events__search-form');
const eventsListRef = document.querySelector('.js-list');

populateSelect(countries);
handleFormChange(formRef, eventsListRef);
