import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFields,
  resetSuccess,
  updateField,
} from "../redux/reducer/field.reducer";
import { IRootState } from "../redux/store";
import FieldFamily from "../Components/Fieldfamily.component";
import { Button } from "@mui/material";
import SimpleSnackbar from "../Components/Snackbar.component";
import { AddFieldParams } from "../types/fieldprop.type";
import Addfieldmodal from "../Components/AddFieldModal.component";

export default function Fields() {
  const [fieldData, setFielddata] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenmodal] = useState<boolean>(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFields() as any);
  }, []);

  const { fields, loading, success }: any = useSelector(
    (state: IRootState) => state.fieldReducer
  );

  useEffect(() => {
    console.log("fields", fields);
    setFielddata(fields);
  }, [fields]);

  useEffect(() => {
    if (success) {
      setOpen(true);
      dispatch(resetSuccess());
    }
  }, [success]);

  const handleUpdate = () => {
    dispatch(updateField(fieldData) as any);
  };

  const handleOpen = () => {
    setOpenmodal(true);
  };

  const handleSubmit = ({
    category,
    name,
    options,
    inputType,
    rules,
  }: AddFieldParams) => {
    console.log("handlesubmit", category, name, options, inputType, rules);

    setFielddata((prev: any) => {
      if (prev && prev[category]) {
        let temp = JSON.parse(JSON.stringify(prev[category]));
        temp.push({
          name,
          visibilty: true,
          options: options,
          inputType,
          validations: rules,
        });
        return { ...prev, [category]: temp };
      } else {
        return {
          ...prev,
          [category]: [
            {
              name,
              visibilty: true,
              options: options,
              inputType,
              validations: rules,
            },
          ],
        };
      }
    });
    setOpenmodal(false);
  };

  return (
    <div className="p-3">
      <h1 className="font-bold text-lg ms-3 mt-3 mb-3">Fields</h1>
      {fieldData &&
        [
          "personalInfoFields",
          "professionalInfoFields",
          "educationInfoFeilds",
          "docFields",
        ].map((name) => (
          <FieldFamily
            key={name}
            name={name}
            fields={fieldData[name]}
            setFielddata={setFielddata}
          />
        ))}
      <div className="flex my-4">
        <Button variant="contained" disabled={loading} onClick={handleUpdate}>
          Update Fields
        </Button>
        <Button
          sx={{ marginLeft: "1rem" }}
          variant="contained"
          onClick={handleOpen}
        >
          Add New field
        </Button>
      </div>
      <Addfieldmodal
        open={openModal}
        handleClose={() => setOpenmodal(false)}
        handleSubmit={handleSubmit}
      />
      <SimpleSnackbar
        open={open}
        handleClose={() => setOpen(false)}
        message="Successfully updated the Field data."
      />
    </div>
  );
}
