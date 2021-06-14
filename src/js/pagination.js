const listItems = ['<li>"Item 1"</li>',
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
    "Item 23",
    "Item 24",
    "Item 25",
    "Item 26",
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
    "Item 16",
    "Item 17",
    "Item 18",
    "Item 19",
    "Item 20",
    "Item 21",
    "Item 22",
    "Item 23",
    "Item 24",
    "Item 25",
    "Item 26",
];

const listElement = document.querySelector(".events-list");
const paginationElement = document.getElementById("pagination");

let currentPage = 1
let rows = 20;

function DisplayList(items, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rowsPerPage * rows;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++){
        let item = paginatedItems[i];
        let itemElement = document.createElement('li');
        itemElement.classList.add('events-list__item');
        itemElement.innerText = item
        wrapper.appendChild(itemElement);
    }
}

function SetupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < pageCount + 1; i++){
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn)
    }
}

function PaginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage === page) button.classList.add('active');

    button.addEventListener('click', function () {
        currentPage = page;
        DisplayList(items, listElement, rows, currentPage);

        let currentBtn = document.querySelector('pagenumbers button.active');
        currentBtn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}


// Необходимо получить рендер карточек для продолжения работы

// DisplayList(listItems, listElement, rows, currentPage);
// SetupPagination(listItems, paginationElement, rows)