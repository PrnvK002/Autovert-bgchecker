import InputField from "./InputField.component";
import { ListfieldProps, field } from "../types/fieldprop.type";
// import { handleFileupload } from "../utils/fileupload.util";

export default function ListFields({
  tab,
  fields,
  handleDocs,
  register
}: ListfieldProps) {
  // useEffect(() => {
  //   console.log("listfields", fields, tab);
  // }, [fields, tab]);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 w-4/5">
        {fields
          ? fields[tab].map((field: field) =>
              field.visibilty ? (
                <>
                  <InputField
                    name={field.name}
                    inputType={field.inputType}
                    handleDocs={handleDocs}
                    tab={tab}
                    register={register}
                  />
                </>
              ) : (
                <></>
              )
            )
          : ""}
      </div>
    </div>
  );
}
