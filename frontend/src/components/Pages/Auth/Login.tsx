import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../../actions/auth';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiResponse } from '../../../helpers/interfaces';
import { getValueFromLocalStorage, setValueInLocalStorage } from '../../../helpers/common-functions';

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [status, setstatus]: any = useState({});
  const [disabled, setdisabled] = useState(false);

  // Check if already logged in then redirect to Payment Page
  useEffect(() => {
    const authenticated = getValueFromLocalStorage('auth');
    if (authenticated && authenticated.hash) {
      navigate('/payment');
    }
  }, []);

  // Handle Submit for Login Form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get data from form to send request to server
    const data = new FormData(event.currentTarget);
    const payload: any = {
      email: data.get('email'),
      password: data.get('password'),
    }
    // Disable Login Button after Submit
    setdisabled(true);

    const res: ApiResponse | undefined = await login(payload);

    // Get response code and redirect to payment page after successful login else set Error Message
    setstatus(res);
    if (res && res.code === 200) {
      setValueInLocalStorage('auth', res.data);
      navigate('/payment');
    }
    setdisabled(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* Image Component Start */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Image Component End */}
        {/* Login Form Component Start */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type='email'
                label="Email Address"
                name="email"
                autoComplete="email"
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
              {status.code && status.code !== 200 &&
                (<Alert variant="filled" severity="error">
                  {status.msg}
                </Alert>)}
              <Button
                type="submit"
                fullWidth
                disabled={disabled}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }} variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {/* Login Form Component End */}
      </Grid>
    </ThemeProvider>
  );
}

export default React.memo(Login)