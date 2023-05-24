import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import BookUpload from './components/BookUpload';
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Box, Center } from "@chakra-ui/react";
import FourOFour from "./pages/FourOFour";

function App() {

  return (
    <BrowserRouter>
      <Login />
      <BookUpload />
      <Center>
        <Box w={'75%'}> 
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="upload" element={<BookUpload />} />
            <Route path="*" element={<FourOFour/>} />
          </Routes>
        </ Box>
      </Center>
    </BrowserRouter>
  );
}

export default App
