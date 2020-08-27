const { resolve } = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, './loader/replaceLoader.js'),
        options: {
          name: 'loader1'
        }
      }
    ]
  }
}