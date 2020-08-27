module.exports = function(source) {
  console.log(source, this, this.query)
  return source.replace('kkb', 'sandstone')
}