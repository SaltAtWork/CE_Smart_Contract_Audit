var fs = require('fs');
const parser = require('@solidity-parser/parser');
const content = fs.readFileSync('./Salt_TestCase/test_weakRandom.sol');
const input = content.toString()
const ast = parser.parse(input, { range: true })
console.log('ast success\n')

try {
    //const result_json = JSON.stringify(ast, null, 4);
    fs.writeFile('Salt_TestCase/test_weakRandom.json', JSON.stringify(ast, null, 4), function(err) {
        if (err) throw err;
        console.log('Updated');
    });
} catch (e) {}

parser.visit(ast, {
    MemberAccess: (nodeMem) => {
        if(nodeMem.expression.name == "block" && nodeMem.memberName == "timestamp"){
            console.log("block.timestamp detected at " + nodeMem.range);
        }
    },
    Identifier: (nodeId) => {
        if(nodeId.name == "now"){
            console.log("now detected at "+ nodeId.range);
        }
        else if(nodeId.name == "blockhash"){
            console.log("blockhash detected at "+ nodeId.range);
        }
    }
});