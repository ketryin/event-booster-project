import ApiService from './fetch-events.js'

const paginationApi = new ApiService();
const formRef = document.querySelector('.events__search-form');
let arr;
function testApi(e) {
    if (e.target.nodeName === 'INPUT') {
        paginationApi.apiQuery = e.target.value;
    }

    paginationApi
        .fetchEvents()
        .then(data => arr = data._embedded.events)
        .then(data => console.log(data))
        
}

testApi(formRef);

const testDate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

$('.pagenumbers').pagination({
    dataSource: testDate,
    callback: function (data, pagination) {
        var html = template(testDate);
        $('#data-container').html(html);
    }
})

function template(data) {
    var html = '<ul>';
    $.each(data, function (index, item) {
        html += '<li>' + item + '</li>';
    });

    html += '</ul>';
    return html;
}

