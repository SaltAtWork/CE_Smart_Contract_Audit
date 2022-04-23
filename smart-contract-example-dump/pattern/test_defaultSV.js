function testDefaultSV(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            StateVariableDeclaration: (node) => {
                if (node.variables[0].visibility == "default") {
                    callIndex = node.range
                    console.log('Detected default variable visibility\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected default variable visibility \n' + 'position ' + callIndex + '\n\n'
                }
            }
        });
    } catch (err) {

    }
    return detect
}
module.exports = {
    testDefaultSV
}