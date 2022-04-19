var fs = require('fs');
const parser = require('@solidity-parser/parser');

unsafe_list = [
    'Unsafe_001',
    'Unsafe_002',
    'Unsafe_003',
    'Unsafe_004',
    'Unsafe_005',
    'Unsafe_006',
    'Unsafe_007',
    'Unsafe_008',
    'Unsafe_009',
    'Unsafe_010',
    'Unsafe_011',
    'Unsafe_012',
    'Unsafe_013',
    'Unsafe_014',
    'Unsafe_015',
    'Unsafe_016',
    'Unsafe_017',
    'Unsafe_018',
    'Unsafe_019',
    'Unsafe_020',
    'Unsafe_021',
    'Unsafe_022',
    'Unsafe_023'
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
for (let i = 0; i < unsafe_list.length; i++) {
    name = unsafe_list[i];
    content = fs.readFileSync('./Salt_Reentrancy/Unsafe/' + name + '.sol');
    input = content.toString();
    result = parser.parse(input, { range: true });
    console.log('ast success ' + name + '\n');
    parser.visit(result, {
        Block: (node) => {
            currentBlock = node
            parser.visit(node, {
                FunctionCall: (node2) => {
                    if (node2.expression.type == 'NameValueExpression' &&
                        node2.expression.expression.type == 'MemberAccess' &&
                        node2.expression.expression.memberName == 'call' &&
                        node2.expression.expression.expression.type == 'MemberAccess' &&
                        node2.expression.expression.expression.memberName == 'sender' &&
                        node2.expression.expression.expression.expression.type == 'Identifier' &&
                        node2.expression.expression.expression.expression.name == 'msg'
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
                console.log('\n' + name + ' possible reentrancy ')
                console.log('call position ' + callIndex)
                console.log('operation position ' + operationIndex + '\n')
                detect = detect + name + ' possible reentrancy \n' + 'call position ' + callIndex +
                    '\noperation position ' + operationIndex + '\n\n'
            }
            newCall = false
            newOperation = false
        }
    })
}
fs.writeFile('./Salt_Reentrancy/Unsafe/Scan_2_Result.txt', detect, function(err) {
    if (err) throw err;
    console.log('Updated');
});