/*
Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:
Given s = "hello", return "holle".

Example 2:
Given s = "leetcode", return "leotcede".
*/
#include <vector>;

class Solution {
public:
  string reverseVowel(string s) {
    std::vector<char> vowels = ['a', 'e', 'i', 'o', 'u'];
    // create a storage array of ints respresenting vowel indices
    std::vector<int> indices;
    // iterate over the string and stop when you find a vowel
    // add the index of the vowel to the storage array
    for (int i = 0; i < s.length(); i++) {
      if(std::find(vowels.begin(), vowels.end(), s[i]) != vowels.end()) {
        indices.push_back(i);
      }
    }
    // iterate over half the storage array from the front and end using the iterator variable
    // before incrementing, swap the values at the location in the original string using a helper function that takes two indices and the original string
    for (int j = 0; j < indices.size()/2 - 1; j++) {
      int front = indices[j];
      int back = indices[indices.size() - 1 - j];
      char temp = s[front];
      s[front] = s[back];
      s[back] = temp;
    }
    return s;
  }
};
