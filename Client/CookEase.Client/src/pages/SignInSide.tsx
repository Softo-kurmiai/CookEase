import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import background from '../images/AuthorizationPhoto.png';
import logo from '../images/BlackLogo.png';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../utils/AuthContext';

export default function SignInSide() {
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
  
    const combinedData = {
      username: data.get('username'),
      password: data.get('password')
    };
  
    try {
      const response = await axios.post('/api/login', combinedData);
      const userData = response.data.user;
  
      // For global authorization
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profilePicture: userData.profilePicture,
      });
      setIsAuthenticated(true);
  
      navigate('/', { state: { toastMessage: "Successfully logged in" } });
    } catch (error) {
      toast.error("Provided username does not exist or the password is wrong!");
      console.error('Error while trying to login user:', error);
    }
  };

  return (
    <>
      <ToastContainer/>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={12} md={6}>
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
            <Paper elevation={0} sx={{ width: '30%' }}>
              <img
                src={logo}
                alt="CookEase Logo"
                style={{ width: '100%', display: 'block', objectFit: 'contain', textAlign: 'left' }}
                onClick={() => navigate('/')}
              />
            </Paper>
            <Typography component="h1" variant="h4">
              Login
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs={4}>
                  Don't have an account?
                </Grid>
                <Grid item xs={2}>
                  <Link href={'/SignUp'} variant="body2">
                    {"Sign up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={0} sm={0} md={6}>
          <Paper elevation={0} sx={{ width: '100%', textAlign: 'right' }}>
            <img
              src={background}
              alt="Background image"
              style={{ width: '80%' }} // Will need to find a way on how to fill the height
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
