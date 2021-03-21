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
        // if (n > -1) {
          str = str.slice(n + 1);
          i++;
        // }
      }
      while (n > -1);
      return i + 1;
    };

    const getPosition = function(str, substr, number) {
      let n = 0;
      let i = 0;
      let tempStr = str;
      while(i < number) {
        n = n + tempStr.indexOf(substr);
        tempStr = tempStr.slice(n + 1);
        i++;
      }
      return n;
    };

    if(typeof(position) != 'number' || !Number.isInteger(position) ||  
                position < 1 || position > getChainLength(this.chain, ')~~('))
                 throw new Error();

    if(position === 1) {
      this.chain = this.chain.substring(this.chain.indexOf(')~~(') + 4, this.chain.length);
    }
    else {
      let firstPos = getPosition(this.chain, ')~~(', position - 1);
      let secondPos = getPosition(this.chain, ')~~(', position);
      this.chain = this.chain.substring(0, firstPos) + this.chain.substring(secondPos + 1, this.chain.length);
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
    return this.chain;
  }
};

console.log(chainMaker.addLink('GHI').addLink(null).reverseChain().addLink(333).reverseChain().reverseChain().addLink(0).reverseChain().reverseChain().addLink('GHI').finishChain());
// '( 3rd )~~( function() {} )'

module.exports = chainMaker;
