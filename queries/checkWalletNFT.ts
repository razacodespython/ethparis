export const CheckWalletNFT = `query CheckWalletNFT {
  TokenBalance(
    input: {blockchain: ethereum, owner: "vitalik.eth", tokenAddress: "0x123456789abcdef", tokenId: "1"}
  ) {
    id
    tokenAddress
    tokenId
    owner {
      identity
      addresses
    }
    tokenNfts {
      id
      address
      tokenId
    }
  }
}`;
