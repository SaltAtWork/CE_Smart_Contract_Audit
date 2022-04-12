var fs = require('fs');
const parser = require('@solidity-parser/parser');
const content = fs.readFileSync('./Salt_SV_FP/test_sv.sol');
const input = content.toString()
const ast = parser.parse(input, { range: true })
console.log('ast success\n')

try {
    //const result_json = JSON.stringify(ast, null, 4);
    fs.writeFile('Salt_SV_FP/test_sv.json', JSON.stringify(ast, null, 4), function(err) {
        if (err) throw err;
        console.log('Updated');
    });
} catch (e) {}

parser.visit(ast, {
    StateVariableDeclaration: (nodeInput) => {
        if(nodeInput.variables[0].visibility == "default"){
            console.log("Detected at range " + nodeInput.range);
        }
    }
});