const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (Array.isArray(members)) {
    let cryptoStr = '';
    let names = [];
    for (let i = 0; i < members.length; i++) {
      if (typeof members[i] === 'string') {
        while (members[i][0] === ' ') {
          members[i] = members[i].slice(1);
        }
        names.push(members[i]);
      }
    }
    names.sort();
    let name;
    for (let i = 0; i < names.length; i++) {
      name = names[i][0].toUpperCase();
      names[i] = name;
    }
    names.sort();
    for (let i = 0; i < names.length; i++) {
      cryptoStr += names[i][0];
    }
    return cryptoStr;
  }
  else return false;
};

//console.log(createDreamTeam(['vcbga']));