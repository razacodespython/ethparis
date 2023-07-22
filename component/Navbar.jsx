import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Navbar() {
  const AppDynamic = dynamic(
    () =>
      import("../component/WalletConnect").then(
        (res) => res.default
      ),
    {
      ssr: false,
    }
  );

  return (
    <nav className="navbar">
      <div className="wrapper">
        <div className="logo">WALA</div>
        <div className="menu-button"></div>
        <Suspense fallback={<div>Loading...</div>}>
          <AppDynamic />
        </Suspense>
      </div>
    </nav>
  );
}
