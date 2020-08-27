const options = require('./webpack.config.js')
const Compiler = require('./lib/compiler')

new Compiler(options).run()