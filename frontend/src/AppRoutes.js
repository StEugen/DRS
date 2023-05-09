import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from "./Login";
import Search from './Search';

function checkToken() {
  const token = localStorage.getItem('token');
  return !!token;
}

export default function AppRoutes(props) {
  const isLoggedIn = checkToken();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}


