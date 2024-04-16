import { useEffect } from "react";
import InputField from "./InputField.component";
import { ListfieldProps, field } from "../types/fieldprop.type";

export default function ListFields({
  tab,
  setData,
  data,
  fields,
}: ListfieldProps) {
  useEffect(() => {
    console.log("listfields", fields, tab);
  }, [fields, tab]);
  const handleChange = (e: any) => {
    console.log("event on change", e);
    setData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 w-4/5">
        {fields
          ? fields[tab].map((field: field) => {
              return (
                <>
                  <InputField
                    name={field.name}
                    value={data[field.name]}
                    inputType={field.inputType}
                    handleChange={handleChange}
                  />  
                </>
              );
            })
          : ""}
      </div>
    </div>
  );
}
