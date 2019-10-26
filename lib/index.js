const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const compiler = require('./compiler')
const solTemplate = require('./sol.txt')
const checkpoint = require('../examples/checkpoint.txt')
const exit = require('../examples/exit.txt')
const ownership = require('../examples/ownership.txt')
const swap = require('../examples/swap.txt')
const order = require('../examples/order.txt')

function getTemplateSource(ext) {
  if (ext == 'sol') {
    return solTemplate
  }
}

function compile(src, ext) {
  const templateSrc = getTemplateSource(ext)
  const result = compiler(src.toString())

  console.log(result)
  const template = ejs.compile(templateSrc.toString(), {})
  const output = template({
    claim: result[0]
  })
  return output
}

module.exports = {
  compile,
  examples: {
    checkpoint,
    exit,
    ownership,
    swap,
    order
  }
}
