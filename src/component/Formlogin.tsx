import * as React from 'react';
import "./pages/user.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../reduxthunk/store';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../reduxthunk/Actiontype';
import { loadAdmin, updateStatus } from '../reduxthunk/page-admin/adminAction';
import { collectionUser } from '../reduxthunk/app-chat/chatAction'
import { Admin } from '../reduxthunk/Actiontype';
import { useNavigate } from 'react-router';

export default function SignIn() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [listAccount, setListAccount] = useState<Admin[]>([])
  const account_admin = useSelector((state: AppState)  =>  state.adminReducer.admin);
  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();

  useEffect(() => {
    dispatch(loadAdmin())
  },[])

  useEffect(() => {
    setListAccount(account_admin)
  }, [account_admin])

  const usernameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const passwordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleSubmit = () => {
    let check_account = listAccount.filter((item: Admin) =>  item.username === username && item.password === password)
    if(check_account.length > 0) {
      check_account[0].status = "onl"
      dispatch(collectionUser(check_account[0]))
      dispatch(updateStatus(check_account[0].id, check_account[0]))
      navigate(`/Customer/${check_account[0].username}`)
    } else {
      alert("Tai khoan hoac mat khau khong dung")
    }
  }

  return (
    <div className="form-login">
      <h2>SignIn</h2>
      <Box component="form"  noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          onChange={usernameValue}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          onChange={passwordValue}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='http://localhost:3000/SignUp' variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
