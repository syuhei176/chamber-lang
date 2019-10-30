const CodeMirror = require('codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/python/python')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/abcdef.css')
require('codemirror/theme/ttcn.css')

const pegSrc = require('../lib/chamber.txt')
const solTemplate = require('../lib/sol.txt')
const OVMCompiler = require('../lib')

const checkpoint = require('../examples/checkpoint.txt')
const exit = require('../examples/exit.txt')
const ownership = require('../examples/ownership.txt')
const swap = require('../examples/swap.txt')
const order = require('../examples/order.txt')
const examples = {
  checkpoint,
  exit,
  ownership,
  swap,
  order
}

function main() {
  const codearea = document.getElementById('codearea')
  const solidity = document.getElementById('solidity')
  const messageDom = document.getElementById('message')
  const exampleSelectDom = document.getElementById('example-select')
  codearea.textContent = examples.checkpoint
  const inputArea = CodeMirror.fromTextArea(codearea, {
    lineNumbers: true,
    theme: 'ttcn',
    mode: 'python'
  })
  const outputArea = CodeMirror.fromTextArea(solidity, {
    lineNumbers: true,
    theme: 'abcdef',
    readOnly: true,
    mode: 'javascript'
  })
  inputArea.on('change', function(instance) {
    try {
      compile(instance)
    } catch (e) {
      console.error(e)
      messageDom.innerText = 'parse error'
    }
  })
  compile(inputArea)
  exampleSelectDom.addEventListener('change', e => {
    const exampleName = e.target.value
    inputArea.setValue(examples[exampleName])
  })
  function compile(instance) {
    const result = OVMCompiler.compile(instance.getValue(), solTemplate, pegSrc)
    outputArea.setValue(result)
    messageDom.innerText = 'succeed'
  }
}

main()
