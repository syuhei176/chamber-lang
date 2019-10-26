const CodeMirror = require('codemirror')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/abcdef.css')
require('codemirror/theme/ttcn.css')
const OVMCompiler = require('../lib')

function main() {
  const codearea = document.getElementById('codearea')
  const solidity = document.getElementById('solidity')
  const messageDom = document.getElementById('message')
  const exampleSelectDom = document.getElementById('example-select')
  codearea.textContent = OVMCompiler.examples.checkpoint
  const inputArea = CodeMirror.fromTextArea(codearea, {
    lineNumbers: true,
    theme: 'ttcn'
  })
  const outputArea = CodeMirror.fromTextArea(solidity, {
    lineNumbers: true,
    theme: 'abcdef'
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
    inputArea.setValue(OVMCompiler.examples[exampleName])
  })
  function compile(instance) {
    const result = OVMCompiler.compile(instance.getValue(), 'sol')
    outputArea.setValue(result)
    messageDom.innerText = 'succeed'
  }
}

main()
