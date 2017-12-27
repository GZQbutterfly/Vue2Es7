// webpack基础配置
let webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    //CopyWebpackPlugin = require('copy-webpack-plugin');
    CleanWebpackPlugin = require('clean-webpack-plugin');

// ==>
module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, '../src')],
                exclude: ['../node_modules']
            }, {
                test: /\.(html|htm)$/,
                use: 'raw-loader'
            }, {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader', 'postcss-loader', 'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(png|svg|jpg|gif|eot|woff)$/,
                use: ['url-loader?limit=8192&name=static/images/build/[name].[hash:8].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'vue$': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: [// new CopyWebpackPlugin([{
        //     from: path.join(__dirname, '../src/static'),
        //     to: path.join(__dirname, '../dist/static')
        // }]),
        // new CleanWebpackPlugin([
        //     '../dist/**/*.*', 'dist/manifest.*.js'
        // ], { //匹配删除的文件
        //     root: __dirname, //根目录
        //     verbose: true, //开启在控制台输出信息
        //     dry: true //启用删除文件
        // })
        ]
};
