function testDeprecated(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            Identifier: (node) => {
                if (node.name == 'suicide') {
                    callIndex = node.range
                    console.log('\nDetected possible suicide used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected possible suicide used \n' + 'position ' + callIndex + '\n'
                }
            }
        })
        parser.visit(ast, {
            Identifier: (node) => {
                if (node.name == 'sha3') {
                    callIndex = node.range
                    console.log('\nDetected sha3 used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected sha3 used \n' + 'position ' + callIndex + '\n'
                }
            }
        })
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.memberName == 'blockHash' && node.expression.name == 'block') {
                    callIndex = node.range
                    console.log('\nDetected block.blockhash used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected block.blockhash used \n' + 'position ' + callIndex + '\n'
                }
            }
        })
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.memberName == 'callcode') {
                    callIndex = node.range
                    console.log('\nDetected callcode used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected callcode used \n' + 'position ' + callIndex + '\n'
                }
            }
        })
        parser.visit(ast, {
            ThrowStatement: (node) => {
                callIndex = node.range
                console.log('\nDetected throw\n')
                console.log('position ' + callIndex + '\n')
                detect = detect + '\nDetected throw \n' + 'position ' + callIndex + '\n'
            }
        })
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.memberName == 'gas' && node.expression.name == 'msg') {
                    callIndex = node.range
                    console.log('\nDetected msg.gas used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected msg.gas used \n' + 'position ' + callIndex + '\n'
                }
            }
        })
        parser.visit(ast, {
            FunctionDefinition: (node) => {
                if (node.stateMutability == 'constant') {
                    callIndex = node.range
                    console.log('\nDetected constant used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected constant used \n' + 'position ' + callIndex + '\n'
                }
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testDeprecated
}