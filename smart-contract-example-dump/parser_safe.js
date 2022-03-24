//////////////////////////////////////////////////////////////
const fs = require('fs');
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
var name;
var content;
var input;
var result;
var result_json;
for (let i = 0; i < safe_list.length; i++) {
    name = safe_list[i];
    content = fs.readFileSync('./Salt_Reentrancy/Safe/' + name + '.sol');
    input = content.toString();
    try {
        result = parser.parse(input);
        console.log('ast success' + name);
        result_json = JSON.stringify(result, null, 4);
        fs.writeFile('./Salt_Reentrancy/Safe/' + name + '.json', result_json, function(err) {
            if (err) throw err;
            console.log('Updated');
        });
    } catch (e) {
        if (e instanceof parser.ParserError) {
            console.error(e.errors);
        }
    }
}