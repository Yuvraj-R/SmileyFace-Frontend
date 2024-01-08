import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ImageSelect({ imageOptions }) {
  const [image, setImage] = React.useState("");

  const handleChange = (event) => {
    setImage(event.target.value);
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
          value={image}
          label="Image"
          onChange={handleChange}
          sx={{
            border: "1px solid rgb(232, 209, 82)",
            "&.Mui-focused": {
              border: "1px solid rgb(232, 209, 82)",
            },
          }}
        >
          {imageOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
