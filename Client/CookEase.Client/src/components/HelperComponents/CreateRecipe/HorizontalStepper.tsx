import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BasicInformationForm } from "./BasicInformationForm";
import { UploadPhotoForm } from "./UploadPhotoForm";
import { AdditionalInformationForm } from "./AdditionalInformationForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const steps = ["Basic information", "Add a photo", "Additional information"];

export function HorizontalStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [formData, setFormData] = React.useState({
    recipeName: "",
    servings: "",
    ingredients: "",
    directions: "",
  });
  const [photoData, setPhotoData] = React.useState({
    photo: "",
  });

  type AdditionalFormData = {
    difficulty: string;
    totalTime: number;
    totalTimeMeasurement: string;
    prepTime: number;
    prepTimeMeasurement: string;
    cookTime: number;
    cookTimeMeasurement: string;
    cal: number;
    calMeasurement: string;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
};

const [additionalFormData, setAdditionalFormData] = React.useState<AdditionalFormData>({
  difficulty: "",
  totalTime: 0,
  totalTimeMeasurement: "",
  prepTime: 0,
  prepTimeMeasurement: "",
  cookTime: 0,
  cookTimeMeasurement: "",
  cal: 0,
  calMeasurement: "",
  carbs: 0,
  protein: 0,
  fat: 0,
  fiber: 0,
  sugar: 0
});

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleBasicInformationSubmit = (data: {
    recipeName: string;
    servings: string;
    ingredients: string;
    directions: string;
  }) => {
    console.log("Basic Information Form Data received:", data);
    setFormData(data);
    handleNext();
  };

  const handlePhotoSubmit = (data: { photo: string }) => {
    console.log("Photo Form Data received:", data);
    setPhotoData(data);
    handleNext();
  };

  const handleAdditionalInformationSubmit = async (data: {
    difficulty: string;
    totalTime: number;
    totalTimeMeasurement: string;
    prepTime: number;
    prepTimeMeasurement: string;
    cookTime: number;
    cookTimeMeasurement: string;
    cal: number;
    calMeasurement: string;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
}) => {
    console.log("Additional information data received:", data);
    setAdditionalFormData(data);

    // Combine all form data into a single object
    const combinedData = {
      ...formData,
      ...photoData,
      ...additionalFormData,
    };

    try {
      const response = await axios.post('/api/recipes', combinedData);
      toast.success("Recipe created successfully");
      console.log('Response:', response.data);
      // Optionally, reset or navigate to another page
      handleReset();
    } catch (error) {
      toast.error("Something bad happened during the request!");
      console.error('Error creating recipe:', error);
    }
};

  const stepsComponents = [
    <BasicInformationForm
      onNext={handleBasicInformationSubmit}
      onBack={handleBack}
      activeStep={activeStep}
      initialValues={formData}
    />,
    <UploadPhotoForm
      onNext={handlePhotoSubmit}
      onBack={handleBack}
      activeStep={activeStep}
      initialValues={photoData}
    />,
    <AdditionalInformationForm
      onNext={handleAdditionalInformationSubmit}
      onBack={handleBack}
      activeStep={activeStep}
      initialValues={additionalFormData}
    />,
  ];

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto", // Center horizontally
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center vertically
      }}
    >
      <ToastContainer />
      <Stepper activeStep={activeStep} sx={{width:"65%", pb:"2rem"}}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
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
        // Render the component corresponding to the active step
        <Box sx={{width: "80%"}}>
          {stepsComponents[activeStep]}
        </Box>
      )}
    </Box>
  );
}

export default HorizontalStepper;
