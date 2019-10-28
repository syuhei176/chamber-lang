const peg = require('pegjs')

module.exports = function(src, pegSrc) {
  const parser = peg.generate(pegSrc)
  return parser.parse(src)
}
