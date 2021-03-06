function testIncorrectOP(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            BinaryOperation: (node) => {
                if (node.right.type == "UnaryOperation") {
                    callIndex = node.range
                    console.log('\nDetected Operator typo\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected Operator typo \n' + 'position ' + callIndex + '\n'
                    
                    //For Debugging
                    // if(node.right.operator == "!"){
                    detect = detect + 'This might be false positive. Please Recheck. LeftOp = ' + node.operator + '\n'
                    // }
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