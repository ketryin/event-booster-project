import ApiService from './fetch-events.js';
import cardTpl from './../templates/event-card.hbs';
import debounce from 'lodash.debounce';
import animateLoader from './show-loader';
import removeLoader from './remove-loader';

export default function handleFormChange(form, list, select, input, customSelect) {
  const api = new ApiService();

  input.addEventListener('input', debounce(handleInput, 1000));

  select.addEventListener('change', handleSelect);

  // form.addEventListener('change', handleFormChange);
  function handleFormChange(event) {
    event.preventDefault();
    if (event.target.nodeName === 'INPUT') {
      api.apiQuery = event.target.value;
    }
    if (event.target.nodeName === 'SELECT') {
      api.apiCountry = event.target.value;
    }
    populatePage();
  }

  function handleInput(event) {
    api.resetPage();
    animateLoader();
    if (event.target.value === '') {
      removeLoader();
      return;
    }
    api.apiQuery = event.target.value;
    populatePage();
  }

  function handleSelect() {
    api.resetPage();
    animateLoader();
    api.apiCountry = select.options[select.selectedIndex].value;
    populatePage();
  }

  function populatePage() {
    $('#pagenumbers').pagination({
      ajax: function (options, refresh, $target) {
        // debugger;
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
          .catch(error => {
            alert(error);

            form.reset();
            customSelect.setChoiceByValue('');
          })
          .finally(() => {
            removeLoader();
          });
      },
    });
  }
  populatePage();
}
