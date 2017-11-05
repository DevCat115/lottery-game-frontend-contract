const { expect } = require("chai");
const fs = require("fs");
const { ethers } = require("hardhat");

const { delay, fromBigNum, toBigNum } = require("./utils.js");
const { mine } = require("@nomicfoundation/hardhat-network-helpers");

var owner, addr1, addr2, addr3, addr4, addr5;
var tokenContract;

describe("deploy contracts", function() {
  it("Create account", async function() {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
    var tx = await owner.sendTransaction({
      to: addr1.address,
      value: toBigNum("100", 18),
    });
    await tx.wait();

    var tx = await owner.sendTransaction({
      to: addr2.address,
      value: toBigNum("100", 18),
    });
    await tx.wait();

    var tx = await owner.sendTransaction({
      to: addr3.address,
      value: toBigNum("100", 18),
    });
    await tx.wait();

    var tx = await owner.sendTransaction({
      to: addr4.address,
      value: toBigNum("100", 18),
    });
    await tx.wait();

    var tx = await owner.sendTransaction({
      to: addr5.address,
      value: toBigNum("100", 18),
    });
    await tx.wait();
  });

  it("deploy contracts", async function() {
    //QE token deployment
    const ERC20TOKEN = await ethers.getContractFactory("ERC20");
    tokenContract = await ERC20TOKEN.deploy("Token1", "T1");
    await tokenContract.deployed();

    const Lottery = await ethers.getContractFactory("lottery");
    lotteryContract = await Lottery.deploy(tokenContract.address);
    await lotteryContract.deployed();

    var tx = await lotteryContract.startLottery();
    await tx.wait();

    var tx = await tokenContract.transfer(addr1.address, toBigNum("100", 18));
    await tx.wait();
    var tx = await tokenContract.transfer(addr2.address, toBigNum("100", 18));
    await tx.wait();
    var tx = await tokenContract.transfer(addr3.address, toBigNum("100", 18));
    await tx.wait();
    var tx = await tokenContract.transfer(addr4.address, toBigNum("100", 18));
    await tx.wait();
    var tx = await tokenContract.transfer(addr5.address, toBigNum("100", 18));
    await tx.wait();
  });
});

describe("Play the game", function() {
  it("Participate ", async function() {
    // ------------------------------------------------

    var tx = await tokenContract.connect(addr1).approve(
      lotteryContract.address,
      toBigNum("100", 18)
    );
    await tx.wait();

    var tx = await lotteryContract.connect(addr1).joinLottery2(
      toBigNum("50", 18)
    );
    await tx.wait();

    const participates = await lotteryContract.howMany(addr1.address);
    console.log("--------participates-------------",participates);

    // // ------------------------------------------------
    
    // var tx = await tokenContract.connect(addr2).approve(
    //   lotteryContract.address,
    //   toBigNum("100", 18)
    // );
    // await tx.wait();

    // var tx = await lotteryContract.connect(addr2).joinLottery1(
    //   toBigNum("10", 18)
    // );
    // await tx.wait();

    // // ------------------------------------------------
    
    // var tx = await tokenContract.connect(addr3).approve(
    //   lotteryContract.address,
    //   toBigNum("100", 18)
    // );
    // await tx.wait();

    // var tx = await lotteryContract.connect(addr3).joinLottery1(
    //   toBigNum("10", 18)
    // );
    // await tx.wait();

    // // ------------------------------------------------
    
    // var tx = await tokenContract.connect(addr4).approve(
    //   lotteryContract.address,
    //   toBigNum("100", 18)
    // );
    // await tx.wait();

    // var tx = await lotteryContract.connect(addr4).joinLottery1(
    //   toBigNum("10", 18)
    // );
    // await tx.wait();

    // // ------------------------------------------------
    


    // var tx = await lotteryContract.connect(addr5).joinLottery1(
    //   toBigNum("10", 18)
    // );
    // await tx.wait();

    // ----------------------------------------
    // const winners = await lotteryContract.allWinner1();
    // console.log("--------winner-------------",winners);

  });
});
