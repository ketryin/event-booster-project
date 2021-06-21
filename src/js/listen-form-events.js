import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';
import filterBiggerImage from './filter-lagest-image.js';

const paginationContainer = document.querySelector('#pagenumbers');

export default function handleFormChange(form, list, select, input) {
  const api = new ApiService();

  select.addEventListener('change', handleSelect);
  form.addEventListener('submit', handleFormChange);

  function handleFormChange(event) {
    animateLoader();
    event.preventDefault();
    api.apiQuery = input.value;
    handleFetch();
  }

  function handleSelect() {
    animateLoader();
    api.apiCountry = select.value;

    handleFetch();
  }

  function handleFetch() {
    api.resetPage();
    initPagination()
  }

  function populatePage() {
    animateLoader();
    initPagination();
  }


  function initPagination() {
      $('#pagenumbers').pagination({
      ajax: function (options, refresh, $target) {
        api.page = options.current - 1;
        api
          .fetchEvents()
          .then(function (data) {
            refresh({
              total: data.page.totalElements,
              length: data.page.size,
            });
            const insertData = data._embedded.events.map(event => {
              const eventImage = filterBiggerImage(event.images);
              event.images = [eventImage];

              paginationContainer.classList.remove('hiden');
              return cardTpl(event);
            });
            list.innerHTML = insertData.join('');
          })
          .catch(error => {
            alert("По вашему запросу ничего не найдено")
            paginationContainer.classList.add('hiden');
            list.innerHTML = '';
          })
          .finally(() => {
            removeLoader();
          });
      },
    });
  }

  populatePage();
}
