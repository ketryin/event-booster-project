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
  refs.modalWindow.classList.toggle('is--hidden');
}
