const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: path.resolve("./loaders/debug.js")
                    },
                    {
                        loader: path.resolve("./loaders/capacitor.js")
                    }
                ]
            }
        ]
    }
});