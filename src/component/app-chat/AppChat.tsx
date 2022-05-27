import "./chat.css"
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AlignItemsList from "./ListUserChat";
import BoxChat from "./BoxChat";
import { useParams } from 'react-router';

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

const Chat = () => {
  const navigate = useNavigate();
  const username = useParams().username

  return (
    <div className="Container">
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <AppBar sx={{height: "40px"}}>
          <div className="dash-board"><p>Chat</p></div>
        </AppBar>
        <div className="list-item">
          <List sx={{width: '210px', top: "64px"}}>
            <ListItemButton onClick={() => navigate(`/Customer/${username}`)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItemButton>
            <ListItemButton >
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
        <div className="list-chat">
          <AlignItemsList/>
        </div>
        <div className="box-chat">
          <BoxChat />
        </div>
      </Box>
    </div>
  )
}

export default Chat
