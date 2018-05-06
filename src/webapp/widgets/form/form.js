import axios from 'axios';

class form {
    constructor() {
        this.save = $('#save');
    }

    init() {
        this.render();
        this.bind();
    }

    render() {

    }

    bind() {
        this.save.click((e) => {
            let title = $('#title').val();
            let describe = $('#describe').val();
            let content = $('#content').val();
            e.preventDefault();
            axios.post('/save', {
                    title: title,
                    describe: describe,
                    content: content,
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data.state){
                        console.log('保存成功');
                        $('#return').click();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

}

export default form;