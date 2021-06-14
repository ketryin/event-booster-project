const formRef = document.querySelector('.events__search-form');

formRef.addEventListener('change', event => {
  event.preventDefault();

  if (event.target.nodeName === 'INPUT') {
    const apiQuery = event.target.value;
    console.log('API Query: ', apiQuery);
  }
  if (event.target.nodeName === 'SELECT') {
    const apiCountry = event.target.value;
    console.log('API country name: ', apiCountry);
  }
});
