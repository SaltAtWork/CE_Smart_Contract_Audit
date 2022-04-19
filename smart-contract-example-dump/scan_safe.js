var fs = require('fs');
const parser = require('@solidity-parser/parser');

safe_list = [
    'Safe_001',
    'Safe_002',
    'Safe_003',
    'Safe_004',
    'Safe_005',
    'Safe_006',
    'Safe_007',
    'Safe_008',
    'Safe_009',
    'Safe_010',
    'Safe_011',
    'Safe_012'
];

var name
var content
var input
var result
var operationIndex
var callIndex
var blockCall
var blockOPeration
var newCall = false
var newOperation = false
var detect = ''
console.log('\n')
for (let i = 0; i < safe_list.length; i++) {
    name = safe_list[i];
    content = fs.readFileSync('./Salt_Reentrancy/Safe/' + name + '.sol');
    input = content.toString();
    result = parser.parse(input, { range: true });
    console.log('ast success ' + name + '\n');
    parser.visit(result, {
        Block: (node) => {
            currentBlock = node
            parser.visit(node, {
                FunctionCall: (node2) => {
                    if (node2.expression.type == 'FunctionCall' &&
                        node2.expression.expression.type == 'MemberAccess' &&
                        node2.expression.expression.memberName == 'value' &&
                        node2.expression.expression.expression.type == 'MemberAccess' &&
                        node2.expression.expression.expression.memberName == 'call' &&
                        node2.expression.expression.expression.expression.type == 'MemberAccess' &&
                        node2.expression.expression.expression.expression.memberName == 'sender' &&
                        node2.expression.expression.expression.expression.expression.type == 'Identifier' &&
                        node2.expression.expression.expression.expression.expression.name == 'msg'
                    ) {
                        callIndex = node2.range
                        blockCall = node
                        newCall = true
                    }
                }
            })
            parser.visit(node, {
                BinaryOperation: (node3) => {
                    operationIndex = node3.range
                    blockOPeration = node
                    newOperation = true
                }
            })
            if (callIndex < operationIndex &&
                blockCall == blockOPeration &&
                newCall == true &&
                newOperation == true
            ) {
                console.log(name + ' possible reentrancy ')
                console.log('call position ' + callIndex)
                console.log('operation position ' + operationIndex)
                detect = detect + name + ' possible reentrancy \n' + 'call position ' + callIndex +
                    '\noperation position ' + operationIndex + '\n\n'
            }
            newCall = false
            newOperation = false
                //console.log(node.statements)
        }
    })
}
fs.writeFile('./Salt_Reentrancy/Safe/Scan_Result.txt', detect, function(err) {
    if (err) throw err;
    console.log('Updated');
});