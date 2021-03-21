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

// console.log(transform([
//   '--double-prev',
//   1.233,
//   '--discard-next',
//   '8.963',
//   '--double-prev',
//   1,
//   '--double-next',
//   1,
//   '--discard-prev',
//   { '0': 'first', '1': 'second', length: 2 },
//   '--discard-prev',
//   1.233,
//   '--double-prev',
//   1.233,
//   '--discard-next',
//   false,
//   '--double-prev',
//   22,
//   '--double-next',
//   { '0': 'first', '1': 'second', length: 2 },
//   '--double-next',
//   NaN,
//   '--discard-next',
//   22,
//   '--discard-next',
//   NaN,
//   '--discard-prev',
//   NaN,
//   '--discard-next',
//   { '0': 'first', '1': 'second', length: 2 },
//   '--discard-next',
//   3.14,
//   '--double-next',
//   true,
//   0,
//   false,
//   0,
//   22,
//   NaN,
//   'ABC',
//   333,
//   'GHI',
//   1,
//   1.233,
//   'DEF',
//   { '0': 'first', '1': 'second', length: 2 },
//   3.14,
//   333,
//   false,
//   NaN,
//   '--discard-next'
// ]));