function testWeakRandom(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex

    try {
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.expression.name == "block" && node.memberName == "timestamp") {
                    callIndex = node.range
                    console.log('Detected block.timestamp used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected block.timestamp used \n' + 'position ' + callIndex + '\n\n'
                }
            },
            Identifier: (node) => {
                if (node.name == "now") {
                    callIndex = node.range
                    console.log('Detected now used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected now used \n' + 'position ' + callIndex + '\n\n'
                } else if (node.name == "blockhash") {
                    callIndex = node.range
                    console.log('Detected blockhash\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected blockhash \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testWeakRandom
}