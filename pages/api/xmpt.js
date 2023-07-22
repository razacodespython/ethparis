

export default async function handler(req, res){
    
    const xmtp = await Client.create(signer, { env: "dev" });
    xmtp.enableGroupChat();

    const memberAddresses = [
        "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
        "0x937C0d4a6294cdfa575de17382c7076b579DC176",
      ];
      const groupConversation =
        xmtp.conversations.newGroupConversation(memberAddresses);

        await groupConversation.send("Hi! Congratulations owning a Wala Gift Card. You can now use popular dApps without spending money or annoying steps!");

}

