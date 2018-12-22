const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const compiler = require('./compiler');


module.exports = function(src, ext) {
  const solTemplate = fs.readFileSync(path.join(__dirname, `../lib/${ext}.ejs`));
  const result = compiler(src.toString());

  console.log(result)

  const template = ejs.compile(solTemplate.toString(), {});
  const output = template({
    contract: result
  });
  console.log(output);
  return output;  
}
