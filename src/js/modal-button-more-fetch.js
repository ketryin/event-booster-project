import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';

const eventsListRef = document.querySelector('.js-list');
const backdropRef = document.querySelector('[data-modal-backdrop]');
const bodyRef = document.querySelector('body');


export default function onModalButtonMoreClick(event) {
    animateLoader();
    const modalWindow = document.querySelector('#modal-card');
    modalWindow.innerHTML = '';

    backdropRef.classList.toggle('is--hidden');
    bodyRef.classList.toggle('modal-open');

    const api = new ApiService();
    api.apiQuery = event.target.dataset.name;
    api.resetPage();
  
  $('#pagenumbers').pagination({
    ajax: function (options, refresh, $target) {
      api.page = options.current - 1;
      api.fetchEvents()
        .then(data => {
          refresh({
            total: data.page.totalElements,
            length: data.page.size
          });
          eventsListRef.innerHTML = cardTpl(data._embedded.events);
        })
        .catch(alert)
        .finally(() => {
          removeLoader();
        });
    },
  });
}
