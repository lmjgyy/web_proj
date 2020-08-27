const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    }
}