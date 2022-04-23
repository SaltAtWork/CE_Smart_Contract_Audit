var fs = require('fs');
const parser = require('@solidity-parser/parser');

unsafe_list = [
    'test_fixedGas'
];

var name
var content
var input
var result

var callIndex

var detect = ''


console.log('\n')
for (let i = 0; i < unsafe_list.length; i++) {

    name = unsafe_list[i];
    content = fs.readFileSync('./Salt_TestCase/' + name + '.sol');
    input = content.toString();
    result = parser.parse(input, { range: true });
    console.log('ast success ' + name + '\n');
    result_json = JSON.stringify(result, null, 4);
    fs.writeFile('./Salt_TestCase/' + name + '.json', result_json, function(err) {
        if (err) throw err;
        console.log('json created ' + name + '\n');
    });

    parser.visit(result, {
        Block: (node) => {
            parser.visit(node, {
                FunctionCall: (node2) => {
                    try {
                        if ((
                                node2.expression.type == 'MemberAccess' &&
                                node2.expression.memberName == 'send'
                            ) || (
                                node2.expression.type == 'MemberAccess' &&
                                node2.expression.memberName == 'transfer'
                            ) || (
                                node2.expression.type == 'FunctionCall' &&
                                node2.expression.arguments.some(a => a.type == 'NumberLiteral') &&
                                node2.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.memberName == 'gas'
                            ) || (
                                node2.expression.arguments.type == 'NameValueList' &&
                                node2.expression.arguments.identifiers.some(a => a.name == 'gas') &&
                                node2.expression.arguments.arguments.some(a => a.type == 'NumberLiteral')
                            )) {
                            callIndex = node2.range
                            console.log(name + ' possible fixed gas vulnability ')
                            console.log('call position ' + callIndex + '\n')
                            detect = detect + name + ' possible fixed gas vulnability \n' + 'call position ' + callIndex + '\n\n'
                        }
                    } catch (e) {

                    }
                }
            })
        }
    })
    fs.writeFile('./Salt_TestCase/' + name + '.txt', detect, function(err) {
        if (err) throw err;
        console.log('reseult created ' + name + '\n');
    });
}