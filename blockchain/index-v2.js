
const SHA256 = require('crypto-js/sha256');

class Block {
    
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
        ).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined: ', this.hash);
    }
}

class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2017', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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
    
    console.log('Mining block 1...');
    blockChain.addBlock(new Block(1, '20/08/2017', {amount: 100}));
    console.log('Mining block 2...');
    blockChain.addBlock(new Block(2, '21/08/2017', {amount: 200}));
}

testBlockChain();