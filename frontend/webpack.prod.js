const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    //{ loader: path.resolve("./loaders/debug.js") },
                    { loader: 'css-loader', options: {importLoaders: 1}},
                    { loader: 'postcss-loader' },
                ]
            }
        ]
    }
});