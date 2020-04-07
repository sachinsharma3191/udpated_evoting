var ElectionContract = artifacts.require("../contracts/Election.sol");
var VoterRegistrationContract = artifacts.require("../contracts/VoterContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ElectionContract);
  deployer.deploy(VoterRegistrationContract);
};