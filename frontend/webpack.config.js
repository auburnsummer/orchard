const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Rhythm Café'
    })
  ],
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