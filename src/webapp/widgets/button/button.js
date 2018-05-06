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
        $(document).pjax('a', '#container');
    }
}

export default button;