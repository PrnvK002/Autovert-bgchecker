import { InputFieldprops } from "../types/fieldprop.type";
// import TextField from "@mui/material/TextField";

export default function InputField({
  name,
  inputType,
  register,
}: InputFieldprops) {
  return (
    <div className="mt-5">
      <label htmlFor={name}>{name}</label>
      <br />
      {/* {
        tab === 'docFields' ? 
        <Field
        className="rounded-md h-8 w-80 p-3"
        placeholder={name}
        type={inputType}
        name={name}
        value={value ? value : ""}
        onChange={handleDocs}
      /> 
      : 
    } */}
      <input
        className="rounded-md h-8 w-80 p-3"
        placeholder={name}
        type={inputType}
        name={name}
        {...register(name)}
      />
    </div>
  );
}
