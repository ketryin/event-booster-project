import EventApiService from './fetch-events.js';
import modalTemplate from '../templates/modal-card-details.hbs';
import onModalButtonMoreClick from './modal-button-more-fetch';

const api = new EventApiService();

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
  // refs.modalWindow.innerHTML = '';
  refs.backdrop.classList.toggle('is--hidden');
  refs.body.classList.toggle('modal-open');
}

function onCLickBtnClose() {
  const btnRef = document.querySelector('[data-modal-window-close]');
  // refs.modalWindow.innerHTML = '';

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
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN') {
    api
      .fetchModalDetails(eventSingleCard.id, eventSingleCard.dataset.type)
      .then(data => {
        refs.modalWindow.innerHTML = modalTemplate(data);

        onCLickBtnClose();

        const modalTitleRef = document.querySelector('.modal__text');
        modalTitleRef.textContent = `${modalTitleRef.textContent.slice(0,150)}...`;
        console.log(modalTitleRef.textContent);


        const modalButtonMore = document.querySelector('.modal__btn__more');
        modalButtonMore.addEventListener('click', onModalButtonMoreClick);
        console.log(data.name);
      })
      .catch(error => console.log(error));
  }
}

