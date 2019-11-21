
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    core: path.resolve(__dirname, '../src')
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../lib')
  },
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
  },
  externals: {
    react: 'React',
  }
}