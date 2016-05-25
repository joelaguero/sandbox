/*
 * Compare two version numbers version1 and version2.
 * If version1 > version2 return 1, if version1 < version2 return -1,
 * otherwise return 0.
 *
 * You may assume that the version strings are non-empty and contain only digits
 * and the . character. The . character does not represent a decimal point and is
 * used to separate number sequences. For instance, 2.5 is not "two and a half" or
 * "half way to version three", it is the fifth second-level revision of the second
 * first-level revision.
 */

class Solution {
public:
  int compareVersion(string version1, string version2) {
    // locate the strings before and after the first decimal
    // if there is no decimal, then compare the strings directly
    
    // compare the digits before the decimal
      // return -1 or 1 if v1 > v2 or v2 > v1, respectively
      // if they are equal, return 0
    // otherwise, the numbers are the same, so call compareVersion on everything after the decimal

  }
}
