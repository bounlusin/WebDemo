import $ from 'jquery';

class Return {
    constructor() {
        this.btn = $('#return');
    }

    init() {
        this.render();
        this.bind();
    }

    render() {

    }

    bind() {
        this.btn.click(() => {
            window.location.href = 'http://localhost:3000/';
        });
    }
}

export default Return;