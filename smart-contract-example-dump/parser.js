var SolidityParser = require("solidity-parser");

var result = SolidityParser.parseFile("./Salt_Reentrancy/Unsafe/Unsafe_001.sol");

console.log('test');
const result_json = JSON.stringify(result, null, 4);
var fs = require('fs');

fs.writeFile('Unsafe_001.json', result_json, function(err) {
    if (err) throw err;
    console.log('Updated');
});