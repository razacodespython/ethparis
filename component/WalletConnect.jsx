import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { IPaymaster, BiconomyPaymaster } from "@biconomy/paymaster";
import abi from "../utils/abi.json";
import { nftAbi } from "@/component/nftAbi";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import styles from "@/styles/Home.module.css";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";

const contractAddress = "0x61ec475c64c5042a6Cbb7763f89EcAe745fc8315";

const bundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc", // you can get this value from biconomy dashboard.
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster = new BiconomyPaymaster({
  paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL || "",
});

export default function Home() {
  const [smartAccount, setSmartAccount] = useState(null);
  const [interval, enableInterval] = useState(false);
  const sdkRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [biconomyAddress, setBiconomyAddress] = useState("");
  const [isFarmer, setIsFarmer] = useState(false);
  const [coinContract, setCoinContract] = useState(null);
  const { address, isConnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    let configureLogin;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);
    }
  }, [interval]);

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();
      const signature1 = await socialLoginSDK.whitelistUrl(
        "http://localhost:3000/"
      );
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
        network: "testnet",
        whitelistUrls: {
          "http://localhost:3000/": signature1,
        },
      });
      console.log({ sdkRef });
      sdkRef.current = socialLoginSDK;
    }
    if (!sdkRef.current.provider) {
      sdkRef.current.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return;
    sdkRef.current.hideWallet();
    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    );
    setProvider(web3Provider);

    try {
      const biconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
      let biconomySmartAccount = new BiconomySmartAccount(
        biconomySmartAccountConfig
      );
      biconomySmartAccount = await biconomySmartAccount.init();
      setBiconomyAddress(await biconomySmartAccount.getSmartAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setLoading(false);
      router.push("/profile");
    } catch (err) {
      console.log("error setting up smart account... ", err);
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    setBiconomyAddress("");
    enableInterval(false);
  };

  const checkUserStatus = async () => {
    console.log("checking user status");
    const contract = new ethers.Contract(contractAddress, abi, provider);
    setCoinContract(contract);
    const isAFarmer = await contract.isAFarmer(address);
    setIsFarmer(isAFarmer);
  };

  // useEffect(() => {
  //   if (biconomyAddress && provider) {
  //     checkUserStatus();
  //   }

    // check if wallet has the nft
  //   if (address) {
  //     const nftAddress = "0x91f11545c176Ca65C1D6156daA9AbA5Fb95f3C9d";
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

  //     nftContract.balanceOf(address).then((balance) => {
  //       if (balance.gt(0)) {
  //         console.log("The wallet owns the NFT");
  //       } else {
  //         console.log("The wallet does not own the NFT");
  //       }
  //     });
  //   }
  // }, [biconomyAddress, provider, address]);

  const onClickModal = () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

  return (
    <div className='connect-container'>
      {smartAccount ? (
        <button onClick={logout} className={styles.connect}>
          Logout
        </button>
      ) : (
        <button onClick={login} className={styles.connect}>
          Sign in with email
        </button>
      )}
      {isConnected ? (
        <button onClick={() => onClickModal()} className={styles.walletConnect}>
          disconnect
        </button>
      ) : (
        <button className={styles.walletConnect} onClick={() => onClickModal()}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
