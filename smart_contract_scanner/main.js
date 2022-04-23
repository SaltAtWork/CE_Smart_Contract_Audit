const fs = require('fs');
const scan = require('./scan.js');
const readline = require('readline-sync')

var projectPath = readline.question('Please enter project path : \n')
var report = scan.allPattern(projectPath)

fs.writeFile(projectPath + 'test_result.txt', report, function(err) {
    if (err) throw err;
    console.log('test reseult created ');
});