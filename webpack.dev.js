const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/client/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer : {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },  
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ],
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/client/views/index.html',
            filename: "index.html",
            title: 'Trip Planner'
        }),
    ]
}