import $ from 'jquery';
const buttoncss = require('./button.css');

class button {
    constructor(text) {
        this.text = text;
        this.button = $('#add');
    }

    init() {
    	this.render();
    	this.bind();
    }

    render() {

    }

    bind() {
        this.button.click(() => {
            window.location.href = 'http://bounlusin.xyz/form?action=add';
        });
    }
}

export default button;