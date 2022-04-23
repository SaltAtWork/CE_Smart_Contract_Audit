var fs = require('fs');
const parser = require('@solidity-parser/parser');
const content = fs.readFileSync('./Salt_SV_FP/test_fp2.sol');
const input = content.toString()
const ast = parser.parse(input, { range: true })
const stringSymbol = "[<>^]!~";
console.log('ast success\n')

try {
    //const result_json = JSON.stringify(ast, null, 4);
    fs.writeFile('Salt_SV_FP/test_fp2.json', JSON.stringify(ast, null, 4), function(err) {
        if (err) throw err;
        console.log('Updated');
    });
} catch (e) {}

const symbol = stringSymbol.split("");

parser.visit(ast, {
    PragmaDirective: (nodeInput) => {
        //console.log(nodeInput.value);
        for(var i = 0; i < symbol.length; i++){
            if(input.indexOf(symbol[i]) > 0){
                console.log("Detected floating pragma at range " + nodeInput.range);
                console.log("Detected Char = ",symbol[i]);
            }
        }
    }
});