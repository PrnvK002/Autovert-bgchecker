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

  const { fields, loading, success } = useSelector(
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
    inputType,
    type,
  }: AddFieldParams) => {
    setFielddata((prev: any) => {
      let temp = prev[category];
      console.log("temp",temp);
      
      temp.push({ name, visibilty: true, type, inputType });
      return { ...prev, [category]: temp };
    });
  };

  return (
    <>
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
          Update Template
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
    </>
  );
}
