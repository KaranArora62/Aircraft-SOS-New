import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function SignIn() {
  const [cookies, setCookie] = useCookies(['email', 'username']);
  const navigate = useNavigate();

  React.useEffect(()=>{
    if (cookies.authority === "airlines") {
      navigate('/maps');
    }
    if (cookies.authority === "Emergency Responders") {
      navigate('/SOSHome');
    }
  },[])
  
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState('');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 6;

  axios.defaults.withCredentials = true;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    const isRemember = data.get('remember-me') === 'on'; // Assuming 'remember-me' is a checkbox

    console.log({ email, password, isRemember });
    
    // Email validation
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Password validation
    if (!password || password.length < passwordMinLength) {
      setError(`Password must be at least ${passwordMinLength} characters long.`);
      setLoading(false);
      return;
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const result = await axios.post('http://localhost:5000/api/auth/login', { email, password }, axiosConfig);
      setCookie('email', email);
      setCookie('username', result.data.username);
      setCookie('authority', result.data.authority);
      console.log(result);
      if (result.request.status === 200) {
        setError(false);
        setAlertOpen(true);
      }
    } catch (err) {
      console.log(err);
      setError('Invalid Email Address or Password');
      setLoading(false)
    }
  };

  // Redirect after successful submission
  React.useEffect(() => {
    let timer;
    if (alertOpen) {
      timer = setTimeout(() => {
        setAlertOpen(false);
        if (cookies.authority === 'airlines') {
          navigate('/maps');
        } else if (cookies.authority === 'Emergency Responders') {
          navigate('/SOSHome');
        }
      }, 2000); // Redirect after 2 seconds
    }
    return () => clearTimeout(timer);
  }, [alertOpen, cookies.authority, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1587408811730-1a978e6c407d?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
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
              <FormControlLabel
                control={<Checkbox value="remember" id="remember-me" name="remember-me" color="primary" />}
                label="Remember me"
              />
              {loading ? (
                <CircularProgress sx={{ mt: 3, mb: 2 }} />
              ) : (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
              )}
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              {alertOpen && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Sign in successful! Redirecting...
                </Alert>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
