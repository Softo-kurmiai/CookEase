import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CustomInputField from "./CustomInput";

interface BasicInformationFormProps {
  onNext: (data: {
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
  }) => void;
  onBack: () => void;
  activeStep: number;
  initialValues?: {
    difficulty: string;
    totalTime: number;
    totalTimeMeasurement: string;
    prepTime?: number;
    prepTimeMeasurement?: string;
    cookTime?: number;
    cookTimeMeasurement?: string;
    cal?: number;
    calMeasurement?: string;
    carbs?: number;
    protein?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
  };
}

export function AdditionalInformationForm({
  onNext,
  onBack,
  activeStep,
  initialValues,
}: BasicInformationFormProps) {
  const [difficulty, setDifficulty] = React.useState("");
  const [totalTime, setTotalTime] = React.useState("");
  const [totalTimeMeasurement, setTotalTimeMeasurement] = React.useState("");
  const [prepTime, setPrepTime] = React.useState("");
  const [prepTimeMeasurement, setPrepTimeMeasurement] = React.useState("");
  const [cookTime, setCookTime] = React.useState("");
  const [cookTimeMeasurement, setCookTimeMeasurement] = React.useState("");
  const [cal, setCal] = React.useState("");
  const [calMeasurement, setCalMeasurement] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [fat, setFat] = React.useState("");
  const [fiber, setFiber] = React.useState("");
  const [sugar, setSugar] = React.useState("");

  useEffect(() => {
    if (initialValues) {
      setDifficulty(initialValues.difficulty || "");
      setTotalTime(initialValues.totalTime?.toString() || "");
      setTotalTimeMeasurement(initialValues.totalTimeMeasurement || "");
      setPrepTime(initialValues.prepTime?.toString() || "");
      setPrepTimeMeasurement(initialValues.prepTimeMeasurement || "");
      setCookTime(initialValues.cookTime?.toString() || "");
      setCookTimeMeasurement(initialValues.cookTimeMeasurement || "");
      setCal(initialValues.cal?.toString() || "");
      setCalMeasurement(initialValues.calMeasurement || "");
      setCarbs(initialValues.carbs?.toString() || "");
      setProtein(initialValues.protein?.toString() || "");
      setFat(initialValues.fat?.toString() || "");
      setFiber(initialValues.fiber?.toString() || "");
      setSugar(initialValues.sugar?.toString() || "");
    }
  }, [initialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!difficulty) {
      toast.error("Field difficulty is required!");
      return;
    }
    if (!totalTime || Number(totalTime) == 0) {
      toast.error("Field total time is required!");
      return;
    }
    if (!totalTimeMeasurement) {
      toast.error("Field total time measurement is required!");
      return;
    }
    // Send form data to parent component
    onNext({
      difficulty,
      totalTime: Number(totalTime),
      totalTimeMeasurement,
      prepTime: Number(prepTime),
      prepTimeMeasurement,
      cookTime: Number(cookTime),
      cookTimeMeasurement,
      cal: Number(cal),
      calMeasurement,
      carbs: Number(carbs),
      protein: Number(protein),
      fat: Number(fat),
      fiber: Number(fiber),
      sugar: Number(sugar),
    });
  };

  const handleTotalTimeValueChange = (value: string) => {
    setTotalTime(value);
    console.log(value);
  };

  const handleTotalTimeMeasurementChange = (measurement: string) => {
    setTotalTimeMeasurement(measurement);
    console.log(measurement);
  };

  const handlePrepTimeValueChange = (value: string) => {
    setPrepTime(value);
    console.log(value);
  };

  const handlePrepTimeMeasurementChange = (measurement: string) => {
    setPrepTimeMeasurement(measurement);
    console.log(measurement);
  };

  const handleCookTimeValueChange = (value: string) => {
    setCookTime(value);
    console.log(value);
  };

  const handleCookTimeMeasurementChange = (measurement: string) => {
    setCookTimeMeasurement(measurement);
    console.log(measurement);
  };

  const handleCalValueChange = (value: string) => {
    setCal(value);
    console.log(value);
  };

  const handleCalMeasurementChange = (measurement: string) => {
    setCalMeasurement(measurement);
    console.log(measurement);
  };

  const timeMeasurementOptions = ["min", "h", "days"];
  const calorieMeasumentOptions = ["kj", "cal"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "70%" }}>
        <CardContent
          sx={{
            padding: "2rem",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Additional information
          </Typography>
          <form onSubmit={handleSubmit}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ToastContainer />
            <Stack spacing={4} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <FormLabel>Difficulty*</FormLabel>
                <TextField
                  select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  fullWidth
                  sx={{
                    width: "40%",
                  }}
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
              </FormControl>

              <Stack></Stack>
              <CustomInputField
                labelName="Total Time to Prepare*"
                value={totalTime}
                measurement={totalTimeMeasurement}
                onChangeValue={handleTotalTimeValueChange}
                onChangeMeasurement={handleTotalTimeMeasurementChange}
                measurementOptions={timeMeasurementOptions}
              />

              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                Optional information
              </Typography>

              <Stack direction="row" spacing={1}>
                <CustomInputField
                  labelName="Total prep time"
                  value={prepTime}
                  measurement={prepTimeMeasurement}
                  onChangeValue={handlePrepTimeValueChange}
                  onChangeMeasurement={handlePrepTimeMeasurementChange}
                  measurementOptions={timeMeasurementOptions}
                />
                <CustomInputField
                  labelName="Total cook time"
                  value={cookTime}
                  measurement={cookTimeMeasurement}
                  onChangeValue={handleCookTimeValueChange}
                  onChangeMeasurement={handleCookTimeMeasurementChange}
                  measurementOptions={timeMeasurementOptions}
                />
              </Stack>

              <CustomInputField
                labelName="Calories"
                value={cal}
                measurement={calMeasurement}
                onChangeValue={handleCalValueChange}
                onChangeMeasurement={handleCalMeasurementChange}
                measurementOptions={calorieMeasumentOptions}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Carbs"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Protein"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Fat"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Fiber"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                  fullWidth
                />

                <TextField
                  label="Sugar"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  fullWidth
                />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  onClick={onBack}
                  disabled={activeStep === 0}
                  sx={{
                    width: "200px",
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#FFFFFF",
                    width: "200px",
                    "&:hover": {
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "primary.main",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
