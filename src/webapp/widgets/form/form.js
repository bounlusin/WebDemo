import axios from 'axios';
import $ from 'jquery';

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
        this.save.click(() => {
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
    }

}

export default form;