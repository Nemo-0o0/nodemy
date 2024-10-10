function loadPage(page) {
    currentPage = page;

    $.get(`/user?page=${page}`)
        .then(data => {
            $('#content').empty();  // Clear content once before appending

            data.forEach(user => {
                $('#content').append(`
                    <h1>${user.username} : ${user.password}</h1>
                `);
            });
        })
        .catch(() => console.error('API error'));
}

function nextPage() {
    loadPage(++currentPage);
}

function prevPage() {
    loadPage(--currentPage);
}
