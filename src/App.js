import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import SubAdmins from "./pages/SubAdmins";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";
import Messages from "./pages/Messages";
import Branches from "./pages/Branches";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Super Admin */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Shared pages (reachable by all roles for demo) */}
        <Route path="/clients" element={<Clients />} />
        <Route path="/subAdmins" element={<SubAdmins />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Sub Admin & Company Admin land on Dashboard for demo */}
        <Route path="/sub-admin-dashboard" element={<Dashboard />} />
        <Route path="/company-admin-dashboard" element={<Dashboard />} />

        {/* Catch-all → back to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
