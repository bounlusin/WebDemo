function HtmlInsertScriptPlugin(options) {
    // Configure your plugin with options...
}

HtmlInsertScriptPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', (compilation) => {
        console.log('The compiler is starting a new compilation...[html-insert-script-plugin]');

        compilation.plugin(
            'html-webpack-plugin-after-html-processing',
            (data, cb) => {
                //console.log(data.assets.js, data.assets.css);
                let scripts = '';
                let assets = '';
                data.assets.js.map(script => {
                    scripts += `<script type="text/javascript" src="${script}"></script>`;
                    let asset = {};
                    asset.path = script;
                    script = script.substring(script.lastIndexOf('/'));
                    let name = script.substring(1, script.indexOf('.'));
                    script = script.substring(script.indexOf('.') + 1);
                    let md5 = script.substring(1, script.indexOf('.'));
                    asset.name = name;
                    asset.md5 = md5 ? md5 : '';
                    assets += `{name: '${asset.name}', path: '${asset.path}', md5: '${asset.md5}'},`;
                });
                let styles = '';
                data.assets.css.map(style => {
                    styles += `<link href="${style}" rel="stylesheet">`;
                    let asset = {};
                    asset.path = style;
                    style = style.substring(style.lastIndexOf('/'));
                    let name = style.substring(1, style.indexOf('.'));
                    style = style.substring(style.indexOf('.') + 1);                    
                    let md5 = style.substring(1, style.indexOf('.'));
                    asset.name = name;
                    asset.md5 = md5 ? md5 : '';
                    assets += `{name: '${name}', path: '${asset.path}', md5: '${asset.md5}'},`;
                });
                assets = `[${assets}]`;
                // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', assets);
                // data.html = data.html.replace(/<!--script-->/g, scripts);
                // data.html = data.html.replace(/<!--link-->/g, styles);
                data.html = data.html.replace(/<!--asset-->/g, `<script type="text/javascript">assets = ${assets};</script>`);
            }
        )
    })
}

module.exports = HtmlInsertScriptPlugin;