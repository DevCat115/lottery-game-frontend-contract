require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log("accounts", account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	networks: {
		localhost: {
			url: "http://127.0.0.1:8545"
		},
		ganache: {
			url: "http://127.0.0.1:7545",
			accounts: [process.env.PRIVATEKEY]
		},
		bsctestnet: {
			url: "https://speedy-nodes-nyc.moralis.io/e7993bf596807059c3a1319a/bsc/testnet",
			accounts: [process.env.PRIVATEKEY]
		},
		fantomtestnet: {
			url: "https://rpc.testnet.fantom.network",
			accounts: [process.env.PRIVATEKEY]
		},
		ethereum: {
			url: "https://main-light.eth.linkpool.io/",
			accounts: [process.env.PRIVATEKEY]
		},
		bsc: {
			url: "https://bsc-dataseed4.binance.org/",
			accounts: [process.env.PRIVATEKEY]
		},
		matic: {
			url: "https://rpc-mainnet.matic.quiknode.pro",
			accounts: [process.env.PRIVATEKEY]
		},
		fantom: {
			url: "https://rpc.ftm.tools/",
			accounts: [process.env.PRIVATEKEY]
		},
		icicb: {
			url: "http://3.143.142.135/",
			accounts: [process.env.PRIVATEKEY]
		},
		icicbtest: {
			url: "http://3.15.233.209/",
			accounts: [process.env.PRIVATEKEY]
		},
		rinkeby: {
			url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
			accounts: [process.env.PRIVATEKEY]
		},
		base: {
			url: "https://mainnet.base.org",
			accounts: [process.env.PRIVATEKEY]
		}

	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: {
			mainnet: "YOUR_ETHERSCAN_API_KEY",
			ropsten: "YOUR_ETHERSCAN_API_KEY",
			rinkeby: "YOUR_ETHERSCAN_API_KEY",
			bsc: "WK3XCXHZDQZR4S7KSWSFIZPZUZFWUVWHNV",
			bscTestnet: "YOUR_BSCSCAN_API_KEY",
		}
	},
	solidity: {
		compilers: [
			{
				version: "0.6.12",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				}
			},
			{
				version: "0.4.17",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				}
			},
			{
				version: "0.5.16",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				}
			},
			{
				version: "0.8.4",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				}
			},
			{
				version: "0.7.6",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				}
			},
		]
	},
	mocha: {
		timeout: 200000
	}
};
