const fs = require("fs");
const colors = require("colors");
const { ethers } = require("hardhat");
const { toBigNum } = require("./utils.js");
async function main() {
  // get network
  let [owner] = await ethers.getSigners();
  console.log(owner.address);
  let network = await owner.provider._networkPromise;

  const LotteryContract = await ethers.getContractFactory("lottery");
  lotteryContract = await LotteryContract.deploy(
    "0x59a1686fAAa2d9d1d9c8D4ACd5ab6fd108FDbfF3"
  );
  await lotteryContract.deployed();
  var tx = await lotteryContract.startLottery();
  await tx.wait();
}

main()
  .then(() => {
    console.log("complete".green);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
