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
#include <string> using namespace std;
#include <stoi> using namespace std;

class Solution {
public:
  int compareVersion(string version1, string version2) {
    // locate the strings before and after the first decimal
    int d1 = version1.find(".");
    int d2 = version2.find(".");
    if (d1 == -1 && d2 == -1) {
        // there are no decimals, so compare the strings
        if (std::stoi(version1) > std::stoi(version2)) {
            return 1;
        } else if (std::stoi(version2) > std::stoi(version1)) {
            return -1;
        } else {
            return 0;
        }
    } else {
        // there are decimals remaining
        string sub1 = version1.substr(0, d1);
        string sub2 = version2.substr(0, d2);
        // compare the digits before the decimal
        // return -1 or 1 if v1 > v2 or v2 > v1, respectively
        if (sub1 < sub2) { return -1; }
        if (sub1 > sub2) { return 1; }
        // if they are equal and there is nothing left after the decimal, return 0
        // otherwise, call compareVersion on everything after the decimal
        if (version1.length() - 1 != sub1.length() && version2.length() - 1 != sub2.length()) {
            return compareVersion(version1.substr(d1 + 1), version2.substr(d2 + 1));
        }
    }
    return 0;
  }
};
