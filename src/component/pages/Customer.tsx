import "./user.css"
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../reduxthunk/store';
import { AppActions } from '../../reduxthunk/Actiontype';
import { User } from '../../reduxthunk/Actiontype';
import { deleteUserAction,editUserAction ,loadUsers } from '../../reduxthunk/userAction';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth: number = 600;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: '210px',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
        </AppBar>
        <div className="list">
          <List sx={{width: '210px'}}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard">Dasboard</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </List>
          </div>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>
            <div className="table">
                <Button variant="contained" onClick={() => navigate("/AddUser")} className="add-user">Add User</Button>
                <TableContainer component={Paper}>
                  <Table sx={{ width: "1600px" }} aria-label="customized table">
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
                      {users && users.map((user: User) => (
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
        </Box>
      </Box>
    </div>
  );
}
export default Customer;
