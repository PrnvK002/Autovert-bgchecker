import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemplate, resetSuccess, updateTemplate } from "../redux/reducer/template.reducer";
import { IRootState } from "../redux/store";
import Button from "@mui/material/Button";
import Colorpicker from "../Components/Colorpicker.component";
import SimpleSnackbar from '../Components/Snackbar.component';

export default function Templates() {
  const [labelColor, setLabelColor] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");
  const [bgColor, setbgColor] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false)

  const dispatch = useDispatch();
  const { template, loading,success } = useSelector(
    (state: IRootState) => state.templateReducer
  );

  const templateData = [
    {
      name: "Label Color",
      color: labelColor,
      setColor: setLabelColor,
    },
    {
      name: "Heading Color",
      color: fontColor,
      setColor: setFontColor,
    },
    {
      name: "Background Color",
      color: bgColor,
      setColor: setbgColor,
    },
  ];

  useEffect(() => {
    if (Object.keys(template).length) {
      setbgColor(template?.bgColor!);
      setFontColor(template?.headingColor!);
      setLabelColor(template?.labelColor!);
    }
  }, [template]);

  useEffect(() => {
    dispatch(getTemplate() as any);
  }, []);

  useEffect(() => {
    if(success){
      setOpen(true);
      dispatch(resetSuccess());
    }
  },[success])

  const handleUpdate = () => {
    dispatch(
      updateTemplate({
        labelColor: labelColor,
        headingColor: fontColor,
        bgColor: bgColor,
      }) as any
    );
  };

  return (
    <>
      <div className="flex mt-4">
        {templateData.map((temp) => {
          return <Colorpicker key={temp.name} {...temp} />;
        })}
      </div>
      <div className="ms-3 mt-4">
        <Button variant="contained" disabled={loading} onClick={handleUpdate}>
          Update Template
        </Button>
      </div>
      <SimpleSnackbar open={open} handleClose={() => setOpen(false)} message="Successfully updated the Template." />
    </>
  );
}
