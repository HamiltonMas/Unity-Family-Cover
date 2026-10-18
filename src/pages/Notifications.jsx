// src/pages/Notifications.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaBell,
  FaEnvelope,
  FaSms,
  FaMobile,
  FaDesktop,
  FaSave,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUser,
  FaCreditCard,
  FaShield,
  FaCog,
  FaMoon,
} from "react-icons/fa";
import styles from "../styles/Notification.module.css";

const Notifications = () => {
  const fakeUser = { name: "Super Admin" };

  // Notification settings state
  const [settings, setSettings] = useState({
    // Channel preferences
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    inAppNotifications: true,

    // Notification types
    systemAlerts: true,
    securityAlerts: true,
    billingAlerts: true,
    memberAlerts: true,
    adminAlerts: true,
    reportAlerts: true,

    // Frequency settings
    immediateAlerts: true,
    dailyDigest: false,
    weeklySummary: true,
    monthlyReports: true,

    // Quiet hours
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    quietHoursDays: ["Saturday", "Sunday"],
  });

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "system",
      title: "System Maintenance Scheduled",
      message: "Planned maintenance will occur on Saturday from 2:00 AM to 4:00 AM",
      timestamp: "2024-01-15 14:30:00",
      read: false,
      priority: "medium",
      channel: "in-app",
    },
    {
      id: 2,
      type: "security",
      title: "New Login Detected",
      message: "New login from device: Chrome on Windows",
      timestamp: "2024-01-15 13:15:00",
      read: true,
      priority: "high",
      channel: "email",
    },
    {
      id: 3,
      type: "billing",
      title: "Payment Processed",
      message: "Monthly subscription payment of R1,200 was successfully processed",
      timestamp: "2024-01-15 10:45:00",
      read: true,
      priority: "low",
      channel: "in-app",
    },
    {
      id: 4,
      type: "member",
      title: "New Member Registration",
      message: "John Doe has registered for Family Plan Plus",
      timestamp: "2024-01-15 09:20:00",
      read: false,
      priority: "medium",
      channel: "push",
    },
    {
      id: 5,
      type: "admin",
      title: "Sub Admin Activity",
      message: "Sub Admin Alice Johnson updated branch information",
      timestamp: "2024-01-14 16:30:00",
      read: true,
      priority: "low",
      channel: "in-app",
    },
    {
      id: 6,
      type: "report",
      title: "Monthly Report Generated",
      message: "January 2024 performance report is now available",
      timestamp: "2024-01-14 14:00:00",
      read: false,
      priority: "medium",
      channel: "email",
    },
  ]);

  const [activeTab, setActiveTab] = useState("settings");
  const [filter, setFilter] = useState("all");
  const [hasChanges, setHasChanges] = useState(false);

  // Handle setting changes
  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  // Handle array settings (like quiet hours days)
  const handleArraySetting = (field, value, action = 'toggle') => {
    if (action === 'toggle') {
      setSettings(prev => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter(day => day !== value)
          : [...prev[field], value]
      }));
    }
    setHasChanges(true);
  };

  // Save settings
  const saveSettings = () => {
    setHasChanges(false);
    // Here you would typically make an API call to save settings
    alert("Notification settings saved successfully!");
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "system":
        return <FaCog />;
      case "security":
        return < FaCog/>;
      case "billing":
        return <FaCreditCard />;
      case "member":
        return <FaUser />;
      case "admin":
        return <FaUser />;
      case "report":
        return <FaInfoCircle />;
      default:
        return <FaBell />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return styles.highPriority;
      case "medium":
        return styles.mediumPriority;
      case "low":
        return styles.lowPriority;
      default:
        return styles.mediumPriority;
    }
  };

  // Get channel icon
  const getChannelIcon = (channel) => {
    switch (channel) {
      case "email":
        return <FaEnvelope />;
      case "sms":
        return <FaSms />;
      case "push":
        return <FaMobile />;
      case "in-app":
        return <FaDesktop />;
      default:
        return <FaBell />;
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  // Statistics
  const totalNotifications = notifications.length;
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const highPriorityNotifications = notifications.filter(n => n.priority === "high").length;

  // Days of the week for quiet hours
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.notificationsPage}>
        <div className={styles.notificationsHeader}>
          <h1>Notifications</h1>
          <p>Manage your notification preferences and view alerts</p>
        </div>

        <div className={styles.notificationsContainer}>
          {/* Sidebar Navigation */}
          <div className={styles.notificationsSidebar}>
            <div className={styles.sidebarNav}>
              <button
                className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <FaCog />
                <span>Notification Settings</span>
              </button>
              <button
                className={`${styles.navItem} ${activeTab === "history" ? styles.active : ""}`}
                onClick={() => setActiveTab("history")}
              >
                <FaBell />
                <span>Notification History</span>
                {unreadNotifications > 0 && (
                  <span className={styles.unreadBadge}>{unreadNotifications}</span>
                )}
              </button>
            </div>

            {/* Quick Stats */}
            <div className={styles.sidebarStats}>
              <h4>Quick Stats</h4>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalNotifications}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{unreadNotifications}</span>
                <span className={styles.statLabel}>Unread</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{highPriorityNotifications}</span>
                <span className={styles.statLabel}>High Priority</span>
              </div>
            </div>

            {/* Save Actions */}
            {activeTab === "settings" && hasChanges && (
              <div className={styles.sidebarActions}>
                <button className={styles.saveBtn} onClick={saveSettings}>
                  <FaSave /> Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className={styles.notificationsContent}>
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className={styles.settingsSection}>
                <h2>Notification Settings</h2>
                <p>Configure how and when you receive notifications</p>

                <div className={styles.settingsGrid}>
                  {/* Channel Preferences */}
                  <div className={styles.settingsCard}>
                    <h3>
                      <FaEnvelope /> Channel Preferences
                    </h3>
                    <p>Choose how you want to receive notifications</p>

                    <div className={styles.settingGroup}>
                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Email Notifications</h4>
                          <p>Receive notifications via email</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => handleSettingChange("channels", "emailNotifications", e.target.checked)}
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
                            onChange={(e) => handleSettingChange("channels", "smsNotifications", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Push Notifications</h4>
                          <p>Receive real-time alerts on mobile devices</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.pushNotifications}
                            onChange={(e) => handleSettingChange("channels", "pushNotifications", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>In-App Notifications</h4>
                          <p>Show notifications within the application</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.inAppNotifications}
                            onChange={(e) => handleSettingChange("channels", "inAppNotifications", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div className={styles.settingsCard}>
                    <h3>
                      <FaBell /> Notification Types
                    </h3>
                    <p>Select which types of notifications you want to receive</p>

                    <div className={styles.settingGroup}>
                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>System Alerts</h4>
                          <p>System maintenance and updates</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.systemAlerts}
                            onChange={(e) => handleSettingChange("types", "systemAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Security Alerts</h4>
                          <p>Login attempts and security events</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.securityAlerts}
                            onChange={(e) => handleSettingChange("types", "securityAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Billing Alerts</h4>
                          <p>Payment processing and billing updates</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.billingAlerts}
                            onChange={(e) => handleSettingChange("types", "billingAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Member Alerts</h4>
                          <p>New member registrations and updates</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.memberAlerts}
                            onChange={(e) => handleSettingChange("types", "memberAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Admin Alerts</h4>
                          <p>Sub-admin activities and changes</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.adminAlerts}
                            onChange={(e) => handleSettingChange("types", "adminAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Report Alerts</h4>
                          <p>Automated report generation</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.reportAlerts}
                            onChange={(e) => handleSettingChange("types", "reportAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Frequency Settings */}
                  <div className={styles.settingsCard}>
                    <h3>
                      <FaCog /> Frequency Settings
                    </h3>
                    <p>Control how often you receive notifications</p>

                    <div className={styles.settingGroup}>
                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Immediate Alerts</h4>
                          <p>Receive critical alerts immediately</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.immediateAlerts}
                            onChange={(e) => handleSettingChange("frequency", "immediateAlerts", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Daily Digest</h4>
                          <p>Receive a daily summary of notifications</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.dailyDigest}
                            onChange={(e) => handleSettingChange("frequency", "dailyDigest", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Weekly Summary</h4>
                          <p>Receive a weekly summary report</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.weeklySummary}
                            onChange={(e) => handleSettingChange("frequency", "weeklySummary", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Monthly Reports</h4>
                          <p>Receive comprehensive monthly reports</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.monthlyReports}
                            onChange={(e) => handleSettingChange("frequency", "monthlyReports", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Quiet Hours */}
                  <div className={styles.settingsCard}>
                    <h3>
                      <FaMoon /> Quiet Hours
                    </h3>
                    <p>Set times when you don't want to be disturbed</p>

                    <div className={styles.settingGroup}>
                      <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                          <h4>Enable Quiet Hours</h4>
                          <p>Pause non-critical notifications during specified hours</p>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.quietHoursEnabled}
                            onChange={(e) => handleSettingChange("quiet", "quietHoursEnabled", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>

                      {settings.quietHoursEnabled && (
                        <>
                          <div className={styles.settingItem}>
                            <div className={styles.settingInfo}>
                              <h4>Start Time</h4>
                              <p>When quiet hours begin</p>
                            </div>
                            <input
                              type="time"
                              value={settings.quietHoursStart}
                              onChange={(e) => handleSettingChange("quiet", "quietHoursStart", e.target.value)}
                              className={styles.timeInput}
                            />
                          </div>

                          <div className={styles.settingItem}>
                            <div className={styles.settingInfo}>
                              <h4>End Time</h4>
                              <p>When quiet hours end</p>
                            </div>
                            <input
                              type="time"
                              value={settings.quietHoursEnd}
                              onChange={(e) => handleSettingChange("quiet", "quietHoursEnd", e.target.value)}
                              className={styles.timeInput}
                            />
                          </div>

                          <div className={styles.settingItem}>
                            <div className={styles.settingInfo}>
                              <h4>Days</h4>
                              <p>Select days for quiet hours</p>
                            </div>
                            <div className={styles.daysGrid}>
                              {daysOfWeek.map(day => (
                                <label key={day} className={styles.dayCheckbox}>
                                  <input
                                    type="checkbox"
                                    checked={settings.quietHoursDays.includes(day)}
                                    onChange={() => handleArraySetting("quietHoursDays", day, "toggle")}
                                  />
                                  <span className={styles.dayLabel}>{day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className={styles.historySection}>
                <div className={styles.historyHeader}>
                  <h2>Notification History</h2>
                  <div className={styles.historyActions}>
                    <div className={styles.filterGroup}>
                      <FaFilter />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={styles.filterSelect}
                      >
                        <option value="all">All Notifications</option>
                        <option value="unread">Unread Only</option>
                        <option value="system">System</option>
                        <option value="security">Security</option>
                        <option value="billing">Billing</option>
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                        <option value="report">Reports</option>
                      </select>
                    </div>
                    <button className={styles.markAllBtn} onClick={markAllAsRead}>
                      <FaCheckCircle /> Mark All as Read
                    </button>
                    <button className={styles.clearAllBtn} onClick={clearAllNotifications}>
                      <FaTimesCircle /> Clear All
                    </button>
                  </div>
                </div>

                <div className={styles.notificationsList}>
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`${styles.notificationItem} ${
                          !notification.read ? styles.unread : ""
                        } ${getPriorityColor(notification.priority)}`}
                      >
                        <div className={styles.notificationIcon}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className={styles.notificationContent}>
                          <div className={styles.notificationHeader}>
                            <h4>{notification.title}</h4>
                            <span className={styles.notificationTime}>
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                          </div>
                          
                          <p className={styles.notificationMessage}>
                            {notification.message}
                          </p>
                          
                          <div className={styles.notificationMeta}>
                            <span className={styles.notificationType}>
                              {notification.type}
                            </span>
                            <span className={styles.notificationChannel}>
                              {getChannelIcon(notification.channel)}
                              {notification.channel}
                            </span>
                          </div>
                        </div>

                        <div className={styles.notificationActions}>
                          {!notification.read && (
                            <button
                              className={styles.markReadBtn}
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <FaCheckCircle />
                            </button>
                          )}
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete notification"
                          >
                            <FaTimesCircle />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noNotifications}>
                      <FaBell className={styles.noNotificationsIcon} />
                      <h3>No notifications found</h3>
                      <p>You're all caught up! New notifications will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;