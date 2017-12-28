// webpack开发环境配置
let webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    baseConfig = require('./webpack.base.config');

baseConfig.module.rules.unshift({
    enforce: 'pre',
    test: /\.js$/,
    use: 'eslint-loader',
    exclude: /node_modules/,
    include: [path.join(__dirname, '../src/page')]
})



baseConfig.entry = {
    'web/main': [path.join(__dirname, '../src/page/web/index.js')],
    'cms/main': [path.join(__dirname, '../src/page/cms/index.js')],
    'static/lib/vue_mode': ['vue', 'vue-property-decorator', 'vue-class-component'],
    'static/lib/swiper': [path.join(__dirname, '../src/commons/assets/swiper/swiper.js')],
    'static/data/areas_data': [path.join(__dirname, '../src/commons/env/areas/areas_data.js')],
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
        chunks: ['static/data/areas_data', 'static/lib/vue_mode', 'web/main']
    }),
    new HtmlWebpackPlugin({
        filename: path.join(__dirname, '../dist/cms/index.html'),
        template: path.join(__dirname, '../src/page/cms/index.tpl.html'),
        minify: {
            removeComments: true
        },
        favicon: path.join(__dirname, '../src/page/favicon.ico'),
        inject: 'body',
        chunks: ['static/data/areas_data', 'static/lib/vue_mode', 'cms/main']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['static/lib/vue_mode', 'static/data/areas_data'],
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
