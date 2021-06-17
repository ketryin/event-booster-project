import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';

export default function initialPopulatePage(list) {
  animateLoader();

  const api = new ApiService();
  api.searchCountryQuery = 'US';
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
