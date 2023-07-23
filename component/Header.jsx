import styles from "@/styles/Profile.module.css";
// import SocialLogin from "@biconomy/web3-auth";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const sdkRef = useRef(null);
  const router = useRouter();

  const logout = async () => {
    if (!sdkRef.current) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    router.push("/");
  };

  return (
    <div className={styles.heading}>
      <h1>WALA</h1>
      <button onClick={logout} className={styles.connect}>
        Logout
      </button>
    </div>
  );
}
