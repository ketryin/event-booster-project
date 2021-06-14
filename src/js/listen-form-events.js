import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import debounce from 'lodash.debounce';

export default function handleFormChange(form, list, select, input) {
  const api = new ApiService();

  input.addEventListener('input', debounce(handleInput, 500));

  select.addEventListener('change', handleSelect);
  //   form.addEventListener('change', event => {
  //     event.preventDefault();
  //     api.page = 1;
  //     if (event.target.nodeName === 'INPUT') {
  //       api.apiQuery = event.target.value;
  //     }
  //     if (event.target.nodeName === 'SELECT') {
  //       api.apiCountry = event.target.value;
  //     }
  // api.incrementPage();
  //     api
  //       .fetchEvents()
  //       .then(data => {
  //         list.innerHTML = cardTpl(data._embedded.events);
  //       })
  //       .catch(alert);
  //   });
  // }

  function handleInput(event) {
    api.apiQuery = event.target.value;
    populatePage();
  }
  function handleSelect() {
    api.apiCountry = select.options[select.selectedIndex].value;
    populatePage();
  }
  function populatePage() {
    api
      .fetchEvents()
      .then(data => {
        list.innerHTML = cardTpl(data._embedded.events);
      })
      .catch(alert);
  }
}
