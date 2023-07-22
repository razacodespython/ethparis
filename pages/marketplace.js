import React, { useState } from 'react';
import '../styles/Marketplace.module.css'; // Import the CSS file
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
      <h2>Marketplace</h2>
      <h4>Use your gift cards within this app.</h4>
      <Image
                src='/assets/aave.jpeg'
                alt='Aave'
                width={150}
                height={150}
                layout="responsive"
                
              />
      {selectedImage && (
        <div className="modal" onClick={handleClickAway}>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}
