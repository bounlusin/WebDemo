const Koa = require('koa');
const router = require('koa-simple-router');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');
const koaBody = require('koa-body');
const co = require('co');
const axios = require('axios');
const qs = require('qs');
const app = new Koa();

// 引入静态资源
app.use(serve(path.join(__dirname, './public')));

// 解析request body
app.use(koaBody());

// 模板配置
app.context.render = co.wrap(render({
    root: path.join(__dirname, './views'),
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    writeBody: false,
}));

// 路由
const PHP_BASE_URL = 'http://47.104.241.201:2000/api/';
const action_config = {
    'add': '添加',
    'edit': '保存'
};
app.use(router(_ => {
    _.get('/', async(ctx, next) => {
        ctx.body = await ctx.render('index.html', {
            username: 'koa'
        });

    });

    _.get('/getList', async(ctx, next) => {
        ctx.body = await axios.get(PHP_BASE_URL + 'books.php').then(res => {
            //console.log(res.data);
            return res.data;
        });
    });

    _.get('/form', async(ctx, next) => {
        let action = ctx.query.action;
        _action = action_config[action];
        ctx.body = await ctx.render('form.html', {
            action: _action
        });
    });

    _.post('/save', async(ctx, next) => {
        //console.log('到了node路由');
        ctx.body = await axios.post(PHP_BASE_URL + 'book.php', qs.stringify(ctx.request.body)).then(res => {
            console.log(res.data);
            return res.data;
        });
    });

    _.delete('/delete/:bookid', async(ctx, next) => {
        //console.log("node删除" + ctx.params.bookid);
        ctx.body = await axios.delete(PHP_BASE_URL + '/book.php', { bookId: ctx.params.bookid }).then(res => {
            console.log(res.data);
            return res.data;
        });
    });
}));

// 启动服务 监听3000端口
app.listen(3000, () => {
    console.log('serve is started..');
});