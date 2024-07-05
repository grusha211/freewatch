import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/privateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
      </Routes>
    </Router>
  );
};

export default App;
