var badwords = ['window', 'chair', 'knockings'];

// Fill in function body here
var hasBadwords = function (message, index) {
	for (var i = 0; i < badwords.length; i++) {
  	if (message.includes(badwords[i])) { return true; }
  }
  return false;
}
