var fs = require('fs');
const parser = require('@solidity-parser/parser');

unsafe_list = [
    'test_rtl'
];

var name
var content
var input
var result

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

    var rtlChars = '\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^' + rtlChars + ']*?[' + rtlChars + ']');

    if (rtlDirCheck.test(input)) {
        console.log('possible rtl characters used in source code\n')
        detect = detect + name + ' possible rtl characters used in source code \n' + '\n\n'
    }



    fs.writeFile('./Salt_TestCase/' + name + '.txt', detect, function(err) {
        if (err) throw err;
        console.log('reseult created ' + name + '\n');
    });
}