const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        index: '200.html',
        historyApiFallback: {
            index: "/"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: {importLoaders: 1}},
                    { loader: 'postcss-loader' }
                ]
            }
        ]
    }
});