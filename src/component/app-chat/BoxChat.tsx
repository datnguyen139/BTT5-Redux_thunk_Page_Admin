import React from "react";
import { Avatar, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


const BoxChat = () => {
  const [showBoxChat, setShowBoxChat] = useState<Boolean>(true)
  const closeBoxChat = () => {
    setShowBoxChat(false)
  }
  const getValueMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }

  return (
    <div className="Box-Chat">
      {showBoxChat?
      <><div className="App-Bar">
          <div className="avatar"><Avatar src="https://znews-photo.zingcdn.me/w1920/Uploaded/qxjrcqjwq/2020_03_05/1.jpg" />
            <p className="UserName">Kurapika</p>
          </div>
          <div className="Item-chat">
            <SearchIcon color="primary" />
            <LocalPhoneIcon color="primary" />
            <VideocamIcon color="primary" />
            <MoreHorizIcon color="primary" />
            <CloseIcon color="primary" onClick={closeBoxChat} />
          </div>
        </div>
        <div className="view-message">
        </div>
          <div className="bottom">
            <TextField size="small" fullWidth onChange={getValueMessage} />
            <InsertEmoticonIcon id="emoticon" />
            <Button><SendIcon id="send" color="primary" fontSize="large" /></Button>
          </div></>
          :
          <div className="notification">Choose a people to start message </div> }
    </div>
  )
}

export default BoxChat
