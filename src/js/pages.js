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