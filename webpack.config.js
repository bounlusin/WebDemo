const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInsertScriptPlugin = require('./lib/html-insert-script-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const VIEWS_PATH = './src/webapp/views/';

module.exports = {
    entry: {
        index: path.join(__dirname, VIEWS_PATH, 'index/index.entry.js'),
        form: path.join(__dirname, VIEWS_PATH, 'form/form.entry.js'),
    },
    output: {
        path: path.join(__dirname, './build/assets/'),
        publicPath: './',
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'stylesheets/style.css',
        }),

        new HtmlWebpackPlugin({
            filename: '../views/index/pages/index.html',
            template: path.join(__dirname, VIEWS_PATH, 'index/pages/index.html'),
            inject: false,
            chunks: ["index"]
        }),

        new HtmlWebpackPlugin({
            filename: '../views/form/pages/form.html',
            template: path.join(__dirname, VIEWS_PATH, 'form/pages/form.html'),
            inject: false,
            chunks: ['form']
        }),

        new HtmlInsertScriptPlugin({

        }),

        new CopyWebpackPlugin([{
                from: path.join(__dirname, VIEWS_PATH, 'layout.html'),
                to: path.join(__dirname, '/build/views/layout.html'),
            },
            {
                from: path.join(__dirname, '/src/webapp/widgets/'),
                to: path.join(__dirname, '/build/widgets/'),
                ignore: ['*.js', '*.css']
            }, {
                from: path.join(__dirname, './pm2.json'),
                to: path.join(__dirname, './build/pm2.json')
            }, {
                from: path.join(__dirname, './package.json'),
                to: path.join(__dirname, './build/package.json')
            }
        ]),
    ]
}