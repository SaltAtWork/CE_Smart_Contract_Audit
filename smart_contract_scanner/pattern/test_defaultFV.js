function testDefaultFV(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            FunctionDefinition: (node) => {
                if (node.visibility == "default") {
                    callIndex = node.range
                    console.log('\nDetected default function visibility\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected default function visibility \n' + 'position ' + callIndex + '\n'
                }
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testDefaultFV
}