function testFixedGas(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex
    try {
        parser.visit(ast, {
            Block: (node) => {
                parser.visit(node, {
                    FunctionCall: (node2) => {
                        if ((
                                node2.expression.type == 'MemberAccess' &&
                                node2.expression.memberName == 'send'
                            ) || (
                                node2.expression.type == 'MemberAccess' &&
                                node2.expression.memberName == 'transfer'
                            ) || (
                                node2.expression.type == 'FunctionCall' &&
                                node2.expression.arguments.some(a => a.type == 'NumberLiteral') &&
                                node2.expression.expression.type == 'MemberAccess' &&
                                node2.expression.expression.memberName == 'gas'
                            ) || (
                                node2.expression.arguments.type == 'NameValueList' &&
                                node2.expression.arguments.identifiers.some(a => a.name == 'gas') &&
                                node2.expression.arguments.arguments.some(a => a.type == 'NumberLiteral')
                            )) {

                            callIndex = node.range
                            console.log('\nDetected fixed gas vulnability\n')
                            console.log('position ' + callIndex + '\n')
                            detect = detect + '\nDetected fixed gas vulnability \n' + 'position ' + callIndex + '\n'
                        }
                    }
                })
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testFixedGas
}