function testUncheckedCall(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex

    try {
        parser.visit(ast, {
            ExpressionStatement: (node) => {
                if (node.expression.type == "FunctionCall") {
                    if (node.expression.expression.name != "require") {
                        parser.visit(node, {
                            FunctionCall: (node2) => {
                                parser.visit(node2, {
                                    MemberAccess: (node3) => {
                                        if (
                                            node3.memberName == "call" ||
                                            node3.memberName == "callcode" ||
                                            node3.memberName == "delegatecall" ||
                                            node3.memberName == "send"
                                        ) {
                                            callIndex = node.range
                                            console.log('Detected unchecked low-level call return value\n')
                                            console.log('position ' + callIndex + '\n')
                                            detect = detect + 'Detected unchecked low-level call return value \n' + 'position ' + callIndex + '\n\n'
                                        }
                                    },
                                })
                            },
                        })
                    }
                }
            },
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testUncheckedCall
}