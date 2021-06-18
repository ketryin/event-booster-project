import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';

export default function handleFormChange(form, list, select, input) {
  const api = new ApiService();

  // select.addEventListener('change', handleSelect);
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
    api
      .fetchEvents()
      .then(data => {
        list.innerHTML = cardTpl(data._embedded.events);
      })
      .catch(error => {
        alert(error);
        list.innerHTML = '';
      })
      .finally(removeLoader);
  }

  function populatePage() {
    animateLoader();
    api.searchCountryQuery = 'DK';

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
            list.innerHTML = cardTpl(data._embedded.events);
          })
          .catch(alert)
          .finally(() => {
            removeLoader();
          });
      },
    });
  }

  populatePage();
}
