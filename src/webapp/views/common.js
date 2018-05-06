class CacheManager {
    constructor() {
        this.assets_map = {
            style: { type: 'css', id: 'css_sytle', name: 'style' },
            index: { type: 'js', id: 'js_index', name: 'index' },
            form: { type: 'js', id: 'js_form', name: 'form' },
        }
        localforage.setDriver(localforage.LOCALSTORAGE);
    }

    get_asset(asset) {
        let options = this.assets_map[asset.name];
        localforage.getItem(options.name).then(__asset => {
            if (__asset) {
                console.log('本地有缓存资源', __asset);
                if (__asset == asset.name + '_' + asset.md5) {
                    console.log('缓存资源可用');

                    localforage.getItem(__asset).then(content => {
                        this.set_asset(options, content);
                    });
                } else {
                    localforage.removeItem(__asset).then(() => {
                        console.log('删除之前版本文件成功');
                    }).catch(err => {
                        console.log('删除localstorage出错', err);
                    });
                    console.log('缓存资源过期');
                    this.get_asset_from_origin(options, asset);
                }
            } else {
                this.get_asset_from_origin(options, asset);
            }
        });

    }

    get_asset_from_origin(options, asset) {
        $.ajax({
                url: asset.path,
                type: 'GET',
                async: false,
            })
            .done(res => {
                console.log("获取新资源成功");
                //console.log(res);
                localforage.setItem(asset.name, asset.name + '_' + asset.md5);
                localforage.setItem(asset.name + '_' + asset.md5, res);
                this.set_asset(options, res);
            })
            .fail(() => {
                console.log("error");
            })
            .always(() => {
                console.log("complete");
            });
    }

    set_asset(options, content) {
        if (options.type == 'js') {
            let ele = document.getElementById(options.id);
            if (ele) ele.remove();
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.id = options.id;
            script.appendChild(document.createTextNode(content));
            document.body.appendChild(script)
        } else if (options.type == 'css') {
            let ele = document.getElementById(options.id);
            if (ele) ele.remove();
            let head = document.getElementsByTagName('HEAD').item(0);
            let style = document.createElement('style');
            style.id = options.id;
            style.type = 'text/css';
            style.appendChild(document.createTextNode(content));
            head.appendChild(style);
        }
    }

}

const cacheManager = new CacheManager();