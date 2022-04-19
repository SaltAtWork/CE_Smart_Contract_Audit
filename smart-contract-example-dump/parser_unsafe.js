//////////////////////////////////////////////////////////////
const fs = require('fs');
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
var name;
var content;
var input;
var result;
var result_json;
for (let i = 0; i < unsafe_list.length; i++) {
    name = unsafe_list[i];
    content = fs.readFileSync('./Salt_Reentrancy/Unsafe/' + name + '.sol');
    input = content.toString();
    try {
        result = parser.parse(input, { range: true });
        console.log('ast success' + name);
        result_json = JSON.stringify(result, null, 4);
        fs.writeFile('./Salt_Reentrancy/Unsafe/' + name + '.json', result_json, function(err) {
            if (err) throw err;
            console.log('Updated');
        });
    } catch (e) {
        if (e instanceof parser.ParserError) {
            console.error(e.errors);
        }
    }
}