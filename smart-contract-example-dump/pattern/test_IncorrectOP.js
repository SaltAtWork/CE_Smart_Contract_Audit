function testIncorrectOP(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            BinaryOperation: (node) => {
                if (node.right.type == "UnaryOperation") {
                    callIndex = node.range
                    console.log('Detected Operator typo\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected Operator typo \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testIncorrectOP
}