import React from "react";
import { SketchPicker } from "react-color";
import { Colorpickerprops } from "../types/template.type";

export default function Colorpicker({
  color,
  setColor,
  name,
}: Colorpickerprops) {
  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };
  return (
    <div className="ms-4 ">
      {name}
      <SketchPicker
        className="mt-3"
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
}
