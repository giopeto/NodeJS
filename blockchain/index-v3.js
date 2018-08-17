
const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 2;
const MAINING_REWARD = 100;

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    
    constructor(timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce
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
        this.difficulty = DIFFICULTY;
        this.miningReward = MAINING_REWARD;
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block(Date.parse('2017-01-01'), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transaction) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                } else if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
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

    blockChain.createTransaction(new Transaction('address1', 'address2', 100));
    blockChain.createTransaction(new Transaction('address1', 'address2', 50));

    console.log('\n Starting the miner...');
    blockChain.minePendingTransaction('address-3');
    console.log('Balance of address-3 is: ', blockChain.getBalanceOfAddress('address-3'));
   
    console.log('\n Starting the miner again...');
    blockChain.minePendingTransaction('address-3');
    console.log('Balance of address-3 is: ', blockChain.getBalanceOfAddress('address-3'));
}

testBlockChain();