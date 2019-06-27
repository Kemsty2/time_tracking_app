(function() {
  "use strict";

  function isPalindrome(word) {
    // Please write your code here.
    var inversed = [];
    var i = word.length - 1;

    while (i >= 0) {
      inversed.push(word[i]);
      i--;
    }

    if (inversed.join("") === word) {
      return true;
    } else {
      return false;
    }
  }
  var word = "kayak";
  console.log(isPalindrome(word));
  console.log(0.1 + 0.2 === 0.3);
})();
