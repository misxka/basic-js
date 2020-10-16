const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
  let turns = Math.pow(2, disksNumber) - 1;
  let seconds = turns * 3600 / turnsSpeed;
  seconds = Math.floor(seconds);
  return {
    "turns": turns,
    "seconds": seconds,
  };
};