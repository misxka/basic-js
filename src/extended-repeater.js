const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let arr  = [];
  str = String(str);
  str = String(str);
  options.addition = typeof(options.addition) !== 'undefined' ? options.addition : '';
  options.addition = String(options.addition);
  let repeatTimes = options.additionRepeatTimes ?? 1;
  for(let i = 0; i < repeatTimes; i++) {
    arr.push(options.addition);
  }
  options.addition = arr.join(options.additionSeparator ?? '|');
  arr = [];
  str = str + options.addition;
  repeatTimes = options.repeatTimes ?? 1;
  for(let i = 0; i < repeatTimes; i++) {
    arr.push(str);
  }
  str = arr.join(options.separator ?? '+');
  return str;
};
  