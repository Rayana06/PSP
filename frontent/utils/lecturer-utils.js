export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function isPalindromeReverse(str) {
  str = String(str);
  return str === str.split("").reverse().join("");
}
export function countPrefixes(words, str) {
  let count = 0;

  for (let word of words) {
    if (str.startsWith(word)) {
      count++;
    }
  }

  return count;
}
