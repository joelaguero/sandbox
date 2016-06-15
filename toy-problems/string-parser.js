/*

+ PROBLEM & EXPLORATION +

Valid Characters
----------------
{, }, [, ], (, )

Examples
--------
{} -> true
{[]}() -> true
(){}[] -> true
{[}]() -> false
{}( -> false

Idea 1
------
  Exploring solution with left marker and right marker
  ex: {[}]() : invalid

  left marker = L
  right marker = R

  Iterate over the string
  ^ = current position

  {[}]()
   L^

  recurse one level
    [}]()
    L^

Idea 2
------
  Use a stack to track left markers: {[

  Iterate over the string...
  if the marker at the current index is {, [, (, then push it to the stack
  if the marker at the current index is }, ], ), then...
    check if the right marker is equal to the marker on the top of the stack
    if yes, then pop elem on top of the stack
      it's the end of the string and if stack is empty, then return true
    if no, then return false

*/

const stringParser = function stringParser(str) {
  // Use an array as a stack to store left markers as we iterate over the string.
  let stack = [];

  // Define left and right markers to quickly check for when iterating over the string.
  const leftMarkers = ['{', '[', '('];
  const rightMarkers = ['}', ']', ')'];

  // Iterate over the string.
  for (var i = 0; i < str.length; i++) {
    if (leftMarkers.includes(str[i])) {
      // The current character is a left marker, so push it to the stack.
      stack.push(str[i]);
    } else if (rightMarkers.includes(str[i])) {
      // The current character is a right marker...
      if (_findOppositeMarker(str[i]) === stack[stack.length - 1]) {
        // The right marker is equal to the left marker on top of the stack, so pop the top of the stack.
        stack.pop();
      } else {
        // The right marker is NOT equal to the top of the stack, so return false.
        // The string is invalid.
        return false;
      }
    }
  }

  // After iterating over the entire string, return true if the stack is empty
  // (which means all left markers had corresponding right markers).
  // Otherwise, return false.
  return stack.length === 0;
}

const _findOppositeMarker = function findOppositeMarker(marker) {
  switch(marker) {
    case '{':
      return '}';
    case '(':
      return ')';
    case '[':
      return ']';
    case '}':
      return '{';
    case ')':
      return '(';
    case ']':
      return '[';
    default:
      return undefined;
  }
}

// Test Cases
console.log('Test Case: {}', stringParser('{}') === true ? 'PASSED' : 'FAILED');
console.log('Test Case: {[]}()', stringParser('{[]}()') === true ? 'PASSED' : 'FAILED');
console.log('Test Case: (){}[]', stringParser('(){}[]') === true ? 'PASSED' : 'FAILED');
console.log('Test Case: {[}]()', stringParser('{[}]()') === false ? 'PASSED' : 'FAILED');
console.log('Test Case: {}(', stringParser('{}(') === false ? 'PASSED' : 'FAILED');
