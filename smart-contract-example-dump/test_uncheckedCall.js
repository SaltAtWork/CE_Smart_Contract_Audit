var fs = require("fs");
const parser = require("@solidity-parser/parser");
const content = fs.readFileSync("./Salt_TestCase/test_uncheckedCall2.sol");
const input = content.toString();
const ast = parser.parse(input, { range: true });
console.log("ast success\n");

try {
    //const result_json = JSON.stringify(ast, null, 4);
    fs.writeFile(
        "Salt_TestCase/test_uncheckedCall2.json",
        JSON.stringify(ast, null, 4),
        function (err) {
            if (err) throw err;
            console.log("Updated");
        }
    );
} catch (e) { }

parser.visit(ast, {
    ExpressionStatement: (nodeES) => {
        if (nodeES.expression.type == "FunctionCall") {
            if(nodeES.expression.expression.name != "require"){
                parser.visit(nodeES, {
                    FunctionCall: (nodeFC) => {
                        parser.visit(nodeFC, {
                            MemberAccess: (nodeMA) => {
                                if (
                                    nodeMA.memberName == "call" ||
                                    nodeMA.memberName == "callcode" ||
                                    nodeMA.memberName == "delegatecall" ||
                                    nodeMA.memberName == "send"
                                ) {
                                    console.log(
                                        "Unchecked low-level call return value at " + nodeES.range
                                    );
                                }
                            },
                        });
                    },
                });
            }
        }
    },
});
