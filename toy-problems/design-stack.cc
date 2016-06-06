// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
//
// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.
class Solution {
public:
  // store the stack in an array
  // store another stack that tracks the minimum at each level of the stack
  std::vector<int> stack;
  std::vector<int> minimum;

  // PUSH: write function that adds to end of array
  // if the value is greater than top of minStack then push same value to min stack
  // else push the top of the minStack to the minStack (duplicate it)
  void push(int value) {
    stack.push_back(value);
    if (value < minimum[minimum.length() - 1]) {
      minimum.push_back(value);
    }
  }

  // POP: write function that removes and returns item at end of array
  // also pop the item from the minStack
  int pop() {
    if (stack.length() == 0) { return null; }

    int top = stack[stack.length() - 1];
    if (top < minimum[minimum.length() - 1]) {
      minimum.erase(minimum.length() - 1);
    }
    return top;
  }

  // TOP: return the last element in the array
  int top() {
    if (stack.length() = 0) { return null; }

    return stack[stack.length - 1];
  }

  // GETMIN: return the top of the minStack
  int getMin() {
    if (stack.length() = 0) { return null; }

    return minimum[minimum.length - 1];
  }
}
