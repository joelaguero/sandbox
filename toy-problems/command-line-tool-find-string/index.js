#! /usr/bin/env node

var customArgs = process.argv.slice(2);
var target = customArgs[0];

console.log(target);

var exec = require('child_process').exec;
var child = exec('ls -a | grep ' + target, function(err, stdout, stderr) {
  console.log(stdout);
});
