const refs = {
    btnOpenModalAuthentication: document.querySelector('.btn-authentication'),
    btnClose: document.querySelector('[data-modal-window-close-authentication]'),
    backdrop: document.querySelector('[data-modal-backdrop-authentication]'),
};

refs.btnOpenModalAuthentication.addEventListener('click', onBtnAuthenticationClick);
refs.backdrop.addEventListener('click', onClickBackdrop);
refs.btnClose.addEventListener('click', onClickBtnClose);

function onBtnAuthenticationClick() {
    refs.backdrop.classList.add('is--open');
}
function onClickBackdrop(evt) {
    if (evt.currentTarget === evt.target) {
      onClickBtnClose();
    }
}
function onClickBtnClose() {
    refs.backdrop.classList.remove('is--open');
}