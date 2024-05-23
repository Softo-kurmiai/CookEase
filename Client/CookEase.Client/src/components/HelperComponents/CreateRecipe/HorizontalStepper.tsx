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
import { useNavigate } from "react-router-dom";

const steps = ["Basic information", "Add a photo", "Additional information"];

export function HorizontalStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    categories: "",
    servings: 0,
    ingredients: "",
    instructions: "",
  });
  const [photoData, setPhotoData] = React.useState({
    image: "",
  });

  type AdditionalFormData = {
    difficulty: string;
    prepTime: number;
    cookTime: number;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
};

const [additionalFormData, setAdditionalFormData] = React.useState<AdditionalFormData>({
  difficulty: "",
  prepTime: 0,
  cookTime: 0,
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0,
  fiber: 0,
  sugar: 0
});

const navigate = useNavigate();

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
    name: string;
    description: string;
    categories: string,
    servings: number;
    ingredients: string;
    instructions: string;
  }) => {
    console.log("Basic Information Form Data received:", data);
    setFormData(data);
    handleNext();
  };

  const handlePhotoSubmit = (data: { image: string }) => {
    console.log("Photo Form Data received:", data);
    setPhotoData(data);
    handleNext();
  };

  const handleAdditionalInformationSubmit = async (data: AdditionalFormData) => {
    console.log("Additional information data received:", data);
    setAdditionalFormData(data);
  
    // Combine all form data into a single object
    const combinedData = {
      ...formData,
      ...photoData,
      categories: formData.categories.split(',').map(category => category.trim()),
      recipeNutrition: {
        calories: data.calories,
        carbs: data.carbs,
        fat: data.fat,
        fiber: data.fiber,
        protein: data.protein,
        sugar: data.sugar,
      },
      cookTime: data.cookTime,
      difficulty: data.difficulty,
      prepTime: data.prepTime,
      servings: formData.servings,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      name: formData.name,
      description: formData.description,
      image: photoData.image,
      creatorId: 0 // TO-DO implement with user login session
    };
  
    console.log(combinedData);
  
    try {
      const response = await axios.post('/api/recipes', combinedData);
      toast.success("Recipe created successfully");
      console.log('Response:', response.data);
      handleReset();
      toast.success("Recipe successfully created!"); // TODO: Need to somehow transfer toast to another screen
      navigate('/');
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
