const refs = {
  eventCards: document.querySelector('.events-list'),
  modalWindow: document.querySelector('#modal-card'),
  modalBtnClose: document.querySelector('[data-modal-window-close]'),
  backdrop: document.querySelector('[data-modal-backdrop]'),
  body: document.querySelector('body'),
};

refs.eventCards.addEventListener('click', onEventCardClick);

refs.modalBtnClose.addEventListener('click', onCLicklBtnClose);
refs.backdrop.addEventListener('click', onClickBackdrop);

function onCLicklBtnClose() {
  refs.modalWindow.classList.toggle('is--hidden');
  refs.body.classList.toggle('modal-open');
}

function onClickBackdrop(e) {
  if (!e.target.classList.contains('backdrop__modal')) {
    return;
  }
  refs.backdrop.classList.toggle('is--hidden');
  refs.body.classList.toggle('modal-open');
}

function onEventCardClick(e) {
  const currentCard = e.target;
  if (!currentCard.closest('.events-list__item')) {
    return;
  }
  refs.modalWindow.classList.toggle('is--hidden');
  refs.body.classList.toggle('modal-open')
}
