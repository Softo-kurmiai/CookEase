import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import DisclaimerText from "../../MainComponents/Miscellaneous/DisclaimerText";

interface BasicInformationFormProps {
  onNext: (data: {
    recipeName: string;
    servings: string;
    ingredients: string;
    directions: string;
  }) => void;
  onBack: () => void;
  activeStep: number;
  initialValues?: {
    recipeName: string;
    servings: string;
    ingredients: string;
    directions: string;
  };
}

export function BasicInformationForm({
  onNext,
  onBack,
  activeStep,
  initialValues,
}: BasicInformationFormProps) {
  const [recipeName, setRecipeName] = React.useState("");
  const [servings, setServings] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [directions, setDirections] = React.useState("");
  const [isIngredientsFocused, setIsIngredientsFocused] = React.useState(false);
  const [isDirectionsFocused, setIsDirectionsFocused] = React.useState(false);

  React.useEffect(() => {
    // Set initial values when initialValues change
    if (initialValues) {
      setRecipeName(initialValues.recipeName || "");
      setServings(initialValues.servings || "");
      setIngredients(initialValues.ingredients || "");
      setDirections(initialValues.directions || "");
    }
  }, [initialValues]);

  const handleIngredientsFocus = () => {
    setIsIngredientsFocused(true);
  };

  const handleIngredientsBlur = () => {
    setIsIngredientsFocused(false);
  };

  const handleDirectionsFocus = () => {
    setIsDirectionsFocused(true);
  };

  const handleDirectionsBlur = () => {
    setIsDirectionsFocused(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recipeName || !servings || !ingredients || !directions) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    // Send form data to parent component
    onNext({ recipeName, servings, ingredients, directions });
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
            Add basic information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} sx={{ mt: 2 }}>
              <TextField
                label="Recipe Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                required
                sx={{
                  width: "30%",
                }}
              />
              <TextField
                label="Number of Servings"
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                sx={{
                  width: "30%",
                  textAlign: "left",
                }}
                required
              />
              <FormControl sx={{ width: "100%" }} required>
                <FormLabel>Ingredients</FormLabel>
                <TextField
                  id="ingredients"
                  placeholder={`2 Cups of milk\n1 Tablespoon of sugar`} // Define placeholder using template literal
                  multiline
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  onFocus={handleIngredientsFocus}
                  onBlur={handleIngredientsBlur}
                  minRows={5}
                  style={{
                    width: "100%",
                    borderColor: isIngredientsFocused ? "green" : "", // Change border color to green when focused
                  }}
                />
                <DisclaimerText>
                  Please put each ingredient and its measurement on its own
                  line.
                </DisclaimerText>
              </FormControl>
              <FormControl sx={{ width: "100%" }} required>
                <FormLabel>Directions</FormLabel>
                <TextField
                  id="directions"
                  placeholder={`Mix sugar and flour\nMelt butter`} // Define placeholder using template literal
                  multiline
                  value={directions}
                  onChange={(e) => setDirections(e.target.value)}
                  onFocus={handleDirectionsFocus}
                  onBlur={handleDirectionsBlur}
                  minRows={5}
                  style={{
                    width: "100%",
                    borderColor: isDirectionsFocused ? "green" : "", // Change border color to green when focused
                  }}
                />
                <DisclaimerText>
                  Please put each step on its own line.
                </DisclaimerText>
              </FormControl>
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
                  Next
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}