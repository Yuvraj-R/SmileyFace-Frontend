import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ImageSelect from "../components/ImageSelect";
import ImageUpload from "../components/ImageUpload";
import "../css/Home.css";
const Cookie = require("js-cookie");

export default function Home({ isSignedIn, onSignOut }) {
  const [image, setImage] = useState(null);
  const [imageOptions, setImageOptions] = useState([]);
  const email = Cookie.get("email");

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/images/${email}`);

      if (response.ok) {
        const images = await response.json();
        setImageOptions(images);
      } else {
        console.error(`Failed to fetch images. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  });

  console.log(email);
  console.log(isSignedIn);

  return isSignedIn ? (
    <div className="home-page-wrapper">
      <div className="home-sidebar"></div>
      <div className="home-content-wrapper">
        <div className="home-content">
          <div className="home-header-wrapper">
            <h1>Choose an Image:</h1>
          </div>
          <div className="home-image-selector">
            <ImageSelect
              setImage={setImage}
              label={"Image"}
              imageOptions={imageOptions}
              next={fetchImages}
            />
          </div>
          {image != null && (
            <div className="image">
              <h2 className="home-header-wrapper">Selected Image:</h2>
              <img src={`data:image/jpeg;base64,${image}`} alt="Selected" />
            </div>
          )}
          <div className="home-header-wrapper">
            <h1>Upload an Image:</h1>
          </div>
          <div className="home-image-upload">
            <ImageUpload email={email} onSignOut={onSignOut} fetchImages={fetchImages} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
