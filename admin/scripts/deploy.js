// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const RefundByLocation = await hre.ethers.getContractFactory(
        "RefundByLocation"
    );

    const refundByLocation = await RefundByLocation.deploy(
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        "90046464",
        "387678208",
        "200",
        "8"
    );

    await refundByLocation.deployed();

    console.log("RefundByLocation deployed to:", refundByLocation.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
