const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    example: path.resolve(__dirname, '../example'),
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    // html
    new HtmlWebpackPlugin({
      template: 'example/index.html',
      inject: true,
    }),
    // hot
    new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {}
        },
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.wasm', '.mjs', '.json']
  }
}