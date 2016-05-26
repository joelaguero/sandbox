/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

ex. [60, 100, 50] --> 110
ex. [40, 100, 100, 40] --> 140
*/

var rob = function(houses) {
  // track maxBounty
  var maxBounty = 0;
  // define recursive rob fn with current bounty
  var recursivelyRob = function recursivelyRob(currentBounty, houseNumber) {
    // add money to current bounty
    var tempBounty = currentBounty + houses[houseNumber];
    console.log(tempBounty);
    // if currentBounty > maxBounty, update maxBounty
    if (tempBounty > maxBounty) { maxBounty = tempBounty; }
    // if there is another house to rob, call rob with updated houseNumber
    for (var i = houseNumber + 2; i < houses.length - 1; i++) {
      recursivelyRob(tempBounty, i);
    }
  }
  // return maxBounty
  return maxBounty;
};
