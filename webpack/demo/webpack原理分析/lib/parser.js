const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require("@babel/core");

module.exports = {
  getAst: filename => {
    let content = fs.readFileSync(filename, 'utf-8')
    return parser.parse(content, {
      sourceType: 'module'
    })
  },
  getDependencies: (ast, filename) => {   
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration({node}) {
        const dirname = path.dirname(filename)
        const newPath = './src' + node.source.value.substr(1)
        dependencies[node.source.value] = newPath;
      }
    })
    return dependencies
  },
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    })
    return code
  }
}