import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { fieldproptype } from "../types/fieldprop.type";
import Option from "./Option.component";

export default function Field({
  name,
  visibility,
  options,
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
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="select">Select</MenuItem>

        </Select>
      </FormControl>
      <div className="flex">
        {options?.length
          ? options.map((o: string, index: number) => {
              return (
                <Option
                  name={o}
                  index={index}
                  handleRemove={() => {}}
                  editable={false}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
