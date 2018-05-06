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
        $(document).pjax('a', '#container');
    }
}

export default Return;