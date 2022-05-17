import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/pages/Dashboard';
import Customer from './component/pages/User'
import AddUser from './component/pages/AddUser';
import EditUser from './component/pages/EditUser';

const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Customer/>}/>
          <Route path='/AddUser' element={<AddUser/>}/>
          <Route path='/EditUser/:id' element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
