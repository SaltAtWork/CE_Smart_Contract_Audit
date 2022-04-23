function testFloatingPragma(ast) {
    const parser = require('@solidity-parser/parser');
    const stringSymbol = "[<>^]!~";
    var symbol = stringSymbol.split("");
    var detect = ''
    var callIndex
    var firstDetection = false
    try {
        parser.visit(ast, {
            PragmaDirective: (node) => {
                for (var i = 0; i < symbol.length; i++) {
                    if (node.value.indexOf(symbol[i]) !== -1) {
                        callIndex = node.range
                        if (firstDetection == false) {
                            console.log('\nDetected floating pragma\n')
                            console.log('position ' + callIndex + '\n' + "Char = ")
                            detect = '\nDetected floating pragma \n' + 'position ' +
                                callIndex + "\nChar = "
                            firstDetection = true
                        }
                        console.log(' ' + symbol[i])
                        detect = detect + ' ' + symbol[i] + ' '
                    }
                }
                detect = detect + '\n'
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testFloatingPragma
}