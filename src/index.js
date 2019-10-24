const CodeMirror = require('codemirror')
require('codemirror/lib/codemirror.css')
require('codemirror/theme/abcdef.css')
require('codemirror/theme/ttcn.css')
const claimCompile = require('../lib')

function main() {
  const codearea = document.getElementById('codearea')
  const solidity = document.getElementById('solidity')
  const messageDom = document.getElementById('message')
  codearea.textContent =
    'checkpoint(B, C) := \n' +
    'for all b such that B:\n' +
    '  for all su such that C:\n' +
    '    IsDeprecated(su)\n'
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
      messageDom.innerText = 'parse error'
    }
  })
  compile(inputArea)
  function compile(instance) {
    const result = claimCompile(instance.getValue(), 'sol')
    outputArea.setValue(result)
    messageDom.innerText = 'succeed'
  }
}

main()
