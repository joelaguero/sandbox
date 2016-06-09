#! /usr/bin/env node

var customArgs = process.argv.slice(2);
var target = customArgs[0];

console.log(target);

var exec = require('child_process').exec; // child_process is a module that comes with Node, exec is a method on this built-in module "child_process"
var child = exec('ls -a | grep ' + target, function(err, stdout, stderr) {
  console.log(stdout);
});
