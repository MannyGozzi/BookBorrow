import React from 'react';
import Nav from './components/Nav';
import Login from './components/Login';

import './App.css';
import SignUp from './components/signup';
import ProfileInfo from './components/ProfileInfo';

function App() {

  return (
    <>
      <Nav />
      <ProfileInfo/>
      {/* <SignUp/> */}
    </>
  );
}

export default App
