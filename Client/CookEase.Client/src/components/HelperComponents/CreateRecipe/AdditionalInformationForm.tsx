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

interface BasicInformationFormProps {
  onNext: (data: {
    difficulty: string;
    prepTime: number;
    cookTime: number;
    calories: number;
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
    prepTime: number;
    cookTime: number;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
}

export function AdditionalInformationForm({
  onNext,
  onBack,
  activeStep,
  initialValues,
}: BasicInformationFormProps) {
  const [difficulty, setDifficulty] = React.useState("");
  const [prepTime, setPrepTime] = React.useState(0);
  const [cookTime, setCookTime] = React.useState(0);
  const [calories, setCalories] = React.useState(0);
  const [carbs, setCarbs] = React.useState(0);
  const [protein, setProtein] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [fiber, setFiber] = React.useState(0);
  const [sugar, setSugar] = React.useState(0);

  useEffect(() => {
    if (initialValues) {
      setDifficulty(initialValues.difficulty || "");
      setPrepTime(initialValues.prepTime || 0);
      setCookTime(initialValues.cookTime || 0);
      setCalories(initialValues.calories || 0);
      setCarbs(initialValues.carbs || 0);
      setProtein(initialValues.protein || 0);
      setFat(initialValues.fat || 0);
      setFiber(initialValues.fiber || 0);
      setSugar(initialValues.sugar || 0);
    }
  }, [initialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!difficulty || !calories || !cookTime || !prepTime || !carbs || !protein || !sugar || !fiber || !fat) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }
    // Send form data to parent component
    onNext({
      difficulty,
      prepTime,
      cookTime,
      calories,
      carbs,
      protein,
      fat,
      fiber,
      sugar,
    });
  };

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
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Cook time (minutes)*"
                  value={cookTime}
                  onChange={(e) => setCookTime(Number(e.target.value))}
                  fullWidth
                />

                <TextField
                  label="Preparation time (minutes)*"
                  value={prepTime}
                  onChange={(e) => setPrepTime(Number(e.target.value))}
                  fullWidth
                />
              </Stack>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Recipe nutrition
              </Typography>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Calories (g)*"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  fullWidth
                />

                <TextField
                  label="Carbs (g)*"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  fullWidth
                />

                <TextField
                  label="Protein (g)*"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  fullWidth
                />

                <TextField
                  label="Fat (g)*"
                  value={fat}
                  onChange={(e) => setFat(Number(e.target.value))}
                  fullWidth
                />

                <TextField
                  label="Fiber (g)*"
                  value={fiber}
                  onChange={(e) => setFiber(Number(e.target.value))}
                  fullWidth
                />

                <TextField
                  label="Sugar (g)*"
                  value={sugar}
                  onChange={(e) => setSugar(Number(e.target.value))}
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
