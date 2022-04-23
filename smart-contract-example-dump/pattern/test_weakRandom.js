function testWeakRandom(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex

    try {
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.expression.name == "block" && node.memberName == "timestamp") {
                    callIndex = node.range
                    console.log('\nDetected block.timestamp used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected block.timestamp used \n' + 'position ' + callIndex + '\n'
                }
            },
            Identifier: (node) => {
                if (node.name == "now") {
                    callIndex = node.range
                    console.log('\nDetected now used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected now used \n' + 'position ' + callIndex + '\n'
                } else if (node.name == "blockhash") {
                    callIndex = node.range
                    console.log('\nDetected blockhash\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected blockhash used\n' + 'position ' + callIndex + '\n'
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