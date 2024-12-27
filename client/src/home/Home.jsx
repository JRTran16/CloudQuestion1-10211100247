

import React from 'react';
import './Home.css';

import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import {Navigate, Routes, Route,  } from 'react-router-dom';


import Logo from './Logo';

const Home = ({ userAuthed, setUserAuthed}) => {
  console.log(userAuthed)
  return userAuthed ? 
    <Navigate to= "../portal/customer"/> :
    <div className='Home'>
      <div className='intro side'>
        <div className='color-primary-900 fs-900 fw-900'>Lynova</div>
        <p className='fs-700'>Welcome to your store</p>
      </div>

      <div className='auth'>
        <Routes>
          <Route path='' element={<Login setUserAuthed={setUserAuthed} />}/>
          <Route path='register' element={<Register />}/>
        </Routes>
      </div>
      
    </div>
}

export default Home
