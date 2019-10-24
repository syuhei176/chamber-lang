const fs = require('fs')
const path = require('path')
const peg = require('pegjs')
const psrc = require('./chamber.txt')

module.exports = function(src) {
  console.log(psrc)
  const parser = peg.generate(psrc)
  return parser.parse(src)
}
