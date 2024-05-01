import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PhotoGuidelines from "./PhotoGuidelines";
import DisclaimerText from "../../MainComponents/Miscellaneous/DisclaimerText";
import Input from "@mui/material/Input";
import { handleFileChange } from "./UploadFileUtils";
import { ToastContainer } from "react-toastify";

interface UploadPhotoFormProps {
  onNext: (data: { photo: string }) => void;
  onBack: () => void;
  activeStep: number;
  initialValues?: {
    photo: string;
  };
}

export function UploadPhotoForm({
  onNext,
  onBack,
  activeStep,
  initialValues,
}: UploadPhotoFormProps) {
  const [photo, setPhoto] = React.useState("");

  React.useEffect(() => {
    // Set initial values when initialValues change
    if (initialValues) {
      setPhoto(initialValues.photo || "");
    }
  }, [initialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext({ photo });
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
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
            Upload photo
          </Typography>

          <div>
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
            <Input
              type="file"
              onChange={handleFile}
              style={{ display: "none" }} // Hide the input visually
              inputProps={{ accept: "image/*" }} // Specify accepted file types
              id="upload-photo"
            />
            <label htmlFor="upload-photo">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  color: "secondary.main",
                  borderColor: "secondary.main",
                }}
              >
                Upload Photo
              </Button>
            </label>
          </div>

          <form id="upload-photo-form" onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <DisclaimerText>PNG or JPEG, max 10MB</DisclaimerText>
              <PhotoGuidelines></PhotoGuidelines>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-around"
              alignItems="center"
              sx={{
                pt: "2rem",
              }}
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
