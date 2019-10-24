const assert = require('assert')

const fs = require('fs')
const path = require('path')
const generator = require('../lib/index')

describe('generate', function() {
  describe('checkpoint.claim', function() {
    it('should generate solidity code', function(done) {
      const src = fs.readFileSync(
        path.join(__dirname, '../examples/checkpoint.claim')
      )
      const output = generator(src, 'sol')

      done()
    })
  })
})
