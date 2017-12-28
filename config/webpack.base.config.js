// webpack基础配置
let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');


// ==>
module.exports = {
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: [path.join(__dirname, '../src/commons')],
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [path.join(__dirname, '../src/page'), path.join(__dirname, '../src/commons/env/base_vue')],
                exclude: /node_modules/
            }, {
                test: /\.(html|htm)$/,
                use: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader'
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|eot|woff)$/,
                use: ['url-loader?limit=8192&name=static/images/build/[name].[hash:8].[ext]'],
                include: [path.join(__dirname, '../src/page')],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'vue$': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js'),
            'common.env$': path.join(__dirname, '../src/commons/env/common.env.js'),
            'base.vue$': path.join(__dirname, '../src/commons/env/base_vue/base.vue.js')
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../src/static'),
                to: path.join(__dirname, '../dist/static')
            }
        ])
        // new CleanWebpackPlugin([
        //     '../dist/**/*.*', 'dist/manifest.*.js'
        // ], { 匹配删除的文件
        //     root: __dirname, 根目录
        //     verbose: true, 开启在控制台输出信息
        //     dry: true 启用删除文件
        // })
    ]
};
