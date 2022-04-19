var fs = require('fs');
const parser = require('@solidity-parser/parser');
const content = fs.readFileSync('./Salt_TestCase/test_txorigin2.sol');
const input = content.toString()
const ast = parser.parse(input, { range: true })
console.log('ast success\n')

try {
    //const result_json = JSON.stringify(ast, null, 4);
    fs.writeFile('Salt_TestCase/test_txorigin2.json', JSON.stringify(ast, null, 4), function(err) {
        if (err) throw err;
        console.log('Updated');
    });
} catch (e) {}

parser.visit(ast,{
    FunctionCall: (nodeFC) => {
        if(nodeFC.expression.name == "require"){
            //console.log(nodeFC.range);
            parser.visit(nodeFC,{
                BinaryOperation: (nodeBO) => {
                    parser.visit(nodeBO, {
                        MemberAccess: (nodeMA) => {
                            if(nodeMA.expression.name == "tx" && nodeMA.memberName == "origin"){
                                console.log("tx.origin Authorization detected at " + nodeFC.range);
                            }
                        }
                    });
                }
            });
        }
    }
});