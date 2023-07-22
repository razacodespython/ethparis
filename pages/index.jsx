import Header from "@/component/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useAccount } from "wagmi";

export default function Home() {

  const AppDynamic = dynamic(
    () => import("../component/WalletConnect").then((res) => res.default),
    {
      ssr: false,
    }
  );

  const { address } = useAccount();

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(address)
  }

  const paymaster = async() =>{
    console.log("clicked");
    const response = await fetch("/api/gift",options);
    const data = await response.json();
    console.log(data)
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <AppDynamic />
          <button onClick={paymaster}>paymaster trigger</button>
      </Suspense>
    </>
  )
}
