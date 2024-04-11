import React from "react";
import { Checkbox } from "@mui/material";
import { fieldproptype } from "../types/fieldprop.type";

export default function Field({
  name,
  visibility,
  type,
  inputType,
}: fieldproptype) {
  const handleChange = (e:any) => console.log(e.target.value);

  return (
    <div className="flex">
      <Checkbox
        {...{ inputProps: { "aria-label": "Checkbox demo" } }}
        checked={visibility}
        color="secondary"
        onChange={handleChange}
      />
      <p className="ms-2">{name}</p>
      <p className="ms-3">{type}</p>
      <p className="ms-3">{inputType}</p>
    </div>
  );
}
