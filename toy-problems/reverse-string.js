// edge cases 0 & 1 length strings

// ab
// 01

// abc
// 012

// abcd
// 0123

// abcde
// 01234

const reverseString = (str) => {
  let result = str;
  if (str.length >= 2) {
    for (let i = 0; i < Math.floor(str.length / 2); i++) {
      result[i] = str[str.length - 1 - i];
      result[str.length - 1 - i] = str[i];
    }
  }
  return result;
}
