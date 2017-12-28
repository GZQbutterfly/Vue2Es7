// webpack开发环境配置
let webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    baseConfig = require('./webpack.base.config');


baseConfig.entry = {
    'web/main': [path.join(__dirname, '../src/page/web/index.js')],
    'cms/main': [path.join(__dirname, '../src/page/cms/index.js')],
    'static/lib/vue-mode': ['vue' , 'vue-property-decorator', 'vue-class-component']
};

// 文件映射
baseConfig.devtool = 'source-map';

// 插件
baseConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/page/web/index.tpl.html'),
        minify: {
            removeComments: true
        },
        favicon: path.join(__dirname, '../src/page/favicon.ico'),
        inject: 'body',
        chunks: ['static/lib/vue-mode', 'web/main']
    }),
    new HtmlWebpackPlugin({
        filename: path.join(__dirname, '../dist/cms/index.html'),
        template: path.join(__dirname, '../src/page/cms/index.tpl.html'),
        minify: {
            removeComments: true
        },
        favicon: path.join(__dirname, '../src/page/favicon.ico'),
        inject: 'body',
        chunks: ['static/lib/vue-mode', 'cms/main']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['static/lib/vue-mode'],
        minChunks: Infinity
    }),
    new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
);

module.exports = baseConfig;
