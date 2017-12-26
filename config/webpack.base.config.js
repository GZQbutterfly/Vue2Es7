// webpack基础配置
let webpack = require('webpack'),
    path = require('path'),
    //ExtractTextPlugin = require('extract-text-webpack-plugin'),
    //CopyWebpackPlugin = require('copy-webpack-plugin');
    CleanWebpackPlugin = require('clean-webpack-plugin');

// ==>
module.exports = {
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: ['./node_modules']
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'vue$': path.resolve(__dirname,'../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: [
        // new CopyWebpackPlugin([{
        //     from: path.join(__dirname, '../src/static'),
        //     to: path.join(__dirname, '../dist/static')
        // }]),
        new CleanWebpackPlugin(path.join(__dirname, '../dist'))
    ]
};
