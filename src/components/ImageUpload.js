import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Navigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadButton = styled(Button)({
  backgroundColor: "rgb(232, 209, 82)",
  height: "5vh",
  color: "black",
  whiteSpace: "nowrap",
  "&:hover": {
    height: "5vh",
  },
});

export default function ImageUpload({ email, onSignOut, fetchImages }) {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!email) {
      onSignOut();
      return <Navigate to="/sign-in" replace />;
    }

    try {
      if (!image) {
        setMessage("Please choose an image");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("image", image);

      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle successful upload, e.g., show a success message
        setMessage("Image uploaded successfully");
        fetchImages();
      } else {
        // Handle bad request
        const errMessage = await response.json();
        if (errMessage.error === "Provide an email address") {
          onSignOut();
          return <Navigate to="/sign-in" replace />;
        }
        setMessage("Error uploading image: " + errMessage.error);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      setMessage("Error uploading image");
    }
  };

  return (
    <div className="upload-image">
      <UploadButton component="label" variant="contained">
        Select An Image
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </UploadButton>
      <UploadButton
        component="label"
        variant="contained"
        onClick={handleUpload}
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
      </UploadButton>
      <p>{message}</p>
    </div>
  );
}
