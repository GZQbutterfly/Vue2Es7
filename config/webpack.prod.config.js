// webpack生产环境配置
let webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    baseConfig = require('./webpack.base.config');

baseConfig.entry = {
    'web/main': path.join(__dirname, '../src/page/web/index.js'),
    'cms/main': path.join(__dirname, '../src/page/cms/index.js'),
    'sys/env': [
        path.join(__dirname, '../src/commons/env/common.env.js'),
        path.join(__dirname, '../src/commons/env/base_vue/base.vue.js'),
        path.join(__dirname, '../src/commons/assets/swiper/swiper.js')
    ],
    'static/lib/vue_mode': [
        'vue', 'vue-property-decorator', 'vue-class-component'
    ],
    'static/lib/swiper': [path.join(__dirname, '../src/commons/assets/swiper/swiper.js')],
    'static/data/areas_data': [path.join(__dirname, '../src/commons/env/areas/areas_data.js')]
};


baseConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/page/web/index.tpl.html'),
        minify: {
            removeComments: true
        },
        favicon: path.join(__dirname, '../src/page/favicon.ico'),
        inject: 'body',
        chunks: ['static/data/areas_data', 'static/lib/vue_mode', 'sys/env', 'web/main']
    }),
    new HtmlWebpackPlugin({
        filename: path.join(__dirname, '../dist/cms/index.html'),
        template: path.join(__dirname, '../src/page/cms/index.tpl.html'),
        minify: {
            removeComments: true
        },
        favicon: path.join(__dirname, '../src/page/favicon.ico'),
        inject: 'body',
        chunks: ['static/data/areas_data', 'static/lib/vue_mode', 'sys/env', 'cms/main']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: [
            'static/lib/vue_mode', 'static/data/areas_data', 'sys/env'
        ],
        minChunks: Infinity
    }),
    new ExtractTextPlugin('[name].css'),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    // new UglifyJSPlugin({
    //     test: /\.js$/i
    // }),
    new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vue', 'common.env', 'areasData'],
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
);

module.exports = baseConfig;
