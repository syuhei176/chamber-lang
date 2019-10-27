const ejs = require('ejs')
const compiler = require('./compiler')

function compile(src, templateSrc, pegSrc) {
  const result = compiler(src.toString(), pegSrc)

  const template = ejs.compile(templateSrc.toString(), {})
  const output = template({
    claim: result[0]
  })
  return output
}

module.exports = {
  compile
}
