import EventApiService from './fetch-events.js';
import modalTemplate from '../templates/modal-card-details.hbs';

const api = new EventApiService();

const refs = {
  eventCards: document.querySelector('.events-list'),
  modalWindow: document.querySelector('#modal-card'),
  modalBtnClose: document.querySelector('.modal-box .modal__btn'),
  backdrop: document.querySelector('.backdrop'),
};

refs.eventCards.addEventListener('click', onEventCardClick);

refs.modalBtnClose.addEventListener('click', onCLicklBtnClose);
refs.backdrop.addEventListener('click', onClickBackdrop);

function onCLicklBtnClose() {
  refs.modalWindow.classList.toggle('is--hidden');
}

function onClickBackdrop(e) {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  refs.backdrop.classList.toggle('is--hidden');
}

function onEventCardClick(e) {
  const currentCard = e.target;
  if (!currentCard.closest('.events-list__item')) {
    return;
  }

  const eventSingleCard = currentCard.closest('.events-list__item');
  console.log(eventSingleCard);

  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN') {
    api.fetchModalDetails(eventSingleCard.id, eventSingleCard.dataset.type)
      .then(data => {
        console.log(data);
        // console.log(refs.modalWindow);
        // console.log(modalTemplate(data));

        refs.modalWindow.innerHTML = modalTemplate(data)
      })
      .catch(error => console.log(error));
    }
    refs.modalWindow.classList.toggle('is--hidden');
}
