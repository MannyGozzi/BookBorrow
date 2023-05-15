import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Nav from './components/Nav';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Box, Center } from "@chakra-ui/react";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Center>
        <Box w={'75%'}> 
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </ Box>
      </Center>
    </BrowserRouter>
  );
}

export default App
