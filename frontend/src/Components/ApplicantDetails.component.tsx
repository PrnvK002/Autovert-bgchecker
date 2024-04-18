import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import ListFieldValues from "./ListFieldValues.component";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface props {
  open: boolean;
  handleClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DetailModal({ open, handleClose }: props) {
  const [value, setValue] = useState(0);
  const tabs = ["personalInfo", "professional", "education", "uploadedDocs"];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { applicant }: any = useSelector(
    (state: IRootState) => state.userReducer
  );

  useEffect(() => {
    console.log("applicant", applicant);
  }, [applicant]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <h3>Applicant Details</h3>
            <button onClick={handleClose}>x</button>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal Info" {...a11yProps(0)} />
              <Tab label="Professional" {...a11yProps(1)} />
              <Tab label="Education" {...a11yProps(2)} />
              <Tab label="Docs" {...a11yProps(2)} />
            </Tabs>
          </Box>
          {Object.keys(applicant).length
            ? applicant[tabs[value]].map((field: any, index: number) => {
                console.log("field on map", field);

                return (
                  <ListFieldValues
                    key={index}
                    fieldname={field.fieldName}
                    value={field.value}
                    tab={tabs[value]}
                  />
                );
              })
            : ""}
        </Box>
      </Modal>
    </>
  );
}
