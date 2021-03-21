const CustomError = require("../extensions/custom-error");

const alphabet = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
}
class VigenereCipheringMachine {
  constructor(boolValue = true) {
    if(boolValue === false) {
      this.isReverse = true;
    }
    else this.isReverse = false;
  }
  encrypt(message, key) {
    if(typeof(message) === 'undefined' || typeof(key) === 'undefined') throw new Error();
    message = message.toLowerCase();
    key = key.toLowerCase();
    let str = '';
    const arr = [];
    let flag = 0;
    if(this.isReverse) {
      message = message.split('');
      message = message.reverse();
      message = message.join('');
    }
    for(let i = 0; i < message.length; i++) {
      if(typeof(alphabet[message[i]]) ==='undefined') {
        flag--;
        arr.push(-1);
      }
      else {
        arr.push((alphabet[message[i]] + alphabet[key[flag % key.length]]) % 26);
      }
      flag++;
    }
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] === -1) str += message[i];
      else {
        str += Object.keys(alphabet).find(key => alphabet[key] === arr[i]);
      }
    }
    return str.toUpperCase();
  }    
  decrypt(encryptedMessage, key) {
    if(typeof(encryptedMessage) === 'undefined' || typeof(key) === 'undefined') throw new Error();
    encryptedMessage = encryptedMessage.toLowerCase();
    key = key.toLowerCase();
    let str = '';
    const arr = [];
    let flag = 0;
    if(this.isReverse) {
      encryptedMessage = encryptedMessage.split('');
      encryptedMessage = encryptedMessage.reverse();
      encryptedMessage = encryptedMessage.join('');
    }
    for(let i = 0; i < encryptedMessage.length; i++) {
      if(typeof(alphabet[encryptedMessage[i]]) ==='undefined') {
        flag--;
        arr.push(-1);
      }
      else {
        arr.push((alphabet[encryptedMessage[i]] - alphabet[key[flag % key.length]]) < 0 ? 26 + (alphabet[encryptedMessage[i]] - alphabet[key[flag % key.length]]) : (alphabet[encryptedMessage[i]] - alphabet[key[flag % key.length]]));
      }
      flag++;
    }
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] === -1) str += encryptedMessage[i];
      else {
       str += Object.keys(alphabet).find(key => alphabet[key] === arr[i]);
      }
    }
    return str.toUpperCase();
  }
}

// console.log(new VigenereCipheringMachine(true).decrypt('UWJJW XAGWLNFM VNNNDXHVWWL :)', 'js'));
console.log(new VigenereCipheringMachine(false).encrypt('attack at dawn!', 'alphonse'));

module.exports = VigenereCipheringMachine;
