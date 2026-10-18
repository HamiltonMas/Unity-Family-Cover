import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/subAdmins" element={<SubAdmins />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Invoices" element={<Invoices />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Branches" element={<Branches />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
