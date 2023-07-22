import { init, useQuery } from "@airstack/airstack-react";
import React, { useEffect, useState } from "react";
import { ChainId } from "@biconomy/core-types";
import { IPaymaster, BiconomyPaymaster } from "@biconomy/paymaster";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";
import { CheckWalletNFT } from "@/queries/checkWalletNFT";
import { nftAbi } from "@/component/nftAbi";

init("1d970fafbd9247db840e5a260bb6ed6f");

const MyComponent = () => {
  const { data, loading, error } = useQuery(query, variables, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Render your component using the data returned by the query
};

const bundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc", // you can get this value from the Biconomy dashboard.
  chainId: ChainId.GOERLI,
});

const paymaster = new BiconomyPaymaster({
  paymasterUrl:
    "https://paymaster.biconomy.io/api/v1/80001/cIhIeS-I0.7e1f17b1-6ebb-454c-8499-c5f66dd098c6",
});

export default function App({ Component, pageProps }) {
  const [providerClient, setProviderClient] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [smartAccount, setSmartAccount] = useState(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);

  // 1. Initialize sign client
  useEffect(() => {
    async function onInitializeProviderClient() {
      const client = await EthereumProvider.init({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        showQrModal: true,
        qrModalOptions: { themeMode: "light" },
        chains: [5],
        optionalChains: [1, 80001], // Add the missing comma here
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["chainChanged", "accountsChanged"],
      });
      setProviderClient(client);
    }

    onInitializeProviderClient();
  }, []);

  // 2. Enable / connect with provider, will open web3modal
  async function onConnect() {
    if (providerClient) {
      await providerClient.connect();
      console.log(providerClient); // Print providerClient
      const web3Provider = new ethers.providers.Web3Provider(providerClient);
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
    } else {
      throw new Error("providerClient is not initialized");
    }
  }

  // 3. Setup biconomy smart account
  async function setupSmartAccount() {
    try {
      setScwAddress("");
      setScwLoading(true);

      const biconomySmartAccountConfig = {
        signer: provider.getSigner(),
        chainId: ChainId.GOERLI,
        bundler: bundler,
        paymaster: paymaster,
      };

      let biconomySmartAccount = new BiconomySmartAccount(
        biconomySmartAccountConfig
      );
      biconomySmartAccount = await biconomySmartAccount.init();

      console.log("owner: ", biconomySmartAccount.owner);
      const smartContractAddress =
        await biconomySmartAccount.getSmartAccountAddress(); // Get the smart contract address
      console.log("address: ", smartContractAddress);
      console.log(
        "deployed: ",
        await biconomySmartAccount.isAccountDeployed(smartContractAddress)
      );

      setSmartAccount(biconomySmartAccount);
      setScwAddress(smartContractAddress); // Set the smart contract address in the state variable.
      setScwLoading(false);
    } catch (err) {
      console.log("error setting up smart account... ", err);
    }
  }

  // 4. Handle account and provider changes to setup smart account
  useEffect(() => {
    if (provider !== undefined && account !== undefined) {
      setupSmartAccount();
      console.log("Provider...", provider);
      window.localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, provider]);

  // 5. Disconnect Wallet
  const disconnectWallet = async () => {
    if (providerClient) {
      await providerClient.disconnect();
      setProvider(undefined);
      setAccount(undefined);
      setScwAddress("");
    }
  };

  const ethers = require("ethers");

  const nftAddress = "0x91f11545c176Ca65C1D6156daA9AbA5Fb95f3C9d";

  const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

  nftContract.balanceOf(account).then((balance) => {
    if (balance.gt(0)) {
      console.log("The wallet owns the NFT");
    } else {
      console.log("The wallet does not own the NFT");
    }
  });

  return (
    <div>
      <button onClick={account ? disconnectWallet : onConnect}>
        {account ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
      <Component {...pageProps} />
    </div>
  );
}
