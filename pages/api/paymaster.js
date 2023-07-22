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

export default function handler(req, res) {

config()

const bundler= new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/5/abc', // you can get this value from biconomy dashboard.     
  chainId: ChainId.GOERLI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const paymaster = new BiconomyPaymaster({
  paymasterUrl: 'https://paymaster.biconomy.io/api/v1/5/CwOmZkBwy.d348fcae-7ecc-46c0-9839-6b6ba0eb2633' 
})

const provider = new providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli")
const wallet = new Wallet(process.env.PRIVATE_KEY || "", provider);

const biconomySmartAccountConfig = {
  signer: wallet,
  chainId: ChainId.GOERLI,
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

  // const nftInterface = new ethers.utils.Interface([
  //   "function safeMint(address to, uint256 tokenId)",
  // ]);

  const scwAddress = await smartAccount.getSmartAccountAddress();

  const data = nftInterface.encodeFunctionData("safeMint", [scwAddress, 420]);

  const nftAddress = "0x91f11545c176Ca65C1D6156daA9AbA5Fb95f3C9d";

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
  res.status(200).json({ name: 'John Doe' })
}
