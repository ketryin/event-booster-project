const openFavModalBtn = document.querySelector('button[data-action="open-modal"]');
const closeFavModalMtn = document.querySelector('button[data-action="close-modal"]');
const backDropRef = document.querySelector('.js-backdrop');
const favList = document.querySelector('.fav-events-list');
const eventsListRef = document.querySelector('.js-list');

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


function createMarkupFav() {
    const parcedCurrentStorage = getEventsFromLocalStorage();
    const storage = parcedCurrentStorage.slice(1);
    const filteredStorage = Array.from(
        new Set(storage.map(({ id, name, date, location, src }) => JSON.stringify({ id, name, date, location, src }))),
        JSON.parse
    );
    
    const insertData = filteredStorage.map(el => {

       
            return `<li class="events-list__item animate__animated animate__bounceInUp" id="${el.id}" data-type="event">
                <div class="for-hover">
                    <img class="event-image" src="${el.src}" alt="name"></img>
                    <span class="event-image-span"></span>
                    <h2 class="event-name">${el.name}</h2>
                    <p class="event-date"> ${el.date}  </p>
                    <p class="event-location">${el.location}</p>
                </div>
                </li>`
        


    }).join(' ');

    return insertData;
}



export default function renderFavEvents() {
    const insertData = createMarkupFav();
    eventsListRef.innerHTML = insertData;
}



