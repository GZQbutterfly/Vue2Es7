// webpack开发环境配置
let webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    //ExtractTextPlugin = require('extract-text-webpack-plugin'),
    baseConfig = require('./webpack.base.config'),
    entry = require('./entry');


let webEntries = entry.getEntry('./src/page/app/*/index.js');
let cmsEntries = entry.getEntry('./src/page/cms/*/index.js');

baseConfig.entry = {
    ...webEntries.jsMap,
    ...cmsEntries.jsMap,
    'vue': ['vue' , 'vue-property-decorator', 'vue-class-component']
};

// 文件映射
baseConfig.devtool = 'source-map';


let appPages = webEntries.htmlMap;
let cmsPages = cmsEntries.htmlMap;

let pages = {...appPages, ...cmsPages}
for (let key in pages) {
    let pathname = pages[key];
    let conf = {
        filename: pathname,
        template: path.join(__dirname, '../src/page/index.tpl.html'),
        minify: {
            removeComments: true
        },
        inject: 'body',
        chunks: ['vue', key]
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    baseConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

baseConfig.plugins.push(
    // new HtmlWebpackPlugin({
    //
    // }),
    // new HtmlWebpackPlugin({
    //
    // }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vue'],
        minChunks: Infinity
    }),
    // new ExtractTextPlugin({
    //     filename: '[name].css',
    //     disable: false,
    //     allChunks: true,
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
);






module.exports = baseConfig;
