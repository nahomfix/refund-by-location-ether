require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/dc624074fb114105a1736323839d2055",
            accounts: ["0xb6c217cbC8D5648D69b97Af8F2B5Ec235244E61a"],
        },
    },
    paths: {
        artifacts: "./src/artifacts",
    },
};
