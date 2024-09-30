import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import { AuthProvider } from './components/AuthContext';

import Login from './components/Login';
import Register from './components/Register';
import ShopifyNavbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ShopifyNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
