$('#demo').pagination({
    dataSource: '/user?page=1',
    locator: 'data',
    showGoInput: true,
    showGoButton: true,
    totalNumberLocator: function (response) {
        return response.total;
    },
    pageSize: 2,
    afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterPreviousOnClick: function (event, page) {
        console.log(page)
    },
    afterNextOnClick: function (event, page) {
        console.log(page)
    },
    afterGoButtonOnClick: function (event, page) {
        var html = template({ pageNumber: page });
        $('#container').html(html);
    }
})
function template(event) {
    console.log(event)
    return `<p>Trang hiện tại: ${event.pageNumber}</p>`;
}

function loadPage(page) {
    $('#content').html('') // xóa nội dung trước đó
    $.ajax({
        url: '/user?page=' + page,
        method: 'GET'
    })
        .then(data => {
            console.log(data.tongSoPage); // hiện thị tổng số trang nếu có

            // data.data là mảng chứa thông tin người dùng
            for (let i = 0; i < data.data.length; i++) {
                const element = data.data[i];
                var item = $(`<h3>${element.username}</h3>`)
                $('#content').append(item)  // thêm thông tin người dùng vào #content
            }
            console.log(data.data)
        })
        .catch(err => {
            console.log(err)
        })
}

loadPage(1) // load trang đầu tiên  