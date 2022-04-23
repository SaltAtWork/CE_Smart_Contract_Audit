function testDeprecated(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            Identifier: (node) => {
                if (node.name == 'suicide') {
                    callIndex = node.range
                    console.log('Detected possible suicide used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected possible suicide used \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
        parser.visit(ast, {
            Identifier: (node) => {
                if (node.name == 'sha3') {
                    callIndex = node.range
                    console.log('Detected sha3 used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected sha3 used \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.memberName == 'blockHash' && node.expression.name == 'block') {
                    callIndex = node.range
                    console.log('Detected block.blockhash used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected block.blockhash used \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.memberName == 'callcode') {
                    callIndex = node.range
                    console.log('Detected callcode used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected callcode used \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
        parser.visit(ast, {
            ThrowStatement: (node) => {
                callIndex = node.range
                console.log('Detected throw\n')
                console.log('position ' + callIndex + '\n')
                detect = detect + 'Detected throw \n' + 'position ' + callIndex + '\n\n'
            }
        })
        parser.visit(ast, {
            MemberAccess: (node) => {
                if (node.memberName == 'gas' && node.expression.name == 'msg') {
                    callIndex = node.range
                    console.log('Detected msg.gas used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected msg.gas used \n' + 'position ' + callIndex + '\n\n'
                }
            }
        })
        parser.visit(ast, {
            FunctionDefinition: (node) => {
                if (node.stateMutability == 'constant') {
                    callIndex = node.range
                    console.log('Detected constant used\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + 'Detected constant used \n' + 'position ' + callIndex + '\n\n'
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