import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import WaterAwareness from './pages/WaterAwareness';
import ElectricityAwareness from './pages/ElectricityAwareness';
import FuelAwareness from './pages/FuelAwareness';
import GasCylinderAwareness from './pages/GasCylinderAwareness';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={< HomePage/>} />
        <Route path="/signup" element={< SignUp/>} />
        <Route path="/login" element={< Login/>} />
        <Route path="/resetpassword" element={< ResetPassword/>} />
        <Route path="/water" element={< WaterAwareness/>} />
        <Route path="/electricity" element={< ElectricityAwareness/>} />
        <Route path="/fuel" element={< FuelAwareness/>} />
        <Route path="/gas" element={< GasCylinderAwareness/>} />
      </Routes>
    </Router>
  );
};

export default App;
