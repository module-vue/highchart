var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config');
var webpackBaseConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var envs = process.env.NODE_ENV.split('-');
var baseUrl = '';

if (envs[1] == 'offline') {
    baseUrl = 'http://0.0.0.0/';
} else if (envs[1] == 'dev') {
    baseUrl = 'http://0.0.0.0/';
} else if (envs[1] == 'test') {
    baseUrl = 'http://0.0.0.0/';
} else if (envs[1] == 'prod') {
    baseUrl = 'http://0.0.0.0/';
}

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        })
    ],
    devServer: {
        //port: 3000,
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        open: true,
        host: '0.0.0.0',
        useLocalIp: true,
        proxy: {
            '/api': {
                target: baseUrl,//设置你调用的接口域名和端口号 别忘了加http
                pathRewrite: {
                    '^/api': '/'//这里理解成用‘/apin’代替target里面的地址，后面组件中我们调接口时直接用api代替，比如我要
                }
            }
        }
    },
    devtool: '#eval-source-map'
});