const ejs = require('ejs')
const parse = require('./parser')
const calculator = require('./cal')

function compile(src, templateSrc, pegSrc) {
  const result = parse(src.toString(), pegSrc)
  const interactiveNodes = calculator.calculateInteractiveNodes(result)

  const template = ejs.compile(templateSrc.toString(), {})
  console.log(interactiveNodes)

  const output = template({
    properties: interactiveNodes
  })
  return output
}

module.exports = {
  compile
}
