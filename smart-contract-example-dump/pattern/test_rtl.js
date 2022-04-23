function testRTL(sourceCode) {
    const parser = require('@solidity-parser/parser');
    var detect = ''
    var rtlChars = '\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^' + rtlChars + ']*?[' + rtlChars + ']');
    if (rtlDirCheck.test(sourceCode)) {
        console.log('\nDetected right to left characters used\n')
        detect = '\nDetected right to left characters used \n'
    }
    return detect
}
module.exports = {
    testRTL
}