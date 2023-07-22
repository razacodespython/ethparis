import Card from "@/component/Card";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Home() {
  const AppDynamic = dynamic(
    () =>
      import("../component/WalletConnect").then(
        (res) => res.default
      ),
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
  };

  const paymaster = async () => {
    console.log("clicked");
    const response = await fetch("/api/paymaster", options);
    const data = await response.json();
    console.log(data);
  };
  return (
    <section className="hero-section">
      <div className="wrapper">
        <header className="header">
          <div className="left-container">
            <h1 className="h1">Fueling Loyalty</h1>
            <p>
              Pay for your community’s gas fees with gift
              cards.
            </p>
            <div className="ctas-container">
              <Suspense fallback={<div>Loading...</div>}>
                <AppDynamic />
              </Suspense>
            </div>
          </div>
          <div className="right-container">
            <Card />
          </div>
        </header>
        <div className="bottom">
          <div className="left-container">
            <div className="hero-bear-container">
              <img
                className="hero-bear"
                src="../assets/Bear.png"
                alt=""
              />
            </div>
          </div>
          <div className="right-container">
            <ul>
              <li>✅ Reward your most loyal members</li>
              <li>✅ Engage with your community</li>
              <li>✅ Provide a public good</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
