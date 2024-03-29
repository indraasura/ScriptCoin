const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock(){
        return new Block('0', '01/01/2019', 'Genesis block', '0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false
            }
            if(currentBlock.previousHash != previousBlock.hash){
                return false
            }
        }
        return true
    }

}

// Driver code

ScriptCoin = new BlockChain()
ScriptCoin.addBlock(new Block('1', '02/01/2019', { amount : 4 }))
ScriptCoin.addBlock(new Block('2', '03/01/2019', { amount : 9 }))




console.log('Is blockchain valid? ' + ScriptCoin.isChainValid())

//console.log(JSON.stringify(ScriptCoin, null, 4))