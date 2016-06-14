/*
Input is a credit card number of variable length (ex. 49927398716).
Return a true or false value if it passes the luhn test.
*/

var luhnTest = function(creditCardNumber) {

  // reverse the order of the creditcardnumber
  var reversed = creditCardNumber.toString().split('').reverse();

  // iterate over the reverse integers
  var sum1 = 0;
  var sum2 = 0;

  for (var i = 0; i < reversed.length; i++) {

    if (i % 2 == 0) {
    // if odd
    // sum the numbers at all the odd indices of the reverse cc number
      sum1 += parseInt(reversed[i]);
    } else {
    // at even indices
    // multiply by two and then sum the individual numbers
      var temp = 2 * parseInt(reversed[i]);
      var tempString = temp.toString();
      var tempSum = 0;
      for (var j = 0; j < tempString.length; j++) {
        tempSum += parseInt(tempString[j]);
      }
      console.log('tempSum type', typeof tempSum, tempSum);
      sum2 += tempSum;
      console.log('sum2 type', typeof sum2);
    }
    console.log('sums', sum1, sum2);
  }

  // return sum1 + sum2 is evenly divisible by 10
  return (sum1 + sum2) % 10 === 0;
}

console.log(luhnTest(49927398718));