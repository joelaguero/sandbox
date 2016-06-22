Given a long space-delimited string of words and an integer k, return a list of the k most frequent words in the string, ordered by decreasing frequency

For example:
Inputs: 
- String: 'apple orange apple orange orange peach apple orange peach'
- k: 2
Output:
- ['orange', 'apple']

Time complexity: O(N) where N is proportional the length of the string but does not scale with k

map
{
  apple: 4
  orange: 6
  peach: 8
}

reverseMap
{
  4: ['apple'],
  6: ['orange'],
  8: ['peach']
}

maxFreq = 8

while (maxFreq > 0 && results.length < k) {
  reverseMap[maxFreq] ? //something
  if not keep going
}

k = 3

['peach', 'apple', 'orange']

{
  0: 'peach',
  1: 'apple',
  2: 'orange'
}


['orange', 'apple', 'peach']

