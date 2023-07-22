export const CheckWalletNFT = `query CheckWalletNFT($tokenAddress: Address!, $walletAddress: Identity!) {
  TokenBalance(
    input: {blockchain: polygon, tokenAddress: $tokenAddress, owner: $walletAddress}
  ) {
    id
    tokenAddress
    owner {
      addresses
    }
    tokenNfts {
      address
      tokenId
    }
  }
}
`;
