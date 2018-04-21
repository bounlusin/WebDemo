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
            })
            .catch(error => {
                console.log(error);
            });
    });
});