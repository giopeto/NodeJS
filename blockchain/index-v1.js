
const SHA256 = require('crypto-js/sha256');

class Block {
    
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2017', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            if (this.chain[i].hash !== this.chain[i].calculateHash()) {
                return false;
            }
            if (this.chain[i].previousHash !== this.chain[i-1].hash) {
                return false;
            }
        }

        return true;
    }
}

function testBlockChain() {
    let blockChain = new BlockChain();

    blockChain.addBlock(new Block(1, '20/08/2017', {amount: 100}));
    blockChain.addBlock(new Block(2, '21/08/2017', {amount: 200}));
    
    console.log('Is blockchain valid: ', blockChain.isValid());
    blockChain.chain[1].data = {amount: 1000};
    blockChain.chain[1].hash = blockChain.chain[1].calculateHash();
    console.log('Is blockchain valid: ', blockChain.isValid());
    console.log(JSON.stringify(blockChain, null , 4));
}

testBlockChain();