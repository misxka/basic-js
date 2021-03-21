const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let arr  = [];
  str = String(str);
  str = String(str);
  options.addition = typeof(options.addition) !== 'undefined' ? options.addition : '';
  options.addition = String(options.addition);
  let repeatTimes = typeof(options.additionRepeatTimes) !== 'undefined' ? options.additionRepeatTimes : 1;
  for(let i = 0; i < repeatTimes; i++) {
    arr.push(options.addition);
  }
  options.addition = arr.join(typeof(options.additionSeparator) !== 'undefined' ? options.additionSeparator : '|');
  arr = [];
  str = str + options.addition;
  repeatTimes = typeof(options.repeatTimes) !== 'undefined' ? options.repeatTimes : 1;
  for(let i = 0; i < repeatTimes; i++) {
    arr.push(str);
  }
  str = arr.join(typeof(options.separator) !== 'undefined' ? options.separator : '+');
  return str;
};
  