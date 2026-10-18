import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import websiteLogo from "../../assets/logo.png";
import styles from "../../styles/Login.module.css";

// Demo accounts: auto-fill when a role is selected
const DEMO_ACCOUNTS = {
  "super-admin": {
    email: "superadmin@unityfamily.com",
    password: "SuperAdmin@123",
  },
  "sub-admin": {
    email: "subadmin@unityfamily.com",
    password: "SubAdmin@123",
  },
  "company-admin": {
    email: "companyadmin@unityfamily.com",
    password: "CompanyAdmin@123",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-fill credentials when role changes
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (DEMO_ACCOUNTS[selectedRole]) {
      setEmail(DEMO_ACCOUNTS[selectedRole].email);
      setPassword(DEMO_ACCOUNTS[selectedRole].password);
    } else {
      // If "-- Select a role --" is chosen, clear the fields
      setEmail("");
      setPassword("");
    }

    // Clear role-related error once selected
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!role) newErrors.role = "Please select who you want to log in as";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Login Data:", { email, password, role });

      if (role === "super-admin") {
        navigate("/dashboard");
      } else if (role === "sub-admin") {
        navigate("/sub-admin-dashboard");
      } else if (role === "company-admin") {
        navigate("/company-admin-dashboard");
      }
    } catch (err) {
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.logoContainer}>
          <img
            src={websiteLogo}
            alt="Website Logo"
            className={styles.websiteLogo}
          />
        </div>

        <div className={styles.headerSection}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>
            Select a role to auto-fill demo credentials
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.formGrid}>
            {/* Role Selection */}
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Login as *</label>
              <select
                value={role}
                onChange={handleRoleChange}
                className={errors.role ? styles.inputError : ""}
              >
                <option value="">-- Select a role --</option>
                <option value="super-admin">Super Admin</option>
                <option value="sub-admin">Sub Admin</option>
                <option value="company-admin">Company Admin</option>
              </select>
              {errors.role && (
                <span className={styles.errorMessage}>{errors.role}</span>
              )}
            </div>

            {/* Email */}
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Email *</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? styles.inputError : ""}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Password *</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? styles.inputError : ""}
              />
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className={styles.submitError}>{errors.submit}</div>
          )}

          <div className={styles.buttonGroupSingle}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.primaryBtn} ${loading ? styles.btnLoading : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div
            className={styles.buttonGroupSingle}
            style={{ marginTop: "0.8rem" }}
          >
            <button
              type="button"
              className={`${styles.btn} ${styles.secondaryBtn}`}
              onClick={() => navigate("/register")}
            >
              Register a Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
