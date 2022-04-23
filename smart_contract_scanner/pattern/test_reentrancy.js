function testReentrancy(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    var operationIndex
    var callIndex
    var blockCall
    var blockOPeration
    var newCall = false
    var newOperation = false

    try {
        parser.visit(ast, {
            Block: (node) => {
                parser.visit(node, {
                    FunctionCall: (node2) => {
                        if ((
                                node2.expression.type == 'FunctionCall' &&
                                node2.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.memberName == 'value' &&
                                node2.expression.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.expression.memberName == 'call' &&
                                node2.expression.expression.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.expression.expression.memberName == 'sender' &&
                                node2.expression.expression.expression.expression.expression.type == 'Identifier' &&
                                node2.expression.expression.expression.expression.expression.name == 'msg'
                            ) || (
                                node2.expression.type == 'NameValueExpression' &&
                                node2.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.memberName == 'call' &&
                                node2.expression.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.expression.memberName == 'sender' &&
                                node2.expression.expression.expression.expression.type == 'Identifier' &&
                                node2.expression.expression.expression.expression.name == 'msg'
                            ) || (
                                node2.expression.type == 'MemberAccess' &&
                                node2.expression.memberName == 'transfer'
                            )) {
                            callIndex = node2.range
                            blockCall = node
                            newCall = true
                        }
                    }
                })
                parser.visit(node, {
                    BinaryOperation: (node3) => {
                        operationIndex = node3.range
                        blockOPeration = node
                        newOperation = true
                    }
                })
                if (callIndex < operationIndex &&
                    blockCall == blockOPeration &&
                    newCall == true &&
                    newOperation == true
                ) {
                    callIndex = node.range
                    console.log('\nDetected possible reentrancy\n')
                    console.log('position ' + callIndex + '\n')
                    detect = detect + '\nDetected possible reentrancy \n' + 'position ' + callIndex + '\n'
                }
                newCall = false
                newOperation = false
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testReentrancy
}