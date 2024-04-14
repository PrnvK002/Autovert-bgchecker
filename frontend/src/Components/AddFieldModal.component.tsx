import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AddfieldModalProps } from "../types/fieldprop.type";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Addfieldmodal({
  open,
  handleClose,
  handleSubmit,
}: AddfieldModalProps) {
  const [category, setCategory] = useState<string>("personalInfoFields");
  const [name, setName] = useState<string>("");
  const [inputType, setInputtype] = useState<string>("text");
  const [type, setType] = useState<string>("String");
  const [err, setErr] = useState<string>("");

  const validate = () => {
    if (name.length) {
      handleSubmit({ category, name, inputType, type });
      setErr("");
    } else {
      setErr("Please add the name of the field!");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Add Field</h3>
          {err.length ? <p className="text-red-500 mt-5">{err}</p> : ""}
          <div className="flex justify-around mt-1 mb-2">
            <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
              <InputLabel id="demo-simple-select-label">
                Field Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Field Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="personalInfoFields">Personal Info</MenuItem>
                <MenuItem value="professionalInfoFields">
                  Professional Info
                </MenuItem>
                <MenuItem value="educationInfoFeilds">
                  Education Info Fields
                </MenuItem>
                <MenuItem value="docFields">Doc Fields</MenuItem>
              </Select>
            </FormControl>
            <input
              className="w-32 p-3"
              type="text"
              placeholder="Name of the field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
              <InputLabel id="demo-simple-select-label">Input Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Field Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="file">File</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
              <InputLabel id="demo-simple-select-label">Input Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputType}
                label="Field Category"
                onChange={(e) => setInputtype(e.target.value)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="file">File</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
              <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Age"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            onClick={validate}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
