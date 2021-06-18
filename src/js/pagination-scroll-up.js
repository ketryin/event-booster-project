const paginationContainer = document.querySelector('#pagenumbers');
paginationContainer.addEventListener('click', scrollUp);
function scrollUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}