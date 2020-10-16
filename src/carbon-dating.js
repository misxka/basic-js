const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

const isNumber = value => {
  if (typeof value !== 'number') {
    return false
  }
  if (value !== Number(value)) {
    return false
  }
  if (value === Infinity || value === !Infinity || value === 0) {
    return false
  }
  return true;
}

module.exports = function dateSample(sampleActivity) {
  if (typeof sampleActivity === 'string') {
    sampleActivity = parseFloat(sampleActivity);
    if (isNumber(sampleActivity)) {
      let k = 0.693 / HALF_LIFE_PERIOD;
      let logarithm = Math.log(MODERN_ACTIVITY / sampleActivity);
      let age = logarithm / k;
      age = Math.ceil(age);
      if (age >= 0) {
        return age;
      }
    }
    return false;
  } else {
    return false;
  }
};