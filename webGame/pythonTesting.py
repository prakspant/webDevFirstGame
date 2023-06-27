"""You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

Return the maximum coins you can collect by bursting the balloons wisely."""
"""
Example 1:

Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
Example 2:

Input: nums = [1,5]
Output: 10
"""

class Solution:
    def maxCoins(self, nums):
        if len(nums) < 2:
            return 0 if not nums else nums[0]
        """
        for i in range(len(nums)):
            res += max((nums[i - 1] if i > 0 else 1) + nums[i] + (nums[i + 1] if i < len(nums) else 1) + self.maxCoins(nums[:i] + nums[i + 1:]), self.maxCoins(nums))
        """
        def getMaxCoins(tempNums):
            print(tempNums)
            if not tempNums:
                return 0
            if len(tempNums) == 2:
                return 2 * tempNums[0] * tempNums[1]
            res = max(tempNums[0] * tempNums[1] * (tempNums[2] if len(tempNums) > 2 else 1) + getMaxCoins([tempNums[0]] + tempNums[2:]), getMaxCoins(tempNums[1:]))
            print(res)
            return res
        return max(1 * nums[0] * nums[1] + getMaxCoins([nums[0]] + nums[2:]), getMaxCoins(nums[1:])) if len(nums) > 2 else getMaxCoins(nums)


print(Solution().maxCoins([1,5]))

print(Solution().maxCoins([3,1,5,8]))
