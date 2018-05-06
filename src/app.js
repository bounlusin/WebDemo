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
const swig = require('swig');
const cheerio = require('cheerio');
const fs = require("fs");

// 引入静态资源
app.use(serve(path.join(__dirname, './assets')));

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
const PHP_BASE_URL = 'http://bounlusin.xyz:2000/api/';
const action_config = {
    'add': '添加',
    'edit': '保存'
};
app.use(router(_ => {
    _.get('/', async(ctx, next) => {
        ctx.body = await ctx.render('./index/pages/index.html', {
            username: 'koa'
        });
    });

    _.get('/index', async(ctx, next) => {
        if (!ctx.request.header['x-pjax']) {
            //console.log('get');
            ctx.body = await ctx.render('./index/pages/index.html', {
                username: 'koa'
            });
        } else {
            //console.log('pjax');
            //console.log(ctx.request.header);
            let selector = ctx.request.header['x-pjax-container'];
            let html = get_html('./index/pages/index.html', selector, {
                username: 'koa'
            });
            ctx.body = html;
        }
    });

    _.get('/getList', async(ctx, next) => {
        ctx.body = await axios.get(PHP_BASE_URL + 'books.php').then(res => {
            //console.log(res.data);
            return res.data;
        });
    });

    _.get('/form', async(ctx, next) => {
        let action = ctx.query.action;
        let _action = action_config[action];
        if (!ctx.request.header['x-pjax']) {
            //console.log('get');
            ctx.body = await ctx.render('./form/pages/form.html', {
                action: _action
            });
        } else {
            // console.log('pjax');
            // console.log(ctx.request.header);
            let selector = ctx.request.header['x-pjax-container'];
            let html = get_html('./form/pages/form.html', selector, {
                action: _action
            })
            ctx.body = html;
        }
    });

    _.post('/save', async(ctx, next) => {
        //console.log('到了node路由');
        ctx.body = await axios.post(PHP_BASE_URL + 'book.php', qs.stringify(ctx.request.body)).then(res => {
            console.log(res.data);
            return res.data;
        });
    });

    _.delete('/delete/:bookid', async(ctx, next) => {
        console.log("node删除" + ctx.params.bookid);
        ctx.body = await axios.delete(PHP_BASE_URL + '/book.php', { bookId: ctx.params.bookid }).then(res => {
            console.log(res.data);
            return res.data;
        });
    });
}));

function get_html(_path, selector, options) {
    let template = swig.compileFile(path.join(__dirname, './views', _path));
    let rendered = template(options);

    let $ = cheerio.load(rendered);
    console.log(rendered);
    let scripts = rendered.match(/<script type="text\/javascript">[\s\S]+?<\/script>/g);
    let styles = rendered.match(/<link href=[\s\S]+? rel="stylesheet">/g);
    let html = $(selector).html();
    scripts.map(script => {
        html += script;
    })
    //console.log(rendered);
    // styles.map(style => {
    //     let first = style.indexOf('href=') + 6;
    //     let src = style.substring(first);
    //     let last = src.indexOf('\"');
    //     src = src.substring(0, last);
    //     src = path.join(__dirname, './assets', src);
    //     let data = fs.readFileSync(src, "utf-8");
    //     html = html + `<style type="text/css">${data}</style>`;
    // });
    // scripts.map(script => {
    //     let first = script.indexOf('src=') + 5;
    //     let src = script.substring(first);
    //     let last = src.indexOf('\"');
    //     // src = src.substring(0, last);
    //     // let _path = path.join(__dirname, './assets', src);
    //     // src = src.substring(src.lastIndexof('/'));
    //     // first = src.indexOf('_');
    //     // last = src.indexOf('.');
    //     // const asset = {};
    //     // asset.name = src.substring(0, first);
    //     // asset.md5 = src.substring(first + 1, last);
    //     // asset.path = _path;
    //     // console.log(asset);
    //     //let data = fs.readFileSync(path.join(__dirname, './assets', src), "utf-8");
    //     //html = html + `<script type="text/javascript">cacheManager.get_asset(${asset})</script>`;
    // });

    console.log(html);
    return html;
}

// 启动服务 监听80端口
app.listen(8000, () => {
    console.log('server is started..');
});