var fs = require('fs');
const parser = require('@solidity-parser/parser');

unsafe_list = [
    'test_deprecated'
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
        Identifier: (node) => {
            if (node.name == 'suicide') {
                console.log(name + ' possible suicide used')
                console.log(' ' + node.range)
                detect = detect + name + ' possible suicide used \n' + 'position ' + node.range + '\n\n'
            }
        }
    })
    parser.visit(result, {
        Identifier: (node) => {
            if (node.name == 'sha3') {
                console.log(name + ' possible sha3 used')
                console.log(' ' + node.range)
                detect = detect + name + ' possible sha3 used \n' + 'position ' + node.range + '\n\n'
            }
        }
    })
    parser.visit(result, {
        MemberAccess: (node) => {
            if (node.memberName == 'blockHash' && node.expression.name == 'block') {
                console.log(name + ' possible block.blockhash used')
                console.log(' ' + node.range)
                detect = detect + name + ' possible block.blockhash used \n' + 'position ' + node.range + '\n\n'
            }
        }
    })
    parser.visit(result, {
        MemberAccess: (node) => {
            if (node.memberName == 'callcode') {
                console.log(name + ' possible callcode used')
                console.log(' ' + node.range)
                detect = detect + name + ' possible callcode used \n' + 'position ' + node.range + '\n\n'
            }
        }
    })
    parser.visit(result, {
        ThrowStatement: (node) => {
            console.log(name + ' possible throw used')
            console.log(' ' + node.range)
            detect = detect + name + ' possible throw used \n' + 'position ' + node.range + '\n\n'
        }
    })
    parser.visit(result, {
        MemberAccess: (node) => {
            if (node.memberName == 'gas' && node.expression.name == 'msg') {
                console.log(name + ' possible msg.gas used')
                console.log(' ' + node.range)
                detect = detect + name + ' possible msg.gas used \n' + 'position ' + node.range + '\n\n'
            }
        }
    })
    parser.visit(result, {
        FunctionDefinition: (node) => {
            if (node.stateMutability == 'constant') {
                console.log(name + ' possible constant used')
                console.log(' ' + node.range)
                detect = detect + name + ' possible constant used \n' + 'position ' + node.range + '\n\n'
            }
        }
    })

    fs.writeFile('./Salt_TestCase/' + name + '.txt', detect, function(err) {
        if (err) throw err;
        console.log('\nreseult created ' + name + '\n');
    });
}