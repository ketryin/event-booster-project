/**
 * Значення запиту по ключовому слову: екземпляр_класу.apiQuery = '...'
 * Значення запиту по ключовому країні: екземпляр_класу.apiCountry = '...'
 * Запит: екземпляр_класу.fetchEvents()
 * Кожний успішний запит з такими самими параметрами завантажує наступну сторінку з 20 елементами
 * скинути сторінку до першої: екземпляр_класу.resetPage()
 */

export default class EventApiService {
  #CONSUMER_KEY = '21thx8JLVbOdavwqxpr1UpomSd3AvkEA';
  #BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

  constructor() {
    this.searchEventByKeywordQuery = '';
    this.searchCountryQuery = '';
    this.page = 0;
  }

  fetchEvents() {
    const url = `${this.#BASE_URL}events.json?page=${this.page}&size=20&keyword=${
      this.searchEventByKeywordQuery
    }&countryCode=${this.searchCountryQuery}&apikey=${this.#CONSUMER_KEY}`;

    return fetch(url).then(responce => {
      console.log(responce);
      return responce.json()
    });
  }
  fetchPopular() {
    const url = `${this.#BASE_URL}attractions.json?apikey=${this.#CONSUMER_KEY}`;
    return fetch(url).then(responce => {
      console.log(responce);
      return responce.json()
    });
  }

  fetchModalDetails(id, type) {
    console.log(id);
    const url = `${this.#BASE_URL}${type}s/${id}.json?apikey=${this.#CONSUMER_KEY}`;
    return fetch(url).then(responce => responce.json());
  }

  incrementPage() {
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
}
