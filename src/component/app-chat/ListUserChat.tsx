import  React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { Admin, AppActions } from '../../reduxthunk/Actiontype';
import { AppState } from '../../reduxthunk/store';
import { ThunkDispatch } from 'redux-thunk';
import { useState, useEffect } from 'react';
import { loadAdmin } from '../../reduxthunk/page-admin/adminAction';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { red } from '@mui/material/colors';

export default function AlignItemsList() {
  const dispatch: ThunkDispatch<AppState,{}, AppActions> = useDispatch()
  const getAcc = useSelector((state: AppState) => state.adminReducer.admin)
  const [accs, setAccs] = useState<Admin[]>([])

  useEffect(() => {
    dispatch(loadAdmin())
  },[])

  useEffect(() => {
    setAccs(getAcc)
  },[getAcc])

  const createChatRoom = () => {

  }

  return (
    <List id='list-user' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {accs.map((acc) =>(
      <div onClick={createChatRoom} key={acc.id}>
        <ListItem alignItems="flex-start"  >
          {acc.status === "onl"?
            <FiberManualRecordIcon fontSize="inherit"
            sx={{color: red[600],position: "absolute",
            zIndex: 1 ,top: "41px" , left: "42px"}} />: null}
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://znews-photo.zingcdn.me/w1920/Uploaded/qxjrcqjwq/2020_03_05/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            secondary={<React.Fragment>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              {acc.username}
              </Typography>
              {"I'll be in your neighborhood doing errands this…"}
            </React.Fragment>} />
        </ListItem><Divider variant="inset" component="li" /></div>
      ))}
    </List>
  )
}
