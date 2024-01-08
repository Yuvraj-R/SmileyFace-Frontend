import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ImageSelect from "../components/ImageSelect";

const imageOptions = [
  { value: "image1", label: "Image 1" },
  { value: "image2", label: "Image 2" },
  { value: "image3", label: "Image 3" },
  // Add more images as needed
];

export default function Home({ isSignedIn }) {
  return isSignedIn ? (
    <div className="home-page-wrapper">
      <div className="home-sidebar"></div>
      <div className="home-content-wrapper">
        <div className="home-content">
          <div className="home-header-wrapper">
            <h1>Choose an Image:</h1>
          </div>
          <div className="home-image-selector">
            <ImageSelect label={"Image"} imageOptions={imageOptions} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
