$(() => {
    $('#save').click(() => {
        let title = $('#title').val();
        let describe = $('#describe').val();
        let content = $('#content').val();
        axios.post('/save', {
                title: title,
                describe: describe,
                content: content,
            })
            .then(res => {
                console.log(res.data);
                if (res.data.state) {
                    console.log('更新成功');
                    window.location.href = window.location.origin + '/';
                }
            })
            .catch(error => {
                console.log(error);
            });
    });

    $('#return').click(() => {
        window.location.href = '/';
    });
});