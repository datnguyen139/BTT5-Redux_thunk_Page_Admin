import "./user.css"
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../reduxthunk/store';
import { AppActions } from '../../reduxthunk/userActiontype';
import { User } from '../../reduxthunk/userActiontype';
import { deleteUserAction,editUserAction ,loadUsers } from '../../reduxthunk/userAction';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Customer = () => {
  const users = useSelector((state: AppState)  =>  state.userReducer.Users);
  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUsers());
  },[])

  const deleteUser = (id: number): any => {
    dispatch(deleteUserAction(id))
    const row_id = document.querySelector(`#row${id}`)
    row_id?.remove()
  }

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/AddUser")}>Add User</Button>
      </div>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 1400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User) => (
                <StyledTableRow id={`row${user.id}`} key={user.id}>
                  <StyledTableCell align="center">{user.id}</StyledTableCell>
                  <StyledTableCell align="center">{user.name}</StyledTableCell>
                  <StyledTableCell align="center">{user.address}</StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">{user.contact}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button id={`${user.id}`} className="delete" onClick={() => deleteUser(user.id)} >Delete</Button>
                    <Button className="edit" style={{marginLeft: "10px"}} onClick={() => navigate(`/EditUser/${user.id}`)}>Edit</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}
export default Customer;
