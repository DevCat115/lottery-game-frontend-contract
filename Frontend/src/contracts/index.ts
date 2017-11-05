import { ethers } from "ethers";
import Contrats from "./8453.json";
const rpc = "https://mainnet.base.org";
const provider = new ethers.providers.JsonRpcProvider(rpc)
const lotteryContractAddress:`0x${string}` = Contrats.lottery.address as `0x${string}`;
const lotteryContract = new ethers.Contract(Contrats.lottery.address, Contrats.lottery.abi, provider);
const lotteryAbi = Contrats.lottery.abi;
const zeroAddress = ethers.constants.AddressZero;
const usdtAddress:`0x${string}` = Contrats.usdt as `0x${string}`;
const usdtContract = new ethers.Contract(Contrats.usdt, Contrats.erc20Abi, provider);
const ERC20ABI = Contrats.erc20Abi;

export {
    zeroAddress, provider, lotteryContractAddress,lotteryContract,lotteryAbi, usdtAddress, usdtContract,ERC20ABI
}