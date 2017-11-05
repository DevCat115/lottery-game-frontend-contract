import { useState, useEffect, useReducer, useMemo } from "react";
import { ethers } from "ethers";

import { useAccount, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { providers } from "ethers";
import { formatUnits, parseEther, parseUnits } from "viem";
import { type WalletClient, useWalletClient } from "wagmi";

import Container from "../components/containers/Container";
import FilledButton from "../components/buttons/FilledButton";
import {
  lotteryContractAddress,
  lotteryAbi,
  usdtAddress,
  ERC20ABI,
} from "../contracts";
import { toBigNum } from "../contracts/utils";
import { toast } from "react-toastify";
import { useContractRead } from "wagmi";

// make signer---------------------------------
const chainId = process.env.REACT_APP_CHAIN_ID;
export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  if (chain.id !== parseInt(chainId!)) return;
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
// ----------------------------------------------------

const maxParticipantNumbers1 = 10;
const ticketPrice1 = 50000000;

const maxParticipantNumbers2 = 5;
const ticketPrice2 = 200000000;

const maxParticipantNumbers3 = 4;
const ticketPrice3 = 500000000;

export default function Blank() {
  const signer = useEthersSigner();
  const { address } = useAccount();

  const approveToken = async (_amountIn: number) => {
    if (!signer) return;
    let provider = signer?.provider;
    try {
      const contract = new ethers.Contract(usdtAddress, ERC20ABI, provider);
      let signedTokenContract = contract.connect(signer);
      let tx = await signedTokenContract.approve(
        lotteryContractAddress,
        toBigNum(_amountIn, 9)
      );
      await tx.wait();
    } catch (error) {}
  };

  const usdtBalanceBigInt: any = useContractRead({
    address: usdtAddress,
    abi: ERC20ABI,
    functionName: "balanceOf",
    args: [address],
    enabled: !!address,
    watch: true,
  });

  const usdtAllowanceBigInt: any = useContractRead({
    address: usdtAddress,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [address, lotteryContractAddress],
    enabled: !!address,
    watch: true,
  });

  useEffect(() => {
    if (signer) {
      if (usdtBalanceBigInt)
        setUsdtBalance(
          parseFloat(
            formatUnits(usdtBalanceBigInt.data ? usdtBalanceBigInt.data! : 0, 9)
          ).toFixed(3)
        );
      else setUsdtBalance("0");
      if (usdtAllowanceBigInt)
        setUsdtAllowance(
          parseFloat(
            formatUnits(
              usdtAllowanceBigInt.data ? usdtAllowanceBigInt.data! : 0,
              9
            )
          ).toFixed(3)
        );
      else setUsdtAllowance("0");
    }
  }, [usdtBalanceBigInt, usdtAllowanceBigInt, signer]);

  const firstParticipates: any = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryAbi,
    functionName: "getLotteryLength",
    args: [],
    enabled: !!address,
    watch: true,
  });
  const secondsParticipates: any = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryAbi,
    functionName: "getLottery1Length",
    args: [],
    enabled: !!address,
    watch: true,
  });

  const thirdParticipates: any = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryAbi,
    functionName: "getLottery2Length",
    args: [],
    enabled: !!address,
    watch: true,
  });

  const userParticipates: any = useContractRead({
    address: lotteryContractAddress,
    abi: lotteryAbi,
    functionName: "howMany",
    args: [address],
    enabled: !!address,
    watch: true,
  });
  const lotteryOptions = [
    {
      id: 1,
      name: "Silver Lottery",
      prize: 500000000,
      entryFee: 50000000,
      maxParticipates: 10,
      participated: firstParticipates!.data
        ? Number(firstParticipates.data)
        : 0,
      openslots: firstParticipates!.data
        ? 10 - Number(firstParticipates.data)
        : 10,
      yourEntry: userParticipates!.data
        ? userParticipates.data?.at(0)!.toString()
        : "0" === "0"
        ? "0"
        : "50000000",
    },
    {
      id: 2,
      name: "Gold Lottery",
      prize: 1000000000,
      entryFee: 200000000,
      maxParticipates: 5,
      participated: secondsParticipates!.data
        ? Number(secondsParticipates.data)
        : 0,
      openslots: secondsParticipates!.data
        ? 5 - Number(secondsParticipates.data)
        : 5,
      yourEntry: userParticipates!.data
        ? userParticipates.data?.at(1)!.toString()
        : "0" === "0"
        ? "0"
        : "200000000",
    },
    {
      id: 3,
      name: "Diamond Lottery",
      prize: 2000000000,
      entryFee: 500000000,
      maxParticipates: 4,
      participated: thirdParticipates!.data
        ? Number(thirdParticipates.data)
        : 0,
      openslots: thirdParticipates!.data
        ? 4 - Number(thirdParticipates.data)
        : 4,
      yourEntry: userParticipates!.data
        ? userParticipates.data?.at(2)!.toString()
        : "0" > "0"
        ? "500000000"
        : "0",
    },
  ];
  const [usdtBalance, setUsdtBalance] = useState<string>("0");
  const [usdtAllowance, setUsdtAllowance] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  const join = async (index: number) => {
    if (!signer) return;
    let provider = signer?.provider;
    try {
      const contract = new ethers.Contract(
        lotteryContractAddress,
        lotteryAbi,
        provider
      );
      let signedLotteryContract = contract.connect(signer);
      setLoading(true);
      if (index === 1) {
        if (Number(usdtAllowance) < ticketPrice1)
          await approveToken(ticketPrice1);
        let approveTx = await signedLotteryContract.joinLottery(
          toBigNum(ticketPrice1, 9)
        );
        await approveTx.wait();
      } else if (index === 2) {
        if (Number(usdtAllowance) < ticketPrice2)
          await approveToken(ticketPrice2);
        let joinTx = await signedLotteryContract.joinLottery1(
          toBigNum(ticketPrice2, 9)
        );
        await joinTx.wait();
      } else {
        console.log("usdtAllowance", usdtAllowance, usdtAllowanceBigInt);

        if (Number(usdtAllowance) < ticketPrice3)
          await approveToken(ticketPrice3);
        let tx = await signedLotteryContract.joinLottery2(
          toBigNum(ticketPrice3, 9)
        );
        await tx.wait();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className="h-full flex flex-col justify-center items-center pt-[5px]">
      <Container className="flex flex-col items-center gap-8 py-5 my-10 w-full max-w-[1070px] px-0">
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-100 font-black text-3xl">QUEEN Lottery</h2>
            <p className="text-gray-100 text-base">
              Instant Win, Instant Announcement, Immediate Transfer
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-100 font-black text-3xl">Your Balance</h2>
            <p className="text-gray-100 text-base">{usdtBalance} QUEEN</p>
          </div>
        </div>
      </Container>

      <div className="grid grid-cols-1 md:grid-cols-3 h-fit pt-6 pb-4 gap-10">
        {lotteryOptions.map((lottery) => (
          <div className="relative h-fit" key={lottery.id}>
            <div className="container max-w-lg">
              <div className="py-6 px-6 bg-[#123551] rounded-md flex flex-col gap-[10px] w-[330px]">
                <div className="flex flex-row justify-center mb-3">
                  <div className="flex flex-col text-center">
                    <h1 className="font-[700] text-[#ffffff] text-[20px] opacity-60">
                      {lottery.name}
                    </h1>
                    <span className="text-[#ffffff] opacity-60 mt-[10px]">
                      Winning Prize
                    </span>
                    <span className="w-full text-base  font-semibold mt-[5px] text-[#fff]">
                      {lottery.prize} QUEEN
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between text-[#ffffff] opacity-60 text-[16px]">
                  <span>Entry Fee:</span>
                  <span className="text-[#ff4500]  font-[800]">
                    {lottery.entryFee} QUEEN
                  </span>
                </div>

                <div className="flex flex-row justify-between text-[#ffffff] opacity-60 text-[16px]">
                  <span>Max Participants:</span>
                  <span className="text-[#ff4500]  font-[800]">
                    {lottery.maxParticipates}
                  </span>
                </div>

                <div className="flex flex-row justify-between text-[#ffffff] opacity-60 text-[16px]">
                  <span>Participated</span>
                  <span className="text-[#ff4500]  font-[800]">
                    {lottery.participated}
                  </span>
                </div>

                <div className="flex flex-row justify-between text-[#ffffff] opacity-60 text-[16px]">
                  <span>Open Slots</span>
                  <span className="text-[#ff4500]  font-[800]">
                    {lottery.openslots}
                  </span>
                </div>

                <div className="flex flex-row justify-between text-[#ffffff] opacity-60 text-[16px]">
                  <span>Your Entries</span>
                  <span className="text-[#ff4500]  font-[800]">
                    {lottery.yourEntry}
                  </span>
                </div>
                <div className="my-3">
                  {lottery.yourEntry === "0" ? (
                    <FilledButton
                      className="w-full text-base py-3 font-semibold bg-[#182b48]"
                      onClick={() => {
                        join(lottery.id);
                      }}
                    >
                      {loading ? "Loading" : "Participate"}
                    </FilledButton>
                  ) : (
                    <FilledButton
                      className="w-full text-base py-3 font-semibold bg-[#182b48]"
                      disabled={true}
                    >
                      Participated
                    </FilledButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
