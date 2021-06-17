import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import debounce from 'lodash.debounce';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';

export default function handleFormChange(form, list, select, input, loader) {
  const api = new ApiService();

  input.addEventListener('input', debounce(handleInput, 500));

  select.addEventListener('change', handleSelect);

  // form.addEventListener('change', handleFormChange);
  function handleFormChange(event) {
    event.preventDefault();
    if (event.target.nodeName === 'INPUT') {
      api.apiQuery = event.target.value;
    }
    if (event.target.nodeName === 'SELECT') {
      api.apiCountry = event.target.value;
    }
    populatePage();
  }

  function handleInput(event) {
    api.resetPage();
    animateLoader();
    if (event.target.value === '') {
      removeLoader();
      return;
    }
    api.apiQuery = event.target.value;
    populatePage();
  }

  function handleSelect() {
    api.resetPage();
    animateLoader();
    api.apiCountry = select.options[select.selectedIndex].value;
    populatePage();
  }
  
  function populatePage() {
    api
      .fetchEvents()
      .then(data => {
        list.innerHTML = cardTpl(data._embedded.events);
      })
      .catch(alert)
      .finally(() => {
        removeLoader();
      });
  }
}
