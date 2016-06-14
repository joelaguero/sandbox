/*
Design two functions. The first should be a hit logger that is called each time a user visits the website.
You can assume that the website is calling the function for you.

The second function should return the number of hits that occurred in the last five minutes.
*/

// store an array of timestamps
// EDIT: change this to an object to store key value pairs, 1 second specific
var hits = {};

// called each time a new user-agent hits the server
var logHit = function() {
  // increment the number of hits by one
  // every time we increment, push the current time to the array of hits
  var currentTime = Date.now();
  var hitRange = Math.floor(currentTime / 1000);

  // EDIT:
  // determine the right key to add it to
  // if the key doesn't exist, init to 1
  // otherwise, increment the value by 1
  if (hits[hitRange]) {
    hits[hitRange]++;
  } else {
    hits[hitRange] = 1;
  }
}

var numberHitsLastFiveMinutes = function() {
  // relative to the current time, return how many hits have occurred
  // in the past five minutes
  // iterate over the array and count timestamps that fall within the last
  // five minute
  var currentTime = Date.now();
  var hitRange = Math.floor(currentTime / 1000);

  // EDIT: what ranges do we care about
  // sum the counts for each range in the object that falls
  // within the last 5 minutes

  var hitCount = 0;
  // iterate over all ranges that fall within the last 300secs
  // sum the counts stored for each range
  for (var i = 0; i < 300; i++) {
    if (hits[hitRange - i]) {
      hitCount += hits[hitRange - i];
    }
  }

  // return the total
  return hitCount;
}

logHit();
logHit();
numberHitsLastFiveMinutes();

// NOTES:
// ex. 1465497046449 --> 1465497046000
// ex. 1465497650

// periodically remove unnecessary storage on outdated ranges outside 5 minutes
// avoid doing extremely expensive cleanup operations in the logHit fn
