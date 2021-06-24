import createError from './customAlert.js';

import EventApiService from './fetch-events.js';
import modalTemplate from '../templates/modal-card-details.hbs';
import onModalButtonMoreClick from './modal-button-more-fetch';
import filterBiggerImage from './filter-lagest-image.js';
import './favorite.js';
import renderFavEvents from './favorite.js';

const api = new EventApiService();

const favList = document.querySelector('.fav-events-list');
const favoriteStorageBtn = document.querySelector('.header-my-favorites-btn');

favoriteStorageBtn.addEventListener('click', onFavoriteStorageBtnClick)

function onFavoriteStorageBtnClick() {
  favoriteStorageBtn.setAttribute('on-fav-btn-click', true);

}


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
  clearTextContent('.modal__text');
  clearSrc('.modal-img-test');
  clearSrc('.modal__circle-img');
}

function clearTextContent(selector) {
  const modalInfoRefAll = document.querySelectorAll(selector);
  modalInfoRefAll.forEach(el => (el.textContent = ''));
}

function clearSrc(selector) {
  const modalSrcRef = document.querySelector(selector);
  modalSrcRef.src = '';
}

function onCLickBtnClose() {
  const btnRef = document.querySelector('[data-modal-window-close]');

  btnRef.addEventListener('click', () => {
    refs.modalWindow.classList.toggle('is--hidden');
    refs.body.classList.toggle('modal-open');
    clearTextContent('.modal__text');
    clearSrc('.modal-img-test');
    clearSrc('.modal__circle-img');
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
        // const modalRef = document.querySelector('.modal__window');

        refs.modalWindow.innerHTML = modalTemplate(data);

        onCLickBtnClose();

        
        const modalInfoRef = document.querySelector('.modal__text');
        const fullInfo = modalInfoRef.textContent;
        const cutInfo = `${modalInfoRef.textContent.slice(0, 150)}...`;
        modalInfoRef.innerHTML = `${cutInfo}`;
        
        
        const showMoreBtn = document.querySelector('.show-more');
        showMoreBtn.setAttribute('info', true);

        showMoreBtn.addEventListener('click', () => {
          
          if (showMoreBtn.hasAttribute('info')) {
            modalInfoRef.textContent = fullInfo;
            modalInfoRef.classList.add('active-show-more');
            showMoreBtn.textContent = 'show less';
            showMoreBtn.removeAttribute('info');
            return;
          }

          if (!showMoreBtn.hasAttribute('info')) {
            
            modalInfoRef.textContent = cutInfo;
            showMoreBtn.textContent = 'show more';
            showMoreBtn.setAttribute('info', true);

          }
  
        })
        
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


        const favoriteButton = document.querySelector('.favorite-button');
        favoriteButton.textContent =
          localStorage.getItem(`${eventSingleCard.id}`) || 'Add to favorite';
        if (favoriteButton.textContent === 'Remove from favorite') {
          favoriteButton.classList.add('actice-add-to-fav');
        }

        favoriteButton.addEventListener('click', () => {
          const eventContainer = document.querySelector(`[id='${eventSingleCard.id}']`);
          const location = eventContainer.querySelector('.event-location');

          const currentStorage = localStorage.getItem('favoriteEventStorage');
          const currentFavoriteEventOnStorage = JSON.parse(currentStorage);
          const filteredCurrentFavoriteEventOnStorage = Array.from(
            new Set(
              currentFavoriteEventOnStorage.map(({ id, name, date, location, src }) =>
                JSON.stringify({ id, name, date, location, src }),
              ),
            ),
            JSON.parse,
          );

          const indexOfEventToRemove = filteredCurrentFavoriteEventOnStorage
            .map(item => item.id)
            .indexOf(eventSingleCard.id);

          if (indexOfEventToRemove !== -1) {
            favoriteButton.classList.remove('actice-add-to-fav');
            filteredCurrentFavoriteEventOnStorage.splice(indexOfEventToRemove, 1);
            localStorage.setItem(
              'favoriteEventStorage',
              JSON.stringify(filteredCurrentFavoriteEventOnStorage),
            );
            favoriteButton.textContent = 'Add to favorite';
            localStorage.setItem(`${eventSingleCard.id}`, 'Add to favorite');


              if (!eventSingleCard.getAttribute('in-storage') && favoriteStorageBtn.hasAttribute('on-fav-btn-click')) {
                eventSingleCard.removeAttribute('in-storage');
                favoriteButton.setAttribute('disabled', true);
                favoriteButton.classList.add('actice-remove-to-fav');
                favoriteButton.textContent = 'removed';
                favoriteButton.removeAttribute('on-fav-btn-click')
                renderFavEvents();
                favoriteStorageBtn.setAttribute('on-fav-btn-click', true);
                }


            return;
          } else {
            eventSingleCard.setAttribute('in-storage', true);
            favoriteButton.textContent = 'Remove from favorite';
            favoriteButton.classList.add('actice-add-to-fav');
            filteredCurrentFavoriteEventOnStorage.push({
              id: eventSingleCard.id,
              name: data.name,
              date: data.dates.start.localDate,
              location: location.textContent,
              src: biggestImage.url,
            });
            localStorage.setItem(
              'favoriteEventStorage',
              JSON.stringify(filteredCurrentFavoriteEventOnStorage),
            );
            localStorage.setItem(`${eventSingleCard.id}`, `Remove from favorite`);
            return;
          }
        });
      })
      .catch(er => {
        createError('No matches for your query, try to enter correct data');
        // const myError = error({
        //   text: 'No matches for your query, try to enter correct data',
        // });
      });
  }
}
