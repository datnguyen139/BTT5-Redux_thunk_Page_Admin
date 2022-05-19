import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Admin } from '../reduxthunk/Actiontype';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../reduxthunk/store';
import { AppActions } from '../reduxthunk/Actiontype';
import { useDispatch } from 'react-redux';
import { addAccountAdmin } from '../reduxthunk/adminAction';

const theme = createTheme();

export default function SignUp() {

  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();
  const [confirmpassword, setConfirmpassword] = useState<string>("")
  const [account, setAccount] = useState<Admin>({
    id: 0,
    username: "",
    email: "",
    password: ""
  })
  const {username, email, password} = account

  const handleInputValue = (e: any) => {
    let {name, value} = e.target
    setAccount({...account,[name]: value})
  }

  const confirmPassword = (e: any) => {
    setConfirmpassword(e.target.value)
  }

  const handleSubmit = () => {
    if (account.username.trim() === "" || account.email.trim() === "" || account.password.trim() === "" ) {
      alert("please fill in the field")
    } else if (account.password !== confirmpassword) {
      alert("Mat khau khong trung nhau")
    } else {
      dispatch(addAccountAdmin(account))
      alert("dang ki thanh cong")
      setAccount({id: 0, username: "", email: "", password: ""})
      setConfirmpassword("")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={username || ""}
                  name="username"
                  onChange={handleInputValue}
                  placeholder="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  value={email || ""}
                  onChange={handleInputValue}
                  placeholder="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  value={password || ""}
                  onChange={handleInputValue}
                  placeholder="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  type="password"
                  value={confirmpassword || ""}
                  onChange={confirmPassword}
                  placeholder="Confirm password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
