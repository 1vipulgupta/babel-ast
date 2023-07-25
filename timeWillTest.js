/*  
    This Webpack loader looks for throw new Error("Failed Pattern Match ...") in the code and 
    replace it with throw new Error("PatternError")
*/

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const fs = require('fs');

function writeFile(data, file)
  { fs.writeFileSync
    ( file
    , data
    // , { encoding: "utf8"
    //   , flag: "a+"
    //   , mode: 0o666
    //   }
    )
  }


function replacePurescriptErrorLogs(source){
  try {
    const ast = parser.parse(source,{
      sourceType: "module"
    });
    // startingVal = parser.parse("const juspay_time = {}")
    // variableDec = startingVal.program.body
    // const replacementStatement = t.throwStatement(
    //   t.newExpression(t.identifier("Error"), [t.stringLiteral("PatternError")])
    // );
    // writeFile(JSON.stringify(ast))
    traverse(ast, {
      Program(path) {
        // console.log(path.node)
        // path.node.body = variableDec + path.node.body;
        writeFile(JSON.stringify(path.node), 'ast3.json')
      }
    });
    traverse(ast, {
      FunctionDeclaration(path) {
        writeFile(JSON.stringify(path.node), 'ast.json')
      }
    });
    traverse(ast, {
      BlockStatement(path) {
        writeFile(JSON.stringify(path.node), 'ast2.json')
      }
    });
    const modifiedCode = generator(ast).code;
    return modifiedCode;
  }
  catch(error){
    console.log("Failed to transform code " + error);
    return source;
  }
}

module.exports = function(source, map){
  this.callback(null, replacePurescriptErrorLogs(source), map);
}