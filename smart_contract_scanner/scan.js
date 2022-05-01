var fs = require('fs');
const parser = require('@solidity-parser/parser');
const testAssembly = require('./pattern/test_assembly')
const testDefaultFV = require('./pattern/test_defaultFV')
const testDefaultSV = require('./pattern/test_defaultSV')
const testDeprecated = require('./pattern/test_deprecated')
const testFixedGas = require('./pattern/test_fixedGas')
const testFloatingPragma = require('./pattern/test_FP')
const testIncorrectOP = require('./pattern/test_incorrectOP')
const testReentrancy = require('./pattern/test_reentrancy')
const testRTL = require('./pattern/test_rtl')
const testTXOrigin = require('./pattern/test_txorigin')
const testUncheckedCall = require('./pattern/test_uncheckedCall')
const testWeakRandom = require('./pattern/test_weakRandom')

function getAllFiles(dir) {
    var results = [];
    fs.readdirSync(dir).forEach(function(file) {
        if (dir == './') file = dir + file;
        else file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(file))
        } else results.push(file);
    });
    return results;
};

function allPattern(projectPath) {

    var files = getAllFiles(projectPath).filter(name => name.includes('.sol'))

    var content
    var sourceCode
    var ast
    var report = ''

    for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        content = fs.readFileSync(files[i]);
        sourceCode = content.toString();
        try {
            ast = parser.parse(sourceCode, { range: true });
        } catch (err) {
            console.log('ast failed ' + files[i] + '\n');
            continue;
        }
        ast = parser.parse(sourceCode, { range: true });
        console.log('ast success ' + files[i] + '\n');

        report = report + '\n ============================================ \n\n' + files[i] +
            testAssembly.testAssembly(ast) +
            testDefaultFV.testDefaultFV(ast) +
            testDefaultSV.testDefaultSV(ast) +
            testDeprecated.testDeprecated(ast) +
            testFixedGas.testFixedGas(ast) +
            testFloatingPragma.testFloatingPragma(ast) +
            testIncorrectOP.testIncorrectOP(ast) +
            testReentrancy.testReentrancy(ast) +
            testRTL.testRTL(sourceCode) +
            testTXOrigin.testTXOrigin(ast) +
            testUncheckedCall.testUncheckedCall(ast) +
            testWeakRandom.testWeakRandom(ast)
    }
    return report
}
module.exports = {
    allPattern
}