/**
 * Значення запиту по ключовому слову: екземпляр_класу.apiQuery = '...'
 * Значення запиту по ключовому країні: екземпляр_класу.apiCountry = '...'
 * Запит: екземпляр_класу.fetchEvents()
 * Кожний успішний запит з такими самими параметрами завантажує наступну сторінку з 20 елементами
 * скинути сторінку до першої: екземпляр_класу.resetPage()
 */

export default class EventApiService {
  #MAX_ELEMENTS = 1000;
  #PAGE_SIZE = 20;
  #CONSUMER_KEY = '21thx8JLVbOdavwqxpr1UpomSd3AvkEA';
  #BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

  constructor() {
    this.searchEventByKeywordQuery = '';
    this.searchCountryQuery = '';
    this.page = 0;
  }

  fetchEvents() {
    const url = `${this.#BASE_URL}events.json?page=${this.page}&size=${this.#PAGE_SIZE}&keyword=${
      this.searchEventByKeywordQuery
    }&countryCode=${this.searchCountryQuery}&apikey=${this.#CONSUMER_KEY}`;

    return fetch(url).then(response => {
      console.log(response);
      return response.json().then(this.normalizeEventsListResponse.bind(this));
    });
  }

  fetchModalDetails(id, type) {
    // console.log(id);
    const url = `${this.#BASE_URL}${type}s/${id}.json?apikey=${this.#CONSUMER_KEY}`;
    return fetch(url).then(response => response.json());
  }

  incrementPage() {
    if (this.page + 1 > this.getMaxPage()) {
      return;
    }
    
    this.page += 1;
  }

  resetPage() {
    this.page = 0;
  }

  set apiQuery(newApiQuery) {
    this.searchEventByKeywordQuery = newApiQuery;
  }

  get apiQuery() {
    return this.searchEventByKeywordQuery;
  }

  set apiCountry(newApiCountry) {
    this.searchCountryQuery = newApiCountry;
  }

  get apiQuery() {
    return this.searchCountryQuery;
  }
  
  getMaxPage() {
    return this.#MAX_ELEMENTS / this.#PAGE_SIZE - 1;
  }

  normalizeEventsListResponse(jsonResponse) {
    const maxPage = this.getMaxPage();

    jsonResponse.page.totalPages = jsonResponse.page.totalPages < maxPage
      ? jsonResponse.page.totalPages : maxPage;
    jsonResponse.page.totalElements = jsonResponse.page.totalElements < this.#MAX_ELEMENTS
      ? jsonResponse.page.totalElements : this.#MAX_ELEMENTS;

    return jsonResponse;
  }
}
