import React, { useState } from 'react';
import styles from '../styles/Marketplace.module.css'; // Import the CSS module
import Image from 'next/image';

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
    <div>
      <h2 className={styles.header}>Marketplace</h2>
      <p className={styles.header}>Use your gift cards within this app.</p>
      <div className={styles.container}>
        <div
          className={styles.rectangle}
          onClick={() => handleImageClick('/assets/aave.jpeg')}
        >
          <Image
            src='/assets/aave.jpeg'
            alt='Aave'
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
        <div
          className={styles.rectangle}
          onClick={() => handleImageClick('/assets/apecoin.jpeg')}
        >
          <Image
            src='/assets/apecoin.jpeg'
            alt='Aave'
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
        <div
          className={styles.rectangle}
          onClick={() => handleImageClick('/assets/uniswap.png')}
        >
          <Image
            src='/assets/uniswap.png'
            alt='Aave'
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
        <div
          className={styles.rectangle}
          onClick={() => handleImageClick('/assets/aave.jpeg')}
        >
          <Image
            src='/assets/aave.jpeg'
            alt='Aave'
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
        <div
          className={styles.rectangle}
          onClick={() => handleImageClick('/assets/aave.jpeg')}
        >
          <Image
            src='/assets/aave.jpeg'
            alt='Aave'
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
        <div
          className={styles.rectangle}
          onClick={() => handleImageClick('/assets/aave.jpeg')}
        >
          <Image
            src='/assets/aave.jpeg'
            alt='Aave'
            width={150}
            height={150}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
