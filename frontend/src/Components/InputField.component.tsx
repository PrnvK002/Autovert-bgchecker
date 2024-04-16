import { InputFieldprops } from "../types/fieldprop.type";
import TextField from "@mui/material/TextField";

export default function InputField({
  name,
  value,
  inputType,
  handleChange,
}: InputFieldprops) {
  return (
    <div className="mt-5">
      {/* <label htmlFor={name}>{name}</label>
      <br />
      <input
        className="border-2 rounded w-80 h-11 p-3"
        type={inputType}
        onChange={handleChange}
        name={name}
        value={value}
      /> */}
      <TextField
        color="primary"
        id="outlined-basic"
        value={value}
        type={inputType}
        label={name}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
}
