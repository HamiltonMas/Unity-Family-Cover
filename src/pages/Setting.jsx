// src/pages/Settings.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaSave,
  FaUndo,
  FaBell,
  FaShield,
  FaPalette,
  FaDatabase,
  FaUsers,
  FaGlobe,
  FaFileExport,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import styles from "../styles/Setting.module.css";

const Settings = () => {
  const fakeUser = { name: "Super Admin" };

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "Unity Family Cover",
    companyEmail: "info@unityfamilycover.co.za",
    companyPhone: "+27 11 123 4567",
    timezone: "Africa/Johannesburg",
    dateFormat: "DD/MM/YYYY",
    language: "en",
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "strong",
    loginAttempts: 5,
    ipWhitelist: [],
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    memberAlerts: true,
    billingAlerts: true,
    
    // Appearance Settings
    theme: "light",
    primaryColor: "#4f46e5",
    sidebarStyle: "expanded",
    dashboardLayout: "grid",
    
    // System Settings
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: 365,
    maxFileSize: 10,
    allowedFileTypes: ["jpg", "png", "pdf", "doc"],
  });

  const [activeSection, setActiveSection] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);
  const [backupSettings, setBackupSettings] = useState({ ...settings });

  // Handle setting changes
  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  // Handle array settings (like IP whitelist)
  const handleArraySetting = (field, value, action = 'add') => {
    if (action === 'add' && value.trim()) {
      setSettings(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    } else if (action === 'remove') {
      setSettings(prev => ({
        ...prev,
        [field]: prev[field].filter(item => item !== value)
      }));
    }
    setHasChanges(true);
  };

  // Save settings
  const saveSettings = () => {
    setBackupSettings({ ...settings });
    setHasChanges(false);
    // Here you would typically make an API call to save settings
    alert("Settings saved successfully!");
  };

  // Reset settings
  const resetSettings = () => {
    setSettings({ ...backupSettings });
    setHasChanges(false);
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'unity-settings-backup.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import settings (simulated)
  const importSettings = () => {
    alert("Settings import feature would open a file dialog in a real application");
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all settings to default values? This action cannot be undone.")) {
      const defaultSettings = {
        companyName: "Unity Family Cover",
        companyEmail: "info@unityfamilycover.co.za",
        companyPhone: "+27 11 123 4567",
        timezone: "Africa/Johannesburg",
        dateFormat: "DD/MM/YYYY",
        language: "en",
        twoFactorAuth: true,
        sessionTimeout: 30,
        passwordPolicy: "strong",
        loginAttempts: 5,
        ipWhitelist: [],
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        adminAlerts: true,
        memberAlerts: true,
        billingAlerts: true,
        theme: "light",
        primaryColor: "#4f46e5",
        sidebarStyle: "expanded",
        dashboardLayout: "grid",
        autoBackup: true,
        backupFrequency: "daily",
        dataRetention: 365,
        maxFileSize: 10,
        allowedFileTypes: ["jpg", "png", "pdf", "doc"],
      };
      setSettings(defaultSettings);
      setHasChanges(true);
    }
  };

  // Navigation items
  const navItems = [
    { id: "general", label: "General", icon: <FaGlobe /> },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
    { id: "system", label: "System", icon: <FaDatabase /> },
    { id: "backup", label: "Backup & Restore", icon: <FaFileExport /> },
  ];

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.settingsPage}>
        <div className={styles.settingsHeader}>
          <h1>System Settings</h1>
          <p>Configure and customize your Unity Family Cover platform</p>
        </div>

        <div className={styles.settingsContainer}>
          {/* Sidebar Navigation */}
          <div className={styles.settingsSidebar}>
            <div className={styles.sidebarNav}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${activeSection === item.id ? styles.active : ""}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Save Actions */}
            <div className={styles.sidebarActions}>
              {hasChanges && (
                <div className={styles.unsavedChanges}>
                  <FaExclamationTriangle />
                  <span>Unsaved Changes</span>
                </div>
              )}
              <button
                className={styles.saveBtn}
                onClick={saveSettings}
                disabled={!hasChanges}
              >
                <FaSave /> Save Changes
              </button>
              {hasChanges && (
                <button
                  className={styles.resetBtn}
                  onClick={resetSettings}
                >
                  <FaUndo /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.settingsContent}>
            {/* General Settings */}
            {activeSection === "general" && (
              <div className={styles.settingsSection}>
                <h2>General Settings</h2>
                <p>Basic system configuration and preferences</p>

                <div className={styles.settingsGroup}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Company Name</h4>
                      <p>The display name for your organization</p>
                    </div>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange("general", "companyName", e.target.value)}
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Company Email</h4>
                      <p>Primary contact email address</p>
                    </div>
                    <input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleSettingChange("general", "companyEmail", e.target.value)}
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Company Phone</h4>
                      <p>Primary contact phone number</p>
                    </div>
                    <input
                      type="tel"
                      value={settings.companyPhone}
                      onChange={(e) => handleSettingChange("general", "companyPhone", e.target.value)}
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Timezone</h4>
                      <p>System timezone for all date/time operations</p>
                    </div>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange("general", "timezone", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="Africa/Johannesburg">South Africa Standard Time</option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/London">GMT</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Date Format</h4>
                      <p>Preferred date display format</p>
                    </div>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange("general", "dateFormat", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Language</h4>
                      <p>System language and locale</p>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange("general", "language", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="en">English</option>
                      <option value="af">Afrikaans</option>
                      <option value="zu">Zulu</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <div className={styles.settingsSection}>
                <h2>Security Settings</h2>
                <p>Configure security policies and authentication</p>

                <div className={styles.settingsGroup}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Two-Factor Authentication</h4>
                      <p>Require 2FA for all admin accounts</p>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleSettingChange("security", "twoFactorAuth", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Session Timeout</h4>
                      <p>Automatic logout after inactivity (minutes)</p>
                    </div>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("security", "sessionTimeout", parseInt(e.target.value))}
                      className={styles.selectInput}
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Password Policy</h4>
                      <p>Minimum requirements for user passwords</p>
                    </div>
                    <select
                      value={settings.passwordPolicy}
                      onChange={(e) => handleSettingChange("security", "passwordPolicy", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="basic">Basic (6 characters)</option>
                      <option value="medium">Medium (8 characters with mix)</option>
                      <option value="strong">Strong (12 characters with complexity)</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Login Attempts</h4>
                      <p>Maximum failed attempts before lockout</p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={settings.loginAttempts}
                      onChange={(e) => handleSettingChange("security", "loginAttempts", parseInt(e.target.value))}
                      className={styles.numberInput}
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>IP Whitelist</h4>
                      <p>Restrict admin access to specific IP addresses</p>
                    </div>
                    <div className={styles.arraySetting}>
                      <div className={styles.arrayInput}>
                        <input
                          type="text"
                          placeholder="Enter IP address (e.g., 192.168.1.1)"
                          className={styles.textInput}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleArraySetting('ipWhitelist', e.target.value, 'add');
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.target.previousSibling;
                            handleArraySetting('ipWhitelist', input.value, 'add');
                            input.value = '';
                          }}
                          className={styles.addBtn}
                        >
                          Add
                        </button>
                      </div>
                      <div className={styles.arrayList}>
                        {settings.ipWhitelist.map((ip, index) => (
                          <div key={index} className={styles.arrayItem}>
                            <span>{ip}</span>
                            <button
                              onClick={() => handleArraySetting('ipWhitelist', ip, 'remove')}
                              className={styles.removeBtn}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <div className={styles.settingsSection}>
                <h2>Notification Settings</h2>
                <p>Configure how and when to receive alerts</p>

                <div className={styles.settingsGroup}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Email Notifications</h4>
                      <p>Receive system notifications via email</p>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange("notifications", "emailNotifications", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>SMS Notifications</h4>
                      <p>Receive critical alerts via SMS</p>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => handleSettingChange("notifications", "smsNotifications", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Push Notifications</h4>
                      <p>Receive real-time alerts in the application</p>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => handleSettingChange("notifications", "pushNotifications", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingGroup}>
                    <h4>Alert Types</h4>
                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          checked={settings.adminAlerts}
                          onChange={(e) => handleSettingChange("notifications", "adminAlerts", e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                        Admin Activities
                      </label>
                      <label className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          checked={settings.memberAlerts}
                          onChange={(e) => handleSettingChange("notifications", "memberAlerts", e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                        Member Registrations
                      </label>
                      <label className={styles.checkboxItem}>
                        <input
                          type="checkbox"
                          checked={settings.billingAlerts}
                          onChange={(e) => handleSettingChange("notifications", "billingAlerts", e.target.checked)}
                        />
                        <span className={styles.checkmark}></span>
                        Billing & Payments
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === "appearance" && (
              <div className={styles.settingsSection}>
                <h2>Appearance Settings</h2>
                <p>Customize the look and feel of your dashboard</p>

                <div className={styles.settingsGroup}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Theme</h4>
                      <p>Choose between light and dark mode</p>
                    </div>
                    <select
                      value={settings.theme}
                      onChange={(e) => handleSettingChange("appearance", "theme", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Primary Color</h4>
                      <p>Main brand color for the application</p>
                    </div>
                    <div className={styles.colorInputGroup}>
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => handleSettingChange("appearance", "primaryColor", e.target.value)}
                        className={styles.colorInput}
                      />
                      <span className={styles.colorValue}>{settings.primaryColor}</span>
                    </div>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Sidebar Style</h4>
                      <p>Navigation sidebar behavior</p>
                    </div>
                    <select
                      value={settings.sidebarStyle}
                      onChange={(e) => handleSettingChange("appearance", "sidebarStyle", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="expanded">Always Expanded</option>
                      <option value="collapsed">Collapsible</option>
                      <option value="mini">Mini Mode</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Dashboard Layout</h4>
                      <p>Default dashboard view layout</p>
                    </div>
                    <select
                      value={settings.dashboardLayout}
                      onChange={(e) => handleSettingChange("appearance", "dashboardLayout", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="grid">Grid View</option>
                      <option value="list">List View</option>
                      <option value="compact">Compact View</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeSection === "system" && (
              <div className={styles.settingsSection}>
                <h2>System Settings</h2>
                <p>Configure system behavior and data management</p>

                <div className={styles.settingsGroup}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Automatic Backups</h4>
                      <p>Enable automatic system backups</p>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => handleSettingChange("system", "autoBackup", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Backup Frequency</h4>
                      <p>How often to create automatic backups</p>
                    </div>
                    <select
                      value={settings.backupFrequency}
                      onChange={(e) => handleSettingChange("system", "backupFrequency", e.target.value)}
                      className={styles.selectInput}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Data Retention</h4>
                      <p>Keep backup files for (days)</p>
                    </div>
                    <input
                      type="number"
                      min="30"
                      max="1095"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange("system", "dataRetention", parseInt(e.target.value))}
                      className={styles.numberInput}
                    />
                  </div>

                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <h4>Max File Size</h4>
                      <p>Maximum upload file size (MB)</p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={settings.maxFileSize}
                      onChange={(e) => handleSettingChange("system", "maxFileSize", parseInt(e.target.value))}
                      className={styles.numberInput}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Backup & Restore Settings */}
            {activeSection === "backup" && (
              <div className={styles.settingsSection}>
                <h2>Backup & Restore</h2>
                <p>Manage system backups and data migration</p>

                <div className={styles.backupActions}>
                  <div className={styles.backupCard}>
                    <FaFileExport className={styles.backupIcon} />
                    <h4>Export Settings</h4>
                    <p>Download all current settings as a backup file</p>
                    <button className={styles.primaryBtn} onClick={exportSettings}>
                      <FaFileExport /> Export Settings
                    </button>
                  </div>

                  <div className={styles.backupCard}>
                    <FaDatabase className={styles.backupIcon} />
                    <h4>Import Settings</h4>
                    <p>Restore settings from a previously exported backup</p>
                    <button className={styles.secondaryBtn} onClick={importSettings}>
                      <FaSave /> Import Settings
                    </button>
                  </div>

                  <div className={styles.backupCard}>
                    <FaUndo className={styles.backupIcon} />
                    <h4>Reset to Defaults</h4>
                    <p>Restore all settings to their original default values</p>
                    <button className={styles.dangerBtn} onClick={resetToDefaults}>
                      <FaTrash /> Reset All Settings
                    </button>
                  </div>
                </div>

                <div className={styles.backupInfo}>
                  <h4>Backup Information</h4>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <label>Last Backup</label>
                      <span>2024-01-15 14:30:00</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Backup Size</label>
                      <span>45.2 MB</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Next Scheduled Backup</label>
                      <span>2024-01-16 02:00:00</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Backup Location</label>
                      <span>/var/backups/unity-system</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;