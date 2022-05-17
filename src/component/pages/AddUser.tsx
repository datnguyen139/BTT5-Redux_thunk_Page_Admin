import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import './addUser.css'
import { User } from '../../reduxthunk/userActiontype';
import { useDispatch } from "react-redux";
import { addUserAction } from "../../reduxthunk/userAction";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../reduxthunk/store';
import { AppActions } from '../../reduxthunk/userActiontype';
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    address: "",
    email: "",
    contact: ""
  })
  const {name, address, email, contact} = user
  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();
  const navigate = useNavigate()

  const handleInputValue = (e: any) => {
    let {name, value} = e.target
    setUser({...user,[name]: value})
  }

  const submitAddUser = () => {
    dispatch(addUserAction(user))
    navigate("/")
  }

  return (
    <div className="form-add-user">
      <h2>Add User</h2>
      <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { display: 'block', m: 5, width: "100ch" }
          }}
          >
          <TextField
            required
            type="text"
            id="add-user"
            name="name"
            value={name}
            placeholder="Name"
            onChange={handleInputValue}
          />
          <TextField
            required
            type="text"
            id="add-user"
            name="address"
            value={address}
            placeholder="Address"
            onChange={handleInputValue}
          />
          <TextField
            required
            type="text"
            id="add-user"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleInputValue}
          />
          <TextField
            required
            type="text"
            id="add-user"
            name="contact"
            value={contact}
            placeholder="Contact"
            onChange={handleInputValue}
          />
          <Button variant="contained"
          id="submit-add-user" type="submit"
          onClick={() => submitAddUser()}>Submit</Button>
      </Box>
    </div>
  )
}

export default AddUser
