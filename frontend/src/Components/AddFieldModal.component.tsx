import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AddfieldModalProps } from "../types/fieldprop.type";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Option from "./Option.component";

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

export default function Addfieldmodal({
  open,
  handleClose,
  handleSubmit,
}: AddfieldModalProps) {
  const [category, setCategory] = useState<string>("personalInfoFields");
  const [name, setName] = useState<string>("");
  const [inputType, setInputtype] = useState<string>("text");
  const [options, setOptions] = useState<any>([]);
  const [option, setOption] = useState<string>("");
  const [rules, setRules] = useState<any>([]);
  const [err, setErr] = useState<string>("");
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  useEffect(() => {
    console.log("optins use", options);
  }, [options]);

  const handleAddoption = () => {
    console.log("callling addoptin", option);

    setOptions((prev: string[]) => {
      if (!prev.includes(option)) {
        console.log(prev);
        return [...prev, option];
      } else {
        return prev;
      }
    });
    setOption("");
  };

  const handleAddrules = (name: string) => {
    setRules((prev: string[]) => {
      if (!prev.includes(name)) {
        console.log(prev);
        return [...prev, name];
      } else {
        return prev.filter((e) => e !== name);
      }
    });
  };

  const handleRemoveOption = (i: number) => {
    setOptions((prev: any) =>
      prev.filter((e: string, index: number) => i !== index)
    );
  };

  const resetStates = () => {
    setName("");
    setOptions([]);
    setOption("");
    setRules([]);
    setMin(undefined);
    setMax(undefined);
  };

  const validate = () => {
    console.log("calling validate", name);
    if (name.length) {
      if (rules.length) {
        if (rules.includes("minlength")) {
          if (!min) {
            setErr("Please add what should be the minlength should be!");
          } else {
            let tempRules: any[] = [];
            rules.map((e: string) => {
              if (e === "minlength") {
                tempRules.push({
                  ruleName: e,
                  value: min,
                });
              } else if (e === "maxlength") {
                tempRules.push({
                  ruleName: e,
                  value: max,
                });
              } else {
                tempRules.push({
                  ruleName: e,
                  value: true,
                });
              }
            });
            if (inputType === "radio" || inputType === "select") {
              if (options.length) {
                handleSubmit({ category, name, inputType, options });
                setErr("");
              } else {
                setErr(
                  "For the selected input type need options additionally!"
                );
              }
            } else {
              handleSubmit({
                category,
                name,
                inputType,
                options,
                rules: tempRules,
              });
              setErr("");
            }
          }
        }
        if (rules.includes("maxlength")) {
          if (!max) {
            setErr("Please add what should be the minlength should be!");
          } else {
            let tempRules: any[] = [];
            rules.map((e: string) => {
              if (e === "minlength") {
                tempRules.push({
                  ruleName: e,
                  value: min,
                });
              } else if (e === "maxlength") {
                tempRules.push({
                  ruleName: e,
                  value: max,
                });
              } else {
                tempRules.push({
                  ruleName: e,
                  value: true,
                });
              }
            });
            if (inputType === "radio" || inputType === "select") {
              if (options.length) {
                handleSubmit({
                  category,
                  name,
                  inputType,
                  options,
                  rules: tempRules,
                });
                setErr("");
              } else {
                setErr(
                  "For the selected input type need options additionally!"
                );
              }
            } else {
              handleSubmit({
                category,
                name,
                inputType,
                options,
                rules: tempRules,
              });
              setErr("");
            }
          }
        }
        if (
          rules.includes("required") ||
          rules.includes("onlynumbers") ||
          rules.includes("onlycharacters")
        ) {
          let tempRules: any[] = [];
          rules.map((e: string) => {
            if (e === "minlength") {
              tempRules.push({
                ruleName: e,
                value: min,
              });
            } else if (e === "maxlength") {
              tempRules.push({
                ruleName: e,
                value: max,
              });
            } else {
              tempRules.push({
                ruleName: e,
                value: true,
              });
            }
          });
          if (inputType === "radio" || inputType === "select") {
            if (options.length) {
              handleSubmit({ category, name, inputType, options });
              setErr("");
            } else {
              setErr("For the selected input type need options additionally!");
            }
          } else {
            handleSubmit({
              category,
              name,
              inputType,
              options,
              rules: tempRules,
            });
            setErr("");
          }
        }
      } else {
        if (inputType === "radio" || inputType === "select") {
          if (options.length) {
            handleSubmit({ category, name, inputType, options });
            setErr("");
          } else {
            setErr("For the selected input type need options additionally!");
          }
        } else {
          handleSubmit({ category, name, inputType, options });
          setErr("");
        }
      }
    } else {
      setErr("Please add the name of the field!");
    }
    resetStates();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Add Field</h3>
          {err.length ? <p className="text-red-500 mt-5">{err}</p> : ""}
          <div className="flex justify-around mt-3 mb-2">
            <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
              <InputLabel id="demo-simple-select-label">
                Field Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Field Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="personalInfoFields">Personal Info</MenuItem>
                <MenuItem value="professionalInfoFields">
                  Professional Info
                </MenuItem>
                <MenuItem value="educationInfoFeilds">
                  Education Info Fields
                </MenuItem>
                <MenuItem value="docFields">Doc Fields</MenuItem>
              </Select>
            </FormControl>
            <input
              className="w-52 p-3 border-2 rounded-lg"
              type="text"
              placeholder="Name of the field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl sx={{ marginLeft: "10px", width: "10rem" }}>
              <InputLabel id="demo-simple-select-label">Input Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inputType}
                label="Field Category"
                onChange={(e) => setInputtype(e.target.value)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="file">File</MenuItem>
                <MenuItem value="radio">Radio</MenuItem>
                <MenuItem value="select">Select</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center mt-2">
            <input
              className="w-52 p-3 border-2 rounded-md"
              type="text"
              placeholder="Type in option and click enter to add option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") handleAddoption();
              }}
            />
            <div className="flex">
              {options?.length
                ? options.map((o: string, index: number) => {
                    return (
                      <Option
                        name={o}
                        index={index}
                        handleRemove={handleRemoveOption}
                        editable={true}
                      />
                    );
                  })
                : ""}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mt-3">Validation Rules</h3>
            <div>
              <input
                type="checkbox"
                id="scales"
                name="required"
                onChange={() => handleAddrules("required")}
              />
              <label className="ms-3">Required</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="scales"
                name="onlynumbers"
                onChange={() => handleAddrules("onlynumbers")}
              />
              <label className="ms-3">Only Numbers allowed</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="scales"
                name="onlycharacters"
                onChange={() => handleAddrules("onlycharacters")}
              />
              <label className="ms-3">Only Characters</label>
            </div>
            <div className="mt-3">
              <input
                type="checkbox"
                id="scales"
                name="minlength"
                onChange={() => handleAddrules("minlength")}
              />
              <label className="ms-3">Min Length</label>
              <input
                type="number"
                name="minlength"
                className="ms-3 border-2 w-14"
                value={min}
                onChange={(e: any) => setMin(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <input
                type="checkbox"
                id="scales"
                name="maxlength"
                onChange={() => handleAddrules("maxlength")}
              />
              <label className="ms-3">Max Length</label>
              <input
                type="number"
                name="maxlength"
                className="ms-3 border-2 w-14"
                value={max}
                onChange={(e: any) => setMax(e.target.value)}
              />
            </div>
          </div>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="contained"
            onClick={validate}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
