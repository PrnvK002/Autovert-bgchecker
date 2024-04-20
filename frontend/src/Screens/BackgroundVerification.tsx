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
import { logout, udpateDetails } from "../redux/reducer/user.reducer";
import { handleFileupload } from "../utils/fileupload.util";
import { useForm } from "react-hook-form";
// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
import VerifiedImage from "../assets/Verified.png";

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
  // const [data, setData] = useState<any>({});
  const [error, setError] = useState("");
  let wholeData: any = {};
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, user, loading, fields, success }: any = useSelector(
    (state: IRootState) => state.userReducer
  );

  useEffect(() => {
    if (order.length) setSteps(order);
  }, [order]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      navigate("/login");
    }
  }, [user]);

  const onSubmit = async (data: any) => {
    const fieldData: any[] = [];

    await Promise.all(
      Object.keys(data).map(async (field) => {
        if (
          typeof data[field] !== "string" &&
          typeof data[field] !== "number" &&
          typeof data[field] !== "boolean"
        ) {
          try {
            const file = await handleFileupload(data[field][0]);
            console.log("file", file, field);
            fieldData.push({
              fieldName: field,
              value: file,
            });
          } catch (err) {
            console.log("error on upload", err);
          }
        } else {
          fieldData.push({
            fieldName: field,
            value: String(data[field]),
          });
        }
      })
    );

    dispatch(
      udpateDetails({
        type: order[activeStep],
        fieldData: fieldData,
      }) as any
    );
  };

  const handleNext = (data: any) => {
    console.log("setdata", data);
    const err = validateStep(fields, data, tabname[steps[activeStep]]);
    console.log("error", err);

    if (err) {
      setError(err);
    } else {
      setError("");
      wholeData[activeStep] = data;
      onSubmit(data);
      // setData({});
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      reset();
    }
  };

  const handleDone = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        bgcolor: "success.main",
      }}
      className="p-10 h-screen flex justify-center"
    >
      <div className="w-8/12">
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
          <>
            <div className="min-h-[80vh] pt-10 flex flex-col justify-center items-center">
              <h1 className="font-bold mb-3">
                You have successfully Verified. Thank you For your Response.
              </h1>
              <img className="w-2/5" src={VerifiedImage} alt="loading..." />
              <Button type="submit" onClick={handleDone}>
                Done
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(handleNext)}>
            <div className="min-h-[80vh] pt-10">
              {error.length ? (
                <p className="text-red-600 text-sm text-center">{error}</p>
              ) : (
                ""
              )}
              <ListFields
                tab={tabname[steps[activeStep]]}
                register={register}
                fields={fields}
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
              <Button type="submit">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </form>
        )}
      </div>
    </Box>
  );
}
