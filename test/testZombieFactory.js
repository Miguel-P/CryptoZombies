// import the contract artifact
const truffleAssert = require('truffle-assertions')
const ZombieFactory = artifacts.require('./contracts/ZombieFactory.sol')

// test starts here
contract('ZombieFactory', function (accounts) {
  // predefine the contract instance
  let ZombieFactoryInstance

  // before each test, create a new contract instance
  beforeEach(async function () {
    ZombieFactoryInstance = await ZombieFactory.new()
  })

  it("Check that you can create a zombie", async function () {
    let eventReceipt = await ZombieFactoryInstance.createRandomZombie( "Zombie1", {from: accounts[0]})
    truffleAssert.eventEmitted(eventReceipt, "NewZombie", (ev) => {
        return ev.name == "Zombie1"
    })
  })

  it("Check that you can only create one zombie per address", async function () {
    await ZombieFactoryInstance.createRandomZombie( "Zombie1", {from: accounts[0]})
    truffleAssert.fails(ZombieFactoryInstance.createRandomZombie("Zombie2", {from: accounts[0]}))
  })
})