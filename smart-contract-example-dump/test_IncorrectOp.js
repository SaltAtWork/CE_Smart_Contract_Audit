var fs = require('fs');
const parser = require('@solidity-parser/parser');
const content = fs.readFileSync('./Salt_TestCase/test_incorrectOperator2.sol');
const input = content.toString()
const ast = parser.parse(input, { range: true })
console.log('ast success\n')

try {
    //const result_json = JSON.stringify(ast, null, 4);
    fs.writeFile('Salt_TestCase/test_incorrectOperator2.json', JSON.stringify(ast, null, 4), function(err) {
        if (err) throw err;
        console.log('Updated');
    });
} catch (e) {}

parser.visit(ast, {
    BinaryOperation: (nodeBiOp) => {
        if(nodeBiOp.right.type == "UnaryOperation"){
            console.log("Operator typo detected at " + nodeBiOp.range);
        }
    }
});