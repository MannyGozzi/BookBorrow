import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import BookUpload from './components/BookUpload';
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FourOFour from "./pages/FourOFour";
import Nav from "./components/Nav";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
            <Route path="upload" element={<BookUpload />} />
        <Route path="*" element={<FourOFour/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
