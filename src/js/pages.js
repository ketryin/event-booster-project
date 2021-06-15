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
console.log(arr)
testApi(formRef);

$('.pagenumbers').pagination({
    dataSource: arr,
    callback: function (data, pagination) {
        var html = template(arr);
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

