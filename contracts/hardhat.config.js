require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { PRIVATE_KEY, INFURA_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}; 