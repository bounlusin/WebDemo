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
            window.location.href = 'http://bounlusin.xyz/';
        });
    }
}

export default Return;