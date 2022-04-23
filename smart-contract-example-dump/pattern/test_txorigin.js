function testTXOrigin(ast) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var callIndex

    try {
        parser.visit(ast, {
            FunctionCall: (node) => {
                if (node.expression.name == "require") {
                    parser.visit(node, {
                        BinaryOperation: (node2) => {
                            parser.visit(node2, {
                                MemberAccess: (node3) => {
                                    if (node3.expression.name == "tx" && node3.memberName == "origin") {
                                        callIndex = node.range
                                        console.log('\nDetected tx.origin authorization\n')
                                        console.log('position ' + callIndex + '\n')
                                        detect = detect + '\nDetected tx.origin authorization \n' + 'position ' + callIndex + '\n'
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    } catch (err) {

    }
    return detect
}
module.exports = {
    testTXOrigin
}