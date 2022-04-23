var fs = require('fs');
const parser = require('@solidity-parser/parser');

unsafe_list = [
    'test_assembly'
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
        InlineAssemblyStatement: (node) => {
            callIndex = node.range
            console.log(name + ' possible inline assembly')
            console.log('position ' + callIndex + '\n')
            detect = detect + name + ' possible inline assembly \n' + 'position ' + callIndex + '\n\n'
        }
    })


    fs.writeFile('./Salt_TestCase/' + name + '.txt', detect, function(err) {
        if (err) throw err;
        console.log('reseult created ' + name + '\n');
    });
}