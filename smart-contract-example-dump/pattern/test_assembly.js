function testAssembly(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            InlineAssemblyStatement: (node) => {
                callIndex = node.range
                console.log('Detected inline assembly\n')
                console.log('position ' + callIndex + '\n')
                detect = detect + 'Detected inline assembly \n' + 'position ' + callIndex + '\n\n'
            }
        })
    } catch (err) {

    }
    return detect
}

module.exports = {
    testAssembly
}