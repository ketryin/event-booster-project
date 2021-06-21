import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import { defaultModules } from './../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from './../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';
import filterBiggerImage from './filter-lagest-image.js';

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
      api
        .fetchEvents()
        .then(data => {
          refresh({
            total: data.page.totalElements,
            length: data.page.size,
          });
          // eventsListRef.innerHTML = cardTpl(data._embedded.events);
          const insertData = data._embedded.events.map(event => {
            const eventImage = filterBiggerImage(event.images);
            // console.log(eventImage.url);
            event.images = [eventImage];

            return cardTpl(event);
          });

          eventsListRef.innerHTML = insertData.join('');
        })
        .catch(er => {
          const myError = error({
            text: 'No matches for your query, try to enter correct data',
          });
          defaults.addClass = 'animate__animated animate__flip';
        })
        .finally(() => {
          removeLoader();
        });
    },
  });
}
