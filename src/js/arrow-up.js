const arrowBtnEL = document.querySelector('#btn-arrow-up-js');
arrowBtnEL.addEventListener('click', scrollUp);
function scrollUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
window.addEventListener('scroll', scrollDown);

function scrollDown() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        arrowBtnEL.classList.remove('is--hiden--btn');
    }
    else {
        arrowBtnEL.classList.add('is--hiden--btn');
    }
}