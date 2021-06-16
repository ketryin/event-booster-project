import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';
import notifyOnError from './listen-form-events';

export default function initialPopulatePage(list) {
  animateLoader();
  const api = new ApiService();
  api
    .fetchPopular()
    .then(data => {
      list.innerHTML = cardTpl(data._embedded.attractions);
    })
    .catch(notifyOnError)
    .finally(() => {
      removeLoader();
    });
}
