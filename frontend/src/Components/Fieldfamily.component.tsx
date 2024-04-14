import {
  field,
  fieldfamilyproptype,
  fieldKeys,
  fields,
} from "../types/fieldprop.type";
import Field from "./Field.component";

export default function FieldFamily({
  name,
  fields,
  setFielddata,
}: fieldfamilyproptype) {
  const handleChange = (key: string, value: any, index: number) => {
    console.log(key, value, index, name);
    setFielddata((prev: any) => {
      let updated: any[] = JSON.parse(JSON.stringify([...prev[`${name}`]]));
      updated[index][key] = value;
      return { ...prev, [name]: updated };
    });
  };

  return (
    <div className="my-6">
      <h1>{fieldKeys[name]}</h1>
      {fields?.length
        ? fields?.map((field: field, index: number) => {
            return (
              <Field
                key={field.name}
                name={field.name}
                visibility={field.visibilty}
                type={field.type}
                inputType={field.inputType}
                handleChange={handleChange}
                index={index}
              />
            );
          })
        : ""}
    </div>
  );
}
