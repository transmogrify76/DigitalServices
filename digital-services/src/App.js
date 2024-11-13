import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={< HomePage/>} />
        <Route path="/signup" element={< SignUp/>} />
        <Route path="/login" element={< Login/>} />
      </Routes>
    </Router>
  );
};

export default App;
