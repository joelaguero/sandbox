/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution.
*/
class Solution {
public:
  std::vector<int> twoSum(std::vector<int>& nums, int target) {
    // create an empty set
    std::set<int> candidates;
    for (int i = 0; i < nums.size(); i++) {
      // at each index, add the number to the set if it's less than the target. then check if (target - current number) is in the set if it is, return a tuple with current number and delta
      if (nums[i] <= target) {
        candidates.insert(nums[i]);
        int delta = target - nums[i];
        if (candidates.find(delta) != candidates.end()) {
          return std::vector<int> {nums[i], target};
        }
      }
    }
    // else return an empty vector
    return std::vector<int> {};
  }
};
