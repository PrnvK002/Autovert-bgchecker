import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import ListFields from "../Components/ListFields.component";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader.component";
import { validateStep } from "../validation/validator";
import { udpateDetails } from "../redux/reducer/user.reducer";

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

enum tabname {
  PERSONALINFO = "personalInfoFields",
  EDUCATION = "educationInfoFeilds",
  PROFESSIONAL = "professionalInfoFields",
  UPLOADDOCS = "docFields",
}

//the idea is to fetch the order of the stepper on the first api and then fetch the fields essential and their type of input from the next click of next button
export default function BacgroundVerification() {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState("");
  let wholeData: any = {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, user, loading, fields, success }: any = useSelector(
    (state: IRootState) => state.userReducer
  );

  useEffect(() => {
    console.log("orer", typeof order);
    if (order.length) setSteps(order);
  }, [order]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      navigate("/login");
    }
  }, [user]);

  const handleSubmit = () => {
    const fieldData: any = Object.keys(data).map((field: string) => {
      return {
        fieldName: field,
        value: data[field],
      };
    });
    dispatch(
      udpateDetails({
        type: order[activeStep],
        fieldData: fieldData,
      }) as any
    );
  };

  const handleNext = () => {
    console.log("setdata", data);
    const err = validateStep(fields, data, tabname[steps[activeStep]]);
    if (err) {
      setError(err);
    } else {
      wholeData[activeStep] = data;
      setData({});
      handleSubmit();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setData(wholeData[activeStep - 1]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        bgcolor: "success.main",
      }}
      className="p-10 h-screen"
    >
      <Loader open={loading} />
      <Stepper activeStep={activeStep}>
        {steps.length > 0
          ? steps?.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <Typography color="secondary">{label}</Typography>
                  </StepLabel>
                </Step>
              );
            })
          : ""}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <Box>
          <div className="min-h-[80vh] pt-10">
            {error.length ? (
              <p className="text-red-600 text-sm text-center">{error}</p>
            ) : (
              ""
            )}
            <ListFields
              tab={tabname[steps[activeStep]]}
              fields={fields}
              setData={setData}
              data={data}
            />
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
