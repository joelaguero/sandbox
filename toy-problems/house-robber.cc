/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

ex. [60, 100, 50] --> 110
ex. [40, 100, 100, 40] --> 140
*/

class Solution {
public:
    int robRecursively(vector<int> array, int i, int sum, int* largest) {
        int tempSum = sum;
        if (tempSum > *largest) { largest = tempSum; }
        for (int j = i + 2; i < array.size(); j++) {
            robRecursively(array, j, tempSum, largest);
        }
        return 0;
    }

    int rob(vector<int>& nums) {
        int initSum = 0;
        int largestSum = 0;
        robRecursively(nums, 0, initSum, largestSum);
        return largestSum;
    }
};
