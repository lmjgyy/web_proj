const { getAst, getDependencies, getCode } = require("./parser");
const path = require('path');
const fs = require('fs')

class Compiler {
  constructor (options) {
    this.entry = options.entry;
    this.output = options.output;
    this.modules = []
  }
  run() {
    const info = this.build(this.entry)
    this.modules.push(info);

    for (let i = 0; i< this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.build(dependencies[j]))
        }
      }
    }
    let graph = {}
    this.modules.forEach(item => {
      graph[item.filename] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    this.generateCode(graph)
  }
  build(filename) {
    let ast = getAst(filename)
    let dependencies = getDependencies(ast, filename)
    let code = getCode(ast)
    console.log('ast', ast, '-----------------------------')
    console.log('dependencies', dependencies, '-----------------------------')
    console.log('code', code, '-----------------------------')
    return {
      filename,
      dependencies,
      code
    }
  }
  generateCode(code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const newCode = JSON.stringify(code)
    const bundle = `(function(graph){
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(localRequire, exports, graph[module].code);
        return exports;
      }
      require('${this.entry}')
    })(${newCode})`

    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}
module.exports = Compiler