import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import websiteLogo from "../../assets/logo.png";
import styles from "../../styles/Login.module.css"; // Import CSS Module

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("super-admin");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!role) newErrors.role = "Role must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // simulate login API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login Data:", { email, password, role });

      if (role === "super-admin") {
        // Navigate to the dashboard if super-admin
        navigate("/dashboard");
      } else {
        alert(`Logged in as ${role}, access restricted to company admin features.`);
        // Optionally navigate to another page for sub-admins
        // navigate("/sub-admin-dashboard");
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
          <img src={websiteLogo} alt="Website Logo" className={styles.websiteLogo} />
        </div>

        <div className={styles.headerSection}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Sign in to access your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.formGrid}>
            {/* Role Selection */}
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Select Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={errors.role ? styles.inputError : ""}
              >
                <option value="">-- Select Role --</option>
                <option value="super-admin">Super Admin</option>
                <option value="sub-admin">Sub Admin</option>
              </select>
              {errors.role && <span className={styles.errorMessage}>{errors.role}</span>}
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
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
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
              {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
            </div>
          </div>

          {/* Submit & Register Buttons */}
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

          <div className={styles.buttonGroupSingle} style={{ marginTop: "0.8rem" }}>
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