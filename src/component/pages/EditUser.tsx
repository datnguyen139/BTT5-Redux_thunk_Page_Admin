import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import './user.css'
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../reduxthunk/store';
import { AppActions } from '../../reduxthunk/Actiontype';
import { useNavigate } from "react-router-dom";
import { editUserAction, getUserId, loadUsers } from '../../reduxthunk/userAction';
import { useParams } from "react-router-dom";
import { User } from "../../reduxthunk/Actiontype";

const EditUser = () => {
  const id  = useParams().id
  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();
  const getuser: User[] | User = useSelector((state: AppState) =>  state.userReducer.currentUser);
  const navigate = useNavigate()
  const [user, setUser] = useState<any>({id: 0, name: "", address: "", email: "", contact: ""})
  const {name, address, email, contact} = user

  useEffect(() => {
    dispatch(getUserId(Number(id)))
    setUser(getuser)
  },[])

  useEffect(() => {
    setUser(getuser)
  }, [getuser])

  const handleInputValue = (e: any) => {
    let {name, value} = e.target
    setUser({...user,[name]: value})
  }

  const submitUpdate = () => {
    dispatch(editUserAction(Number(id), user))
    dispatch(loadUsers())
    navigate("/Customer")
  }

  return (
    <div className="form-add-user">
      <h2 className="edituser">Edit User</h2>
      <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { display: 'block', m: 5, width: "100ch" }
          }}>
            <div>
              <TextField
                required
                type="text"
                id="add-user"
                name="name"
                value={name || ""}
                placeholder="Name"
                onChange={handleInputValue}
              />
              <TextField
                required
                type="text"
                id="add-user"
                name="address"
                value={address || ""}
                placeholder="Address"
                onChange={handleInputValue}
              />
              <TextField
                required
                type="text"
                id="add-user"
                name="email"
                value={email || ""}
                placeholder="Email"
                onChange={handleInputValue}
              />
              <TextField
                required
                type="text"
                id="add-user"
                name="contact"
                value={contact || ""}
                placeholder="Contact"
                onChange={handleInputValue}
              />
            </div>
          <Button variant="contained"
          id="submit-add-user" type="button"
          onClick={() => submitUpdate()}>Submit</Button>
      </Box>
    </div>
  )
}

export default EditUser
