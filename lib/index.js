const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const compiler = require('./compiler')
const solTemplate = require('../lib/sol.txt')

function getTemplateSource(ext) {
  if (ext == 'sol') {
    return solTemplate
  }
}

module.exports = function(src, ext) {
  const templateSrc = getTemplateSource(ext)
  const result = compiler(src.toString())

  console.log(result)
  const template = ejs.compile(templateSrc.toString(), {})
  const output = template({
    claim: result
  })
  return output
}
