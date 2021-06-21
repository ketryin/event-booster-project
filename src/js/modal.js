import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import { defaultModules } from './../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from './../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
defaults.addClass = 'animate__animated animate__pulse pnotify__position';
defaults.mode = 'dark';
defaults.sticker = false;

import EventApiService from './fetch-events.js';
import modalTemplate from '../templates/modal-card-details.hbs';
import onModalButtonMoreClick from './modal-button-more-fetch';
import filterBiggerImage from './filter-lagest-image.js';
import './modal-favorite.js';
import renderFavEvents from './modal-favorite.js'

const api = new EventApiService();

const favList = document.querySelector('.fav-events-list');


const refs = {
  eventCards: document.querySelector('.events-list'),
  modalWindow: document.querySelector('#modal-card'),
  modalBtnClose: document.querySelector('[data-modal-window-close]'),
  backdrop: document.querySelector('[data-modal-backdrop]'),
  body: document.querySelector('body'),
};

refs.eventCards.addEventListener('click', onEventCardClick);
refs.backdrop.addEventListener('click', onClickBackdrop);


export function onClickBackdrop(e) {
  if (!e.target.classList.contains('backdrop__modal')) {
    return;
  }
  refs.backdrop.classList.toggle('is--hidden');
  refs.body.classList.toggle('modal-open');
}

function onCLickBtnClose() {
  const btnRef = document.querySelector('[data-modal-window-close]');

  btnRef.addEventListener('click', () => {
    refs.modalWindow.classList.toggle('is--hidden');
    refs.body.classList.toggle('modal-open');
  });
}

function onEventCardClick(e) {
  const currentCard = e.target;
  if (!currentCard.closest('.events-list__item')) {
    return;
  }

  const eventSingleCard = currentCard.closest('.events-list__item');
  refs.modalWindow.classList.toggle('is--hidden');
  refs.body.classList.toggle('modal-open');
  // console.log(eventSingleCard.id);
  // console.dir(eventSingleCard);

  if (
    e.target.nodeName === 'IMG' ||
    e.target.nodeName === 'SPAN' ||
    e.target.nodeName === 'H2' ||
    e.target.nodeName === 'P' ||
    e.target.nodeName === 'LI'
  ) {
    api
      .fetchModalDetails(eventSingleCard.id, eventSingleCard.dataset.type)
      .then(data => {
        refs.modalWindow.innerHTML = modalTemplate(data);

        onCLickBtnClose();

        const modalTitleRef = document.querySelector('.modal__text');
        modalTitleRef.textContent = `${modalTitleRef.textContent.slice(0, 150)}...`;
        // console.log(modalTitleRef.textContent);

        const modalButtonMore = document.querySelector('.modal__btn__more');
        modalButtonMore.addEventListener('click', onModalButtonMoreClick);
        
        

        const imageElement = document.querySelector('.modal-img-test');

        const biggestImage = filterBiggerImage(data.images);
        if (biggestImage) {
          imageElement.setAttribute('src', biggestImage.url);
        } else {
          imageElement.setAttribute(
            'src',
            'https://image.flaticon.com/icons/png/512/4076/4076525.png',
          );
        }

        const imageElementCircle = document.querySelector('.modal__circle-img');
        if (biggestImage) {
          imageElementCircle.setAttribute('src', biggestImage.url);
        } else {
          imageElementCircle.setAttribute(
            'src',
            'https://image.flaticon.com/icons/png/512/4076/4076525.png',
          );
        }

        // eventSingleCard.setAttribute('in-storage', false);

        const favoriteButton = document.querySelector('.favorite-button');
        favoriteButton.textContent = localStorage.getItem(`${eventSingleCard.id}`) || 'Add to favorite';
        if (favoriteButton.textContent === 'Remove from favorite') {
          favoriteButton.classList.add('actice-add-to-fav');
        }

        favoriteButton.addEventListener('click', () => {
          const eventContainer = document.querySelector(`[id='${eventSingleCard.id}']`);
          const location = eventContainer.querySelector('.event-location');
          
          const currentStorage = localStorage.getItem('favoriteEventStorage');
          const currentFavoriteEventOnStorage = JSON.parse(currentStorage);
          // console.log(currentFavoriteEventOnStorage);
          const filteredCurrentFavoriteEventOnStorage = Array.from(new Set(currentFavoriteEventOnStorage.map(({ id, name, date, location, src }) => JSON.stringify({ id, name, date, location, src }))), JSON.parse);
          // console.log(filteredCurrentFavoriteEventOnStorage);
          // console.log(currentFavoriteEventOnStorage);
    
          // const eventToRemove = filteredCurrentFavoriteEventOnStorage.find((el, index) => el.id === eventSingleCard.id);
          // console.log(eventToRemove);
          const indexOfEventToRemove = filteredCurrentFavoriteEventOnStorage.map(item => item.id).indexOf(eventSingleCard.id);
          // console.log(indexOfEventToRemove);

          if (indexOfEventToRemove !== -1) {
            // console.log('remove');
            favoriteButton.classList.remove('actice-add-to-fav');
            filteredCurrentFavoriteEventOnStorage.splice(indexOfEventToRemove, 1);
            localStorage.setItem('favoriteEventStorage', JSON.stringify(filteredCurrentFavoriteEventOnStorage));
            favoriteButton.textContent = 'Add to favorite';
            localStorage.setItem(`${eventSingleCard.id}`, 'Add to favorite');

              if (!eventSingleCard.getAttribute('in-storage')) {
                eventSingleCard.removeAttribute('in-storage');
                favoriteButton.setAttribute('disabled', true);
                favoriteButton.classList.add('actice-remove-to-fav');
                favoriteButton.textContent = 'removed'

                renderFavEvents();
                }
              // refs.modalWindow.classList.toggle('is--hidden');
              // refs.body.classList.toggle('modal-open');

            return;

          } else {
            // console.log('add');
            eventSingleCard.setAttribute('in-storage', true);
            // console.log(eventSingleCard);
            favoriteButton.textContent = 'Remove from favorite';
            favoriteButton.classList.add('actice-add-to-fav');
            // console.log(favoriteButton.textContent);
            filteredCurrentFavoriteEventOnStorage.push({
              id: eventSingleCard.id,
              name: data.name,
              date: data.dates.start.localDate,
              location: location.textContent,
              src: biggestImage.url,
            })
            localStorage.setItem('favoriteEventStorage', JSON.stringify(filteredCurrentFavoriteEventOnStorage));
            localStorage.setItem(`${eventSingleCard.id}`, `Remove from favorite`);
            return;
          }
    

          
          

        });
      })
      .catch(er => {
        const myError = error({
          text: 'No matches for your query, try to enter correct data',
        });
      });
  }
}


