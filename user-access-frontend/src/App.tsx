import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // placeholder or actual dashboard
import ManagerDashboard from "./pages/ManagerDashboard";
import PrivateRoute from "./components/PrivateRoute";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyRequests from "./pages/MyRequests";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard */}
        

        {/* Protected manager dashboard */}
        <Route
          path="/manager"
          element={
            <PrivateRoute>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee"
          element={
          <PrivateRoute>
           <EmployeeDashboard />
          </PrivateRoute>
  }
/>

<Route
  path="/my-requests"
  element={
    <PrivateRoute>
      <MyRequests />
    </PrivateRoute>
  }
/>

<Route
  path="/admin-dashboard"
  element={
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
