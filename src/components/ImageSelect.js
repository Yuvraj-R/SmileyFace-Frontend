// ImageSelect.js
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ImageSelect({ imageOptions, setImage }) {
  const [selectedImage, setSelectedImage] = React.useState(""); // Local state for selected image

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedImage(selectedValue);
    setImage(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            transformOrigin: "0px -200%",
            color: "rgb(232, 209, 82)",
            "&.Mui-focused": { color: "rgb(232, 209, 82)" },
          }}
        >
          Select File:
        </InputLabel>
        <Select
          className="image-select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Image"
          value={selectedImage} // Use local state for the initial value
          onChange={handleChange}
          sx={{
            color: "white",
            border: "1px solid rgb(232, 209, 82)",
            "&.Mui-focused": {
              border: "1px solid rgb(232, 209, 82)",
            },
          }}
        >
          {imageOptions.map((option, index) => (
            <MenuItem key={option._id} value={option.data}>
              Image {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
