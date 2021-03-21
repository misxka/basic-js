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
        if(arr[i - 2] !== sequences[0] || (Number.isNaN(arr[i - 1]) && Number.isNaN(newArr[newArr.length - 1]))) newArr.pop();
      }
    }
    else if(arr[i] === sequences[2]) {
      if(typeof(arr[i + 1]) !== 'undefined') newArr.push(arr[i + 1]);
    }
    else if(arr[i] === sequences[3]) {
      if(typeof(arr[i - 1]) !== 'undefined') {
        if(arr[i - 2] !== sequences[0] || (Number.isNaN(arr[i - 1]) && Number.isNaN(newArr[newArr.length - 1]))) newArr.push(newArr[newArr.length - 1]);
      }
    }
    else newArr.push(arr[i]);
  }
  return newArr;
};

// console.log(transform([
//   '--double-prev',
//   0,
//   '--double-prev',
//   'ABC',
//   '--double-prev',
//   333,
//   '--double-next',
//   22,
//   '--discard-prev',
//   'ABC',
//   '--discard-next',
//   { '0': 'first', '1': 'second', length: 2 },
//   '--discard-prev',
//   'DEF',
//   Infinity,
//   3.14,
//   'ABC',
//   false,
//   true,
//   NaN,
//   '--discard-prev'
// ]));