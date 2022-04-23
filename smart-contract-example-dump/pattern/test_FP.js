function testFloatingPragma(ast, sourceCode) {
    const parser = require('@solidity-parser/parser');
    const stringSymbol = "[<>^]!~";
    var symbol = stringSymbol.split("");
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            PragmaDirective: (node) => {
                for (var i = 0; i < symbol.length; i++) {
                    if (sourceCode.indexOf(symbol[i]) > 0) {
                        callIndex = node.range
                        console.log('Detected floating pragma\n')
                        console.log('position ' + callIndex + '\n')
                        console.log("Char = " + symbol[i] + '\n')
                        detect = detect + 'Detected floating pragma \n' + 'position ' + callIndex + "\nChar = " + symbol[i] + '\n\n'
                    }
                }
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testFloatingPragma
}