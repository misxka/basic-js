const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: '',
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    value = value === undefined ? '' : value;
    let connector = this.chain === '' ? '' : '~~';
    this.chain += `${connector}( ${value} )`;
    return this;
  },
  removeLink(position) {
    const getChainLength = function(str, substr) {
      let n;
      let i = 0;
      do {
        n = str.indexOf(substr);
        str = str.slice(n + 1);
        i++;
      }
      while (n > -1);
      return i + 1;
    };

    const getPosition = function getIndex(str, substr, nth) { 
      let offset = 0;
      for (let i = 0; i < nth; i++) {
            offset = str.indexOf(substr, offset + 1);
      }
      return offset;
    } 

    if(typeof(position) != 'number' || !Number.isInteger(position) || position < 1 || position > getChainLength(this.chain, ')~~(')) {
      this.chain = '';
      throw new Error();
    }

    if(position === 1) {
      this.chain = this.chain.substring(this.chain.indexOf(')~~(') + 3, this.chain.length);
    }
    else {
      let firstPos = getPosition(this.chain, ')~~(', position - 1);
      let secondPos = getPosition(this.chain, ')~~(', position);
      this.chain = this.chain.substring(0, firstPos) + this.chain.substring(secondPos, this.chain.length);
    }

    return this;
  },
  reverseChain() {
    this.chain = this.chain.split('~~');
    this.chain = this.chain.reverse();
    this.chain = this.chain.join('~~');
    return this;
  },
  finishChain() {
    const str = this.chain;
    this.chain = '';
    return str;
  }
};

module.exports = chainMaker;
