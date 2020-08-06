const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
              ]
          },
          {
            test: /\.m?jsx?$/,
            exclude: /(node_modules|bower_components)/,
            resolve: { extensions: [".js", ".jsx"] },
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                "file-loader"
            ]
          }
      ]
  }
};