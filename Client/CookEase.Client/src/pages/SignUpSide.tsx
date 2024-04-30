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

export default function SignUpSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
             <Paper elevation={0} sx={{ width: '30%'}}>
                <img
                src={logo}
                alt="CookEase Logo"
                style={{ width: '100%', display: 'block', objectFit: 'contain', textAlign:'left'}}
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