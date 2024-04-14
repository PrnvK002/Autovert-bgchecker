import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { fieldproptype } from "../types/fieldprop.type";

export default function Field({
  name,
  visibility,
  type,
  inputType,
  handleChange,
  index,
}: fieldproptype) {
  // const handleChange = (e: any) => console.log(e.target.value);

  return (
    <div className="flex items-center mt-8">
      <Checkbox
        {...{ inputProps: { "aria-label": "Checkbox demo" } }}
        checked={visibility}
        color="secondary"
        onChange={() => handleChange("visibilty", !visibility, index)}
      />
      <p className="ms-2">{name}</p>
      <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
        <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={(e) => handleChange("type", e.target.value, index)}
        >
          <MenuItem value="String">String</MenuItem>
          <MenuItem value="Number">Number</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
        <InputLabel id="demo-simple-select-label">Input Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputType}
          label="Age"
          onChange={(e) => handleChange("inputType", e.target.value, index)}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="file">File</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
