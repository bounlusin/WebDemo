$(() => {
    axios.get('/getlist')
        .then(res => {
            console.log(res.data);
            if (res.data.state) {
                console.log("获取数据成功");
                let books = res.data.data;
                books.map(book => {
                    $('table').append(`<tr><td>${book.id}</td><td>${book.title}</td><td>${book.describe}</td><td>${book.update_time_at}</td><td data-id="${book.id}"><button data-type="edit" class="btn btn-sm btn-primary">编辑</button><button data-type="delete" class="btn btn-sm btn-danger">删除</button></td></tr>`);
                });

            } else {
                console.warn("获取数据失败");
            }
        })
        .catch(error => {
            console.warn(error);
        });

    $('#add').click(() => {
        window.location.href = '/form?action=add';
    });

    $('table').on('click', 'button[data-type=edit]', function() {
        let bookid = $(this).parent().attr('data-id');
        console.log('edit', bookid);
    });

    $('table').on('click', 'button[data-type=delete]', function() {
        let bookid = $(this).parent().attr('data-id');
        console.log('delete', bookid);
        axios.delete('/delete/' + bookid).then(res => {
            console.log("删除成功");
            $(this).closest('tr').remove();
        }).catch(error => {
            console.warn(error);
        })
    });
});