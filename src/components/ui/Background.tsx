"use client";

import React, { useEffect, useState } from "react";
import styles from "./Background.module.css";

// add all your image paths here
const images = [
  "/backgrounds/image1.jpg",
  "/backgrounds/image2.jpg",
  "/backgrounds/image3.jpg",
  "/backgrounds/image4.jpg",
  "/backgrounds/image5.jpg",
  "/backgrounds/image6.jpg",
  "/backgrounds/image7.jpg",
  "/backgrounds/image8.jpg",
  "/backgrounds/image9.jpg",
  "/backgrounds/image10.jpg",
  "/backgrounds/image11.jpg",
];

/**
 *
 * @returns background image를 랜덤으로 변경하는 컴포넌트
 */
function Background() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [overlayOpacity, setOverlayOpacity] = useState(0.2); // Default opacity set to 20%

  useEffect(() => {
    console.log("useEffect called"); // 디버그 메시지 추가

    let isMounted = true;

    const setRandomBackgroundImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomIndex];

      // 이미지를 미리 로딩하여 배경이 하얗게 되는 문제를 해결합니다.
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        if (isMounted) {
          setBackgroundImage(selectedImage);
          console.log("New background image set:", selectedImage);
        }
      };
    };

    setRandomBackgroundImage();

    const interval = setInterval(setRandomBackgroundImage, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {backgroundImage && (
        <p className={styles.text}>
          Current background image: {backgroundImage}
        </p>
      )}
      {/* Overlay with adjustable opacity */}
      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      ></div>
      {/* Opacity control slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={overlayOpacity}
        onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
        style={{ position: "absolute", bottom: "20px", left: "20px" }} // Adjust positioning as needed
      />
    </div>
  );
}

export default Background;
