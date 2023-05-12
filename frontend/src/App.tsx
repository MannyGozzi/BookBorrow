import React from 'react';
import Nav from './components/Nav';
import Login from './components/Login';

import './App.css';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Nav />
      <Login />
      <Profile />
    </>
  );
}

export default App
