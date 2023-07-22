import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Home() {

  const AppDynamic = dynamic(
    () => import("../component/WalletConnect").then((res) => res.default),
    {
      ssr: false,
    }
  );

  const options = {
    method: "POST",
    // headers: {
    //   "content-type": "application/json"
    // },
    // body: JSON.stringify(message)
  }

  const paymaster = async() =>{
    console.log("clicked");
    const response = await fetch("/api/paymaster",options);
    const data = await response.json();
    console.log(data)
  }
  return (
    <main className="home-page">
      <Suspense fallback={<div>Loading...</div>}>
          <AppDynamic />
          <button onClick={paymaster}>paymaster trigger</button>
      </Suspense>
    </main>
  )
}
