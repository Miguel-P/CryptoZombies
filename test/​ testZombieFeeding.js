// import the contract artifact
const truffleAssert = require('truffle-assertions') // truffle-assertions is a special assertion library specifically for truffle. It's very silly, but the default assertion and test framework is a generic js testing framework and assertion lib, meaning that you still need a specialist truffle assertion library. THe worst part about this is that you have to install truffle-assertions in every single truffle project that you make if you want to have these specialist assertions in your test.
const ZombieHelper = artifacts.require('./contracts/ZombieFeeding.sol')
// const ZombieHelper  = artifacts.require("./contracts/ZombieHelper.sol")
// test starts here
contract('ZombieHelper', function (accounts) { // The variable accounts is provided to us by truffle test. I.e. when we run truffle test, truffle spins up a blockchain emulator which creates 10 accounts that we are able to access as a global variable in our tests. We can then use these 10 accounts to interact with our contract.
  // predefine the contract instance
  // let ZombieFeedingInstance
  let ZombieHelperInstance

  // before each test, create a new contract instance
  beforeEach(async function () {
    // ZombieFeedingInstance = await ZombieFeeding.new() // the reason why you need the await keyword is that apparently, all functions which javascript uses to interact with the blockchain, or everytime you interact with the blockchain the functions from javascript are asynchronous! So you have to say await, otherwise you'll get a promise instead of the actual result.
    ZombieHelperInstance = await ZombieHelper.new()
  })

  it("Check that you a zombie can feed and create a new zombie", async function () {
    let eventReceipt = await ZombieHelperInstance.createRandomZombie( "Zombie1", {from: accounts[0]})
    truffleAssert.eventEmitted(eventReceipt, "NewZombie", (ev) => {
      console.log(ev.zombieId)
      return ev.name == "Zombie1"
    })
    // now feed
    // let zombieId = await ZombieHelperInstance.getZombiesByOwner(accounts[0])
    // function timeout(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // await timeout(3000);
    let feedEvent = await ZombieHelperInstance.feedAndMultiply(0, 12345, "kitty", {from: accounts[0]})
    truffleAssert.eventEmitted(feedEvent, "NewZombie", (ev) => {
        return ev.name == "NoName"
    })
  })

  // it("Check that you can only create one zombie per address", async function () {
  //   await ZombieFeedingInstance.createRandomZombie( "Zombie1", {from: accounts[0]})
  //   truffleAssert.fails(ZombieFeedingInstance.createRandomZombie("Zombie2", {from: accounts[0]}))
  // })
})