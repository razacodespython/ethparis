import React, { useState } from "react";
import styles from "../styles/Marketplace.module.css";
import Image from "next/image";
import Sidebar from "../component/sidebar";
import Header from "../component/Header";

export default function Marketplace() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click and set the selected image
  const handleImageClick = (image) => {
    setSelectedImage(image);
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
              onClick={() => handleImageClick("/assets/aave.jpeg")}
              style={{ backgroundImage: `url('/assets/aave.jpeg')` }}
            />
            <div
              className={styles.rectangle}
              onClick={() => handleImageClick("/assets/apecoin.jpeg")}
              style={{ backgroundImage: `url('/assets/apecoin.jpeg')` }}
            />
            <div
              className={styles.rectangle}
              onClick={() => handleImageClick("/assets/uniswap.png")}
              style={{ backgroundImage: `url('/assets/uniswap.png')` }}
            />
            <div
              className={styles.rectangle}
              onClick={() => handleImageClick("/assets/aave.jpeg")}
              style={{ backgroundImage: `url('/assets/aave.jpeg')` }}
            />
            <div
              className={styles.rectangle}
              onClick={() => handleImageClick("/assets/apecoin.jpeg")}
              style={{ backgroundImage: `url('/assets/apecoin.jpeg')` }}
            />
            <div
              className={styles.rectangle}
              onClick={() => handleImageClick("/assets/uniswap.png")}
              style={{ backgroundImage: `url('/assets/uniswap.png')` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
