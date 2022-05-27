import React, { useState } from "react"
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button"
import './user.css'
import { useDispatch } from "react-redux"
import { addUserAction } from "../../reduxthunk/page-admin/userAction"
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../reduxthunk/store'
import { AppActions } from '../../reduxthunk/Actiontype'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router"
import { useFormik } from "formik"
import * as Yup from "yup"


const AddUser = () => {
  const username = useParams().username
  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      address: "",
      email: "",
      contact: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      address: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters or more"),
      email: Yup.string()
        .required("Required")
        .min(15,"Please enter a valid email address")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
          contact: Yup.string()
        .required("Required")
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Contact is not valid")
        .min(10,"Must be 10 number")
        .max(10,"Must be 10 number")
    }),
    onSubmit: (values) => {
      dispatch(addUserAction(values))
      navigate(`/Customer/${username}`)
    },
  });

  return (

    <div className="form-add-user">
      <h2 className="adduser">Add User</h2>
      <Box
        sx={{
          "& .MuiTextField-root": { display: 'block', m: 5, width: "100ch" }
        }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="text"
                id="add-user"
                name="name"
                value={formik.values.name}
                placeholder="Name"
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
              <p className="errorMsg"> {formik.errors.name} </p>
              )}
              <TextField
                required
                type="text"
                id="add-user"
                name="address"
                value={formik.values.address}
                placeholder="Address"
                onChange={formik.handleChange}
              />
               {formik.errors.address && (
              <p className="errorMsg"> {formik.errors.address} </p>
              )}
              <TextField
                type="text"
                id="add-user"
                name="email"
                value={formik.values.email}
                placeholder="Email"
                onChange={formik.handleChange}
              />
               {formik.errors.email && (
              <p className="errorMsg"> {formik.errors.email} </p>
              )}
              <TextField
                type="phone"
                id="add-user"
                name="contact"
                value={formik.values.contact}
                placeholder="Contact"
                onChange={formik.handleChange}
              />
               {formik.errors.contact && (
              <p className="errorMsg"> {formik.errors.contact} </p>
              )}
              <Button
                variant="contained"
                id="submit-add-user" type="submit"
              >Submit
              </Button>
            </form>
      </Box>
    </div>
  )
}

export default AddUser
