const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const package = require("./package.json");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: path.join("favicon.ico"),
            inject: true,
            hash: true,
            title: package.title
        })
    ]
};