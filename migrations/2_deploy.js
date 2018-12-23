const MultisigGame = artifacts.require("./MultisigGame.sol");

module.exports = function(deployer) {
  deployer.deploy(RootChain).then(() => {
    return deployer.deploy(MultisigGame);
  }).then(() => {
    console.log('finish');
  });
};