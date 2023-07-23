import { useState } from "react";
import Sidebar from "../component/sidebar";
import Header from "../component/Header";
import styles from "@/styles/Profile.module.css";

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.profile}>
          <h2 className={styles.header}>Profile</h2>
          <div className={styles.uploadContainer}>
            {!selectedImage && (
              <label className={styles.customFileUpload}>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
                <img src='/upload.png' alt='upload image' />
              </label>
            )}
            {selectedImage && (
              <img src={selectedImage} alt='Selected' height={200} />
            )}
          </div>
          <div className={styles.inputHeader}>Company Name</div>
          <input
            type='text'
            required
            className={styles.inputSearch}
            placeholder='Company Name'
          />
          <div className={styles.inputHeader}>Email</div>
          <input
            type='text'
            required
            className={styles.inputSearch}
            placeholder='Email'
          />
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </>
  );
}
