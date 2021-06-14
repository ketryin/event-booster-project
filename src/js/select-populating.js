export default function (countries, select) {
  const markUp = countries.map(country => {
    return `<option value="${Object.keys(country)}">${Object.values(country)}</option>`;
  });
  select.insertAdjacentHTML('beforeend', markUp.join(''));
}
