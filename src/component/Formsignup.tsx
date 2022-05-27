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
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../reduxthunk/store';
import { AppActions } from '../reduxthunk/Actiontype';
import { useDispatch } from 'react-redux';
import { addAccountAdmin } from '../reduxthunk/page-admin/adminAction';
import { useFormik, Formik } from 'formik';
import * as Yup from "yup"

const theme = createTheme();

export default function SignUp() {

  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();

  const formik = useFormik({
    initialValues : {
      id: 0,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: "off"
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .min(7, "Must be 7 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values, {resetForm}) => {
      dispatch(addAccountAdmin(values))
      alert("SignUp success")
      resetForm({values: {
        id: 0,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: "off"
      }})
    },
  })

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
          <Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formik.values.username}
                  name="username"
                  onChange={formik.handleChange}
                  placeholder="Username"
                />
                {formik.errors.username && (
                <p className="error"> {formik.errors.username} </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                {formik.errors.email && (
                <p className="error"> {formik.errors.email} </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Password"
                />
                  {formik.errors.password && (
                <p className="error"> {formik.errors.password} </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder="Confirm password"
                />
                  {formik.errors.confirmPassword && (
                <p className="error"> {formik.errors.confirmPassword} </p>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </form>
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
