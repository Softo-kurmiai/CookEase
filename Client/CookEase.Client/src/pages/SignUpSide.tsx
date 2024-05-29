import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import background from '../images/AuthorizationPhoto.png'
import logo from '../images/BlackLogo.png'
import Link from '@mui/material/Link';
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from 'react-toastify';
import { handleFileChange } from '../components/HelperComponents/CreateRecipe/UploadFileUtils';
import DisclaimerText from '../components/MainComponents/Miscellaneous/DisclaimerText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpSide() {
  const [image, setImage] = React.useState("");

  const navigate = useNavigate();

  const handleNavigationToMainPage = () => {
    navigate('/');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const repeatPassword = data.get('repeatPassword');

    if (password !== repeatPassword){
      toast.error("Passwords do not match!");
    }
    else {
      const combinedData = {
        name: data.get('username'),
        email: data.get('email'),
        password: password,
        profilePicture: image
      };
    
      console.log(combinedData);
    
      try {
        const response = await axios.post('/api/users', combinedData);
        console.log('Response:', response.data);
        navigate('/', { state: { toastMessage: "User created successfully" } });
      } catch (error) {
        toast.error("Something bad happened during the request!");
        console.error('Error creating user:', error);
      }
    }
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container sx={{ height: '100vh'}}>
        <Grid item xs={12} sm={12} md={6} >
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              padding: '0',
              margin: 0
            }}
          >
             <Paper elevation={0} sx={{ width: '30%', cursor: 'pointer'}}>
                <img
                src={logo}
                alt="CookEase Logo"
                style={{ width: '100%', display: 'block', objectFit: 'contain', textAlign:'left'}}
                onClick={handleNavigationToMainPage}
                />
            </Paper>
            <Typography component="h1" variant="h4">
              Finding & posting recipes made easy!
            </Typography>
            <Typography component="h1" variant="h5">
              Sign up here to get started:
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat password once again"
                type="password"
                id="repeatPassword"
              />
              <ToastContainer />
              <Stack spacing={2} sx={{ mt: 2 }}>
                <DisclaimerText>PNG or JPEG, max 10MB</DisclaimerText>
              </Stack>
              <Input
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
                inputProps={{ accept: "image/*" }}
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
                  Upload profile picture
                </Button>
              </label>
              {image &&
                (<Typography component="h6" variant="caption">
                  Profile picture uploaded.
                </Typography>)
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>

              <Typography component="h6" variant="caption">
                  Already have an account?{' '}
                  <Link href="/SignIn" variant="body2" sx={{ marginRigt: '20px' }}>
                    Sign in here
                  </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={0} sm={0} md={6}>
            <Paper elevation={0} sx={{ width: '100%', textAlign:'right'}}>
            <img
            src={background}
            alt="Background image"
            style={{ width: '80%' }}
            />
            </Paper>
        </Grid>

    </Grid>
  );
}