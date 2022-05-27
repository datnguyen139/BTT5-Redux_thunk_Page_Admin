import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customer from './component/pages/Customer'
import AddUser from './component/pages/AddUser';
import EditUser from './component/pages/EditUser';
import SignIn from './component/Formlogin';
import SignUp from './component/Formsignup';
import Chat from './component/app-chat/AppChat';

const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path='/Customer/:username' element={<Customer/>}/>
          <Route path='/AddUser/:username' element={<AddUser/>}/>
          <Route path='/EditUser/:username/:id' element={<EditUser/>}/>
          <Route path="/Chat/:username" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
