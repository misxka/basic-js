const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if(!Array.isArray(arr)) throw new Error();
  const newArr = [];
  const sequences = ['--discard-next', '--discard-prev', '--double-next', '--double-prev'];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === sequences[0]) {
      if(typeof(arr[i + 1]) !== 'undefined') i++;
    }
    else if(arr[i] === sequences[1]) {
      if(typeof(arr[i - 1]) !== 'undefined') {
        if(arr[i - 2] !== sequences[0]) newArr.pop();
      }
    }
    else if(arr[i] === sequences[2]) {
      if(typeof(arr[i + 1]) !== 'undefined') newArr.push(arr[i + 1]);
    }
    else if(arr[i] === sequences[3]) {
      if(typeof(arr[i - 1]) !== 'undefined') {
        if(arr[i - 2] !== sequences[0] ) newArr.push(newArr[newArr.length - 1]);
      }
    }
    else newArr.push(arr[i]);
  }
  return newArr;
};