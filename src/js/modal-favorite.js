const openFavModalBtn = document.querySelector('button[data-action="open-modal"]');
const closeFavModalMtn = document.querySelector('button[data-action="close-modal"]');
const backDropRef = document.querySelector('.js-backdrop');
const favList = document.querySelector('.fav-events-list');
const eventsListRef = document.querySelector('.js-list');
const paginationContainer = document.querySelector('.pagination')

openFavModalBtn.addEventListener('click', showModalHendler);
closeFavModalMtn.addEventListener('click', removeModalHendler);
backDropRef.addEventListener('click', onBackdropClick);

function showModalHendler() {
    // document.body.classList.add('show-modal');
    // window.addEventListener('keydown', onEscapePress);
    renderFavEvents();

}
// щоб зняти ESC треба винести його в окрему функцію

// function onEscapePress(event) {
//     if (event.code === 'Escape') {
//             removeModalHendler()
//         }
// }

function removeModalHendler() {
    document.body.classList.remove('show-modal');
    window.removeEventListener('keydown', onEscapePress)
}

function onBackdropClick(event) {
    // if (event.target === event.currentTarget) {
    //     // removeModalHendler()
    // }
}

function setUpCarrentFavoriteItems() {
    const savedCarrentFavoriteItems = localStorage.getItem('favoriteEventStorage');
    const storage = [{}];
    
    if (savedCarrentFavoriteItems === null) {
        localStorage.setItem('favoriteEventStorage', JSON.stringify(storage));
    }
}

setUpCarrentFavoriteItems();

function getEventsFromLocalStorage() {
    const currentStorage = localStorage.getItem('favoriteEventStorage');
    const parcedCurrentStorage = JSON.parse(currentStorage);
    // console.log(parcedCurrentStorage);
    return parcedCurrentStorage;
}

getEventsFromLocalStorage();

function loadData() {
    const parcedCurrentStorage = getEventsFromLocalStorage();
    const storage = parcedCurrentStorage.slice(1);
    const filteredStorage = Array.from(
        new Set(storage.map(({ id, name, date, location, src }) => JSON.stringify({ id, name, date, location, src }))),
        JSON.parse
    );
    
    initFavPagination(filteredStorage);
}

const pageSize = 8;

function initFavPagination(data) {
  $('#pagenumbers').pagination({
    ajax: function (options, refresh, $target) {
      Promise.resolve(data)
        .then(function (data) {
          let pageNumber = (options.current - 1);
          let total = data.length;
          let totalPage = Math.floor(total / pageSize);
          let offset = pageNumber * pageSize;
          let page = pageNumber < totalPage ? data.slice(offset, pageSize) : data.slice(offset);

          refresh({
            total: total,
            length: pageSize,
          });
          const insertData = page.map(el => {
            return `<li class="events-list__item animate__animated animate__bounceInUp" id="${el.id}" data-type="event">
                                <div class="for-hover">
                                    <img class="event-image" src="${el.src}" alt="name"></img>
                                    <span class="event-image-span"></span>
                                    <h2 class="event-name">${el.name}</h2>
                                    <p class="event-date"> ${el.date}  </p>
                                    <p class="event-location">${el.location}</p>
                                </div>
                                </li>`
          }).join('');
          eventsListRef.innerHTML = insertData;
        }).catch((error) => {
          console.log(error);
          paginationContainer.classList.add('hiden');
          eventsListRef.innerHTML = '';
        });
    }
  });
}

// function initFavPagination(data) {
//     $('#pagenumbers').pagination({
//         ajax: function (options, refresh, $target) {
//             Promise.resolve(data)
//                 .then(function (data) {
//                     let pageNumber = (options.current -1);
//                     let total = data.length;
//                     let totalPage = Math.floor(total / pageSize);
//                     let offset = pageNumber * pageSize;
//                     let page = pageNumber < totalPage ? data.slice(offset, pageSize) : data.slice(offset);
//                     refresh({
//                         total: total,
//                         length: pageSize,
//                     });
//                     const insertData = page.map(el => {
//                         return `<li class="events-list__item animate__animated animate__bounceInUp" id="${el.id}" data-type="event">
//                                 <div class="for-hover">
//                                     <img class="event-image" src="${el.src}" alt="name"></img>
//                                     <span class="event-image-span"></span>
//                                     <h2 class="event-name">${el.name}</h2>
//                                     <p class="event-date"> ${el.date}  </p>
//                                     <p class="event-location">${el.location}</p>
//                                 </div>
//                                 </li>`
//                     }).join('');
//                     eventsListRef.innerHTML = insertData;
//                 }).catch((error) => {
//                     console.log(error);
//                     paginationContainer.classList.add('hiden');
//                     eventsListRef.innerHTML = '';
//                 });
//         }
//     });
// }

export default function renderFavEvents() {
    loadData();
}



