import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage'; // Import HomePage
import ProtectedRoute from './components/ProtectedRoute'; // import
import Profile from './pages/Profile'; // Import Profile

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public HomePage */}
        <Route path="/home" element={<HomePage />} />

        {/* Protected Dashboard */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Protected Profile */}
        <Route 
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;