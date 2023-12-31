// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { config } from "dotenv"
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { Wallet, providers, ethers  } from 'ethers'
import { ChainId } from "@biconomy/core-types"
import { 
  IPaymaster, 
  BiconomyPaymaster,  
  IHybridPaymaster,
  PaymasterFeeQuote,
  PaymasterMode,
  SponsorUserOperationDto, 
} from '@biconomy/paymaster'
// import { Client } from "@xmtp/xmtp-js";

export default async function handler(req, res) {
const address = req.body
console.log(address)
console.log("api received")
config()

const bundler= new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/5/abc', // you can get this value from biconomy dashboard.     
  chainId: ChainId.POLYGON_ZKEVM_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const paymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/1442/cQTKB5mSc.89b8a9a2-0c1e-4b59-9867-8696fc81eef8' 
})

const provider = new providers.JsonRpcProvider("https://rpc.public.zkevm-test.net")
const wallet = new Wallet(process.env.PRIVATE_KEY || "", provider);

const biconomySmartAccountConfig = {
  signer: wallet,
  chainId: ChainId.POLYGON_ZKEVM_TESTNET,
  bundler: bundler,
  paymaster: paymaster
}

async function createAccount() {
  let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
  biconomySmartAccount =  await biconomySmartAccount.init()
  console.log("owner: ", biconomySmartAccount.owner)
  console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
  // code below is if you want to see balances of all of your tokens
  // console.log("balances: ", await biconomySmartAccount.getAllTokenBalances({ chainId: ChainId.POLYGON_MUMBAI, eoaAddress: biconomySmartAccount.owner, tokenAddresses:[]}))
  return biconomySmartAccount;
}



async function mintNFT() {
  const smartAccount = await createAccount();

  const nftInterface = new ethers.utils.Interface([
    "function safeMint(address to, uint256 tokenId)",
  ]);

  const scwAddress = await smartAccount.getSmartAccountAddress();

  const data = nftInterface.encodeFunctionData("safeMint", [scwAddress, 1]);

  const nftAddress = "0x91C41e315c97476D4C1Ad3b0895F8607Dffe3c2B";

  const transaction = {
    to: nftAddress,
    data: data,
  };


  console.log("building userop")
  let partialUserOp = await smartAccount.buildUserOp([transaction]);

  const biconomyPaymaster =
  smartAccount.paymaster;

  let paymasterServiceData = {
      mode: PaymasterMode.SPONSORED,
  };
  console.log("b4 first try")
  try {
  const paymasterAndDataResponse =
    await biconomyPaymaster.getPaymasterAndData(
      partialUserOp,
      paymasterServiceData
    );
    partialUserOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
  } catch (e) {
  console.log("error received ", e);
  }

  try {
    const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
    const transactionDetails = await userOpResponse.wait();
    console.log(transactionDetails)
    } catch (e) {
      console.log("error received ", e);
    }
  };

  mintNFT()

  // const xmtp = await Client.create(signer, { env: "dev" });
  // const conv = await xmtp.conversations.newConversation(
  //   address,
  // );
  // const message = await conv.send("Hi! Congratulations owning a Wala Gift Card. You can now use popular dApps without spending money or annoying steps!");
  // console.log(message);
    
   res.status(200).json({ name: message })
}
