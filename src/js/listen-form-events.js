import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';

export default function handleFormChange(form, list) {
  const api = new ApiService();

  form.addEventListener('change', event => {
    event.preventDefault();

    if (event.target.nodeName === 'INPUT') {
      api.apiQuery = event.target.value;
    }
    if (event.target.nodeName === 'SELECT') {
      api.apiCountry = event.target.value;
    }
    api.incrementPage();
    api
      .fetchEvents()
      .then(data => {
        list.innerHTML = cardTpl(data._embedded.events);
      })
      .catch(alert);
  });
}
