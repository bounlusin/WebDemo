$(() => {
    axios.get('/getlist')
        .then(res => {
            console.log(res.data);
            if (res.data.state) {
                console.log("获取数据成功");
                let books = res.data.data;
                books.map(book => {
                    $('table').append(`<tr><td>${book.id}</td><td>${book.title}</td><td>${book.describe}</td><td>${book.update_time_at}</td><td></td></tr>`);
                });

            } else {
                console.log("获取数据失败");
            }
        })
        .catch(error => {
            console.log(error);
        });

    $('#add').click(() => {
    	window.location.href = '/form?action=add';
    });
});