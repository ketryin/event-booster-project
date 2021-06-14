export default function () {
  const loaderRef = document.querySelector('.spinner');
  loaderRef.classList.remove('opacity');
  loaderRef.innerHTML =
    '<span class="spinner-dot js-dot-firts"></span><span class="spinner-dot js-dot-second"></span><span class="spinner-dot js-dot-third"></span>';
  let interval = 0;
  let i = 0;
  const dots = loaderRef.children;
  for (const dot of dots) {
    setTimeout(createNewInterval, interval, dot);
    interval += 100;
  }

  function animateDots(number) {
    number.classList.toggle('opacity');
  }

  function createNewInterval(dot) {
    setInterval(animateDots, 300, dot);
  }
}
