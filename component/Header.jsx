import styles from "@/styles/Profile.module.css";
// import SocialLogin from "@biconomy/web3-auth";
import Link from "next/link";
import { useRef } from "react";

export default function Header() {
    // const sdkRef = useRef(null);
    
    // const logout = async () => {
    //     const socialLoginSDK = new SocialLogin();
    //     if (!sdkRef.current) {
    //         console.error("Web3Modal not initialized.");
    //         return;
    //     }
    //     await sdkRef.current.logout();
    //     sdkRef.current.hideWallet();
    //     setSmartAccount(null);
    //     setBiconomyAddress("");
    //     enableInterval(false);
    //     <Link href='/index'></Link>
    // };
  return (
    <div className={styles.heading}>
      <h1>WALA</h1>
      {/* <button onClick={logout} className={styles.connect}>
          Logout
      </button> */}
    </div>
  );
}
