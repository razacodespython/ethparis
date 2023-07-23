import React, { useState } from "react";
import styles from "../styles/Marketplace.module.css";
import Image from "next/image";
import Sidebar from "../component/sidebar";
import Header from "../component/Header";

export default function Marketplace() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click and set the selected image
  const handleCollectClick = () => {
    mintNFT();
  };

  // Function to handle click away and close the selected image
  const handleClickAway = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.marketplaceContainer}>
          <h2 className={styles.header}>Marketplace</h2>
          <p className={styles.header}>Use your gift cards within this app.</p>
          <div className={styles.containerGrid}>
          <div
              className={styles.rectangle}
              style={{ backgroundImage: `url('/assets/Bear.png')` }}
            >
              <button onClick={(event) => handleCollectClick(event, "")}>Collect</button>
            </div>
            <div
              className={styles.rectangle}
              style={{ backgroundImage: `url('/assets/apecoin.jpeg')` }}
            >
              <button onClick={(event) => handleCollectClick(event, "/assets/apecoin.jpeg")}>Buy</button>
            </div>
            <div
              className={styles.rectangle}
              style={{ backgroundImage: `url('/assets/uniswap.png')` }}
            >
              <button onClick={(event) => handleCollectClick(event, "/assets/uniswap.png")}>Swap</button>
            </div>
            <div
              className={styles.rectangle}
              style={{ backgroundImage: `url('/assets/aave.jpeg')` }}
            >
              <button onClick={(event) => handleCollectClick(event, "/assets/aave.jpeg")}>Collect</button>
            </div>
            <div
              className={styles.rectangle}
              style={{ backgroundImage: `url('/assets/apecoin.jpeg')` }}
            >
              <button onClick={(event) => handleCollectClick(event, "/assets/apecoin.jpeg")}>Collect</button>
            </div>
            <div
              className={styles.rectangle}
              style={{ backgroundImage: `url('/assets/uniswap.png')` }}
            >
              <button onClick={(event) => handleCollectClick(event, "/assets/uniswap.png")}>Collect</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
