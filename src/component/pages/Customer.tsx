import "./user.css"
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../reduxthunk/store';
import { AppActions } from '../../reduxthunk/Actiontype';
import { User } from '../../reduxthunk/Actiontype';
import { deleteUserAction, loadUsers } from '../../reduxthunk/userAction';
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
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { Input } from "@mui/material";
import { Avatar } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const drawerWidth: number = 240;

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

const Customer = () => {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")
  const getusers: User[] = useSelector((state: AppState)  =>  state.userReducer.Users);
  const dispatch: ThunkDispatch<AppState, {}, AppActions> = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [numberOfPage, setNumberOfPage] = useState<number>(1)

  useEffect(() => {
    dispatch(loadUsers())
  },[])

  useEffect(() => {
    setUsers(getusers)
  },[getusers])

  useEffect(() => {
    const number: number = Math.ceil(users.length / 10)
    setNumberOfPage(number)
  },[users])

  const deleteUser = (id: number): void => {
    window.confirm("Ban chac chan muon xoa?")
    dispatch(deleteUserAction(id))
    setTimeout(() => {dispatch(loadUsers())},100)

  }

  const getValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setSearch(event.target.value)
  }



  // search by name users
  let new_users: User[] = []
  !search.trim()? new_users = users :
  new_users = users.filter(user => user.name.indexOf(search) > -1 || user.address.indexOf(search) > -1)

  const logOut = () => {
    navigate("/")
  }

  const lastItem:number = currentPage * 10
  const firstItem:number = lastItem - 10
  const changeValuePage = (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value)
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AppBar sx={{height: "40px", width: "100%"}}>
          <div className="dash-board"><p>DashBoard</p></div>
          <Button className="logout" onClick={() =>  logOut()}><Avatar sx={{ color: "blue" }}>T</Avatar></Button>
        </AppBar>
        <div className="list">
          <List sx={{width: '210px'}}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/Chat")}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Chats" />
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
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '94vh',
            }}>
              <Input className="search" placeholder="search" sx={{width: "600px"}} onChange={getValueSearch} />
            <div className="table">
              <Button variant="contained" onClick={() => navigate("/AddUser")} className="add-user">Add User</Button>
              <TableContainer className="table-container" sx={{ height: "750px", overflow: "visible"}} component={Paper} >
                <Table sx={{ width: "1500px" }} aria-label="customized table">
                  <TableHead sx={{padding: "12px"}}>
                    <TableRow>
                      <StyledTableCell align="center">Id</StyledTableCell>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Address</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">Contact</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody id="tablebody" sx={{padding: "0px"}}>
                    { new_users.slice(firstItem,lastItem).map((user) => (
                    <TableRow id={`row${user.id}`} key={user.id}>
                      <TableCell id="tablecell" align="center">{user.id}</TableCell>
                      <TableCell id="tablecell" align="center">{user.name}</TableCell>
                      <TableCell id="tablecell" align="center">{user.address}</TableCell>
                      <TableCell id="tablecell" align="center">{user.email}</TableCell>
                      <TableCell id="tablecell" align="center">{user.contact}</TableCell>
                      <TableCell id="tablecell" align="center">
                        <Button id={`${user.id}`} className="delete" onClick={() => deleteUser(user.id)} >Delete</Button>
                        <Button className="edit" style={{marginLeft: "10px"}} onClick={() => navigate(`/EditUser/${user.id}`)}>Edit</Button>
                      </TableCell>
                    </TableRow> ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            </Box>
          </Box>
          <Stack spacing={2} sx={{marginLeft: "800px"}}>
            <Pagination count={numberOfPage} onChange={changeValuePage} color="primary" />
          </Stack>
      </div>
  );
}
export default Customer;
