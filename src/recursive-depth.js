const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    if(Array.isArray(arr)) {
      return 1 + arr.reduce((max, elem) => {
        return Math.max(max, this.calculateDepth(elem));
      }, 0);
    }
    else return 0;
  }
};