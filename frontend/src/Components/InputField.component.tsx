import React from "react";
import { InputFieldprops } from "../types/fieldprop.type";
// import TextField from "@mui/material/TextField";

export default function InputField({
  name,
  inputType,
  register,
  options,
}: InputFieldprops) {
  return (
    <div className="mt-5">
      <label htmlFor={name}>{name}</label>
      <br />
      {inputType === "radio" ? (
        options.length ? (
          options.map((option: any) => {
            return (
              <React.Fragment key={option}>
                <input
                  {...register(name)}
                  className="ms-3"
                  type="radio"
                  value={option}
                  id="field-wind"
                />
                <label className="ms-2" htmlFor="field-wind">{option}</label>
              </React.Fragment>
            );
          })
        ) : (
          ""
        )
      ) : inputType === "select" ? (
        <select
          className="rounded-md h-8 w-80 p-3"
          name={name}
          {...register(name)}
          id="selectoption"
        >
          {options.map((option: any) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          className="rounded-md h-8 w-80 p-3"
          placeholder={name}
          type={inputType}
          name={name}
          {...register(name)}
        />
      )}
    </div>
  );
}
