import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/DashboardLayout.module.css";
import logo from "../../assets/logo.png";
import {
  FaUser,
  FaUserCircle,
  FaUsers,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaChartPie,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserShield,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DashboardLayout = ({ children, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ Lowercase paths to match App.js routes
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
    { label: "Branches", path: "/branches", icon: <FaMapMarkerAlt /> },
    { label: "Sub Admins", path: "/subAdmins", icon: <FaUserShield /> },
    { label: "Users", path: "/clients", icon: <FaUsers /> },
    { label: "Orders", path: "/orders", icon: <FaClipboardList /> },
    { label: "Invoices", path: "/invoices", icon: <FaFileInvoiceDollar /> },
    { label: "Messages", path: "/messages", icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  const handleLogout = () => {
    setMenuOpen(false);
    alert("Logging out...");
  };

  const unreadNotificationsCount = 3;

  return (
    <div className={styles.container}>
      {sidebarOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <img src={logo} alt="Logo" className={styles.sidebarLogoImg} />
          <h2 className={styles.sidebarTitle}>Super Admin</h2>
          <button
            className={styles.sidebarCloseBtn}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.navItemActive : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
            <h2 className={styles.pageTitle}>
              {navItems.find((item) => item.path === location.pathname)
                ?.label ||
                location.pathname.split("/").pop() ||
                "Dashboard"}
            </h2>
          </div>

          <div className={styles.headerRight}>
            <button
              className={styles.notificationBtn}
              onClick={handleNotificationsClick}
              title="View notifications"
            >
              <FaBell />
              {unreadNotificationsCount > 0 && (
                <span className={styles.notificationCount}>
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <div className={styles.profileDropdown} ref={menuRef}>
              <FaUserCircle
                className={styles.profileIcon}
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div className={styles.profileMenu}>
                  <p className={styles.profileName}>{user?.name || "Admin"}</p>
                  <Link
                    to="/profile"
                    className={styles.profileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className={styles.menuIcon} /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className={styles.profileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaCog className={styles.menuIcon} /> Settings
                  </Link>
                  <Link
                    to="/notifications"
                    className={styles.profileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaBell className={styles.menuIcon} /> Notifications
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`${styles.profileLink} ${styles.profileLinkLogout}`}
                  >
                    <FaSignOutAlt className={styles.menuIcon} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className={styles.breadcrumb}>
          <span>Dashboard</span> /{" "}
          <span className={styles.breadcrumbActive}>
            {navItems.find((item) => item.path === location.pathname)?.label ||
              location.pathname.split("/").pop() ||
              "Home"}
          </span>
        </div>

        <section className={styles.content}>{children}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;
