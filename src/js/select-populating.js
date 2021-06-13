export default function (countries) {
  const selectRef = document.querySelector('#country-select');

  const markUp = countries.map(country => {
    return `<option value="${Object.keys(country)}">${Object.values(country)}</option>`;
  });
  selectRef.insertAdjacentHTML('beforeend', markUp.join(''));
}