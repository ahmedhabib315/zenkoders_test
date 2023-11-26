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
import { signup } from '../../../actions/auth';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { message } from '../../../constants/constants';
import { ApiResponse } from '../../../constants/interfaces';

const defaultTheme = createTheme();

const Signup = () => {
  const navigate = useNavigate();
  const [disabled, setdisabled] = useState(false);
  const [status, setstatus]: any = useState({});

  // Check if already logged in then redirect to Payment Page
  useEffect(() => {
    const authenticated = localStorage.getItem('auth');
    if (authenticated && JSON.parse(authenticated).hash) {
      navigate('/payment');
    }
  }, []);

  // Handle Submit for Sign up Form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get data from form to send request to server
    const data = new FormData(event.currentTarget);
    const payload: any = {
      email: data.get('email'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      name: data.get('name'),
    }
    setdisabled(true);
    //Check if Passwords are same
    if (payload.password !== payload.rePassword) {
      setstatus({ msg: message.same_password, code: 500 })
    }
    else {
      //Get response from server and redirect show message to user accordingly
      const res: ApiResponse | undefined = await signup(payload);
      setstatus(res);
      if (res && res.code === 200) {
        setTimeout(() => {
          navigate('/login')
        }, 3000);
      }
    }
    setdisabled(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Sign Up Form Component Start */}
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                margin="normal"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type='email'
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Confirm Password"
                type="password"
                id="rePassword"
                autoComplete="confirm-password"
              />

              {status.code ? status.code !== 200 ?
                (<Alert variant="filled" severity="error">
                  {status.msg}
                </Alert>) : (<Alert variant="filled" severity="success">
                  {status.msg}
                </Alert>) : (<></>)}
              <Button
                type="submit"
                fullWidth
                disabled={disabled}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {/* Sign Up Form Component End */}
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
      </Grid>
    </ThemeProvider>
  );
}

export default React.memo(Signup)