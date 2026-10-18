// src/pages/Profile.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaShield,
  FaBell,
  FaGlobe,
  FaLock,
  FaKey,
} from "react-icons/fa";
import styles from "../styles/Profile.module.css";

const Profile = () => {
  const fakeUser = { name: "Super Admin" };

  // Profile data state
  const [profile, setProfile] = useState({
    id: 1,
    firstName: "Super",
    lastName: "Admin",
    email: "superadmin@unityfamilycover.co.za",
    phone: "+27 11 123 4567",
    position: "Super Administrator",
    department: "Administration",
    branch: "Johannesburg Main",
    address: "123 Admin Street, Johannesburg, 2000",
    bio: "Responsible for overseeing all operations and managing the Unity Family Cover platform.",
    joinDate: "2020-01-15",
    lastLogin: "2024-01-15 14:30:00",
    avatar: null,
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: true,
    language: "en",
    timezone: "Africa/Johannesburg",
    dateFormat: "DD/MM/YYYY",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [tempProfile, setTempProfile] = useState({ ...profile });

  // Handle profile edit
  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Security settings
  const securitySettings = [
    { label: "Two-Factor Authentication", value: settings.twoFactorAuth },
    { label: "Password Last Changed", value: "2 months ago", icon: <FaKey /> },
    { label: "Active Sessions", value: "2 devices", icon: <FaGlobe /> },
  ];

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.profilePage}>
        <div className={styles.profileHeader}>
          <h1>Profile Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className={styles.profileContainer}>
          {/* Sidebar Navigation */}
          <div className={styles.profileSidebar}>
            <div className={styles.sidebarNav}>
              <button
                className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser />
                <span>Profile Information</span>
              </button>
              <button
                className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <FaBell />
                <span>Notification Settings</span>
              </button>
              <button
                className={`${styles.navItem} ${activeTab === "security" ? styles.active : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <FaLock />
                <span>Security</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.profileContent}>
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className={styles.profileSection}>
                <div className={styles.sectionHeader}>
                  <h2>Profile Information</h2>
                  {!isEditing ? (
                    <button className={styles.editBtn} onClick={handleEdit}>
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className={styles.editActions}>
                      <button className={styles.saveBtn} onClick={handleSave}>
                        <FaSave /> Save Changes
                      </button>
                      <button className={styles.cancelBtn} onClick={handleCancel}>
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.profileCard}>
                  {/* Avatar Section */}
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarContainer}>
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Profile" className={styles.avatar} />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          <FaUser />
                        </div>
                      )}
                      {isEditing && (
                        <label className={styles.avatarUploadBtn}>
                          <FaCamera />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>
                    <div className={styles.avatarInfo}>
                      <h3>{profile.firstName} {profile.lastName}</h3>
                      <p>{profile.position}</p>
                      <span className={styles.memberSince}>
                        Member since {new Date(profile.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className={styles.profileForm}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>First Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempProfile.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                          />
                        ) : (
                          <div className={styles.profileField}>{profile.firstName}</div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Last Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempProfile.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                          />
                        ) : (
                          <div className={styles.profileField}>{profile.lastName}</div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={tempProfile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        ) : (
                          <div className={styles.profileField}>
                            <FaEnvelope /> {profile.email}
                          </div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={tempProfile.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        ) : (
                          <div className={styles.profileField}>
                            <FaPhone /> {profile.phone}
                          </div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Position</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempProfile.position}
                            onChange={(e) => handleInputChange("position", e.target.value)}
                          />
                        ) : (
                          <div className={styles.profileField}>
                            <FaUser /> {profile.position}
                          </div>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Department</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempProfile.department}
                            onChange={(e) => handleInputChange("department", e.target.value)}
                          />
                        ) : (
                          <div className={styles.profileField}>
                            <FaBuilding /> {profile.department}
                          </div>
                        )}
                      </div>

                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Branch</label>
                        {isEditing ? (
                          <select
                            value={tempProfile.branch}
                            onChange={(e) => handleInputChange("branch", e.target.value)}
                          >
                            <option value="Johannesburg Main">Johannesburg Main</option>
                            <option value="Pretoria Central">Pretoria Central</option>
                            <option value="Cape Town Coastal">Cape Town Coastal</option>
                            <option value="Durban Beachfront">Durban Beachfront</option>
                          </select>
                        ) : (
                          <div className={styles.profileField}>
                            <FaMapMarkerAlt /> {profile.branch}
                          </div>
                        )}
                      </div>

                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Address</label>
                        {isEditing ? (
                          <textarea
                            value={tempProfile.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            rows="3"
                          />
                        ) : (
                          <div className={styles.profileField}>
                            <FaMapMarkerAlt /> {profile.address}
                          </div>
                        )}
                      </div>

                      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                        <label>Bio</label>
                        {isEditing ? (
                          <textarea
                            value={tempProfile.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            rows="4"
                            placeholder="Tell us about yourself..."
                          />
                        ) : (
                          <div className={`${styles.profileField} ${styles.bio}`}>{profile.bio}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {!isEditing && (
                    <div className={styles.additionalInfo}>
                      <h4>Additional Information</h4>
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <FaCalendarAlt />
                          <div>
                            <label>Join Date</label>
                            <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className={styles.infoItem}>
                          <FaUser />
                          <div>
                            <label>Last Login</label>
                            <span>{new Date(profile.lastLogin).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notification Settings Tab */}
            {activeTab === "settings" && (
              <div className={styles.profileSection}>
                <div className={styles.sectionHeader}>
                  <h2>Notification Settings</h2>
                  <p>Manage how you receive notifications</p>
                </div>

                <div className={styles.settingsCard}>
                  <div className={styles.settingGroup}>
                    <h3>Notification Preferences</h3>
                    
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Email Notifications</h4>
                        <p>Receive notifications via email</p>
                      </div>
                      <label className={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>SMS Notifications</h4>
                        <p>Receive notifications via SMS</p>
                      </div>
                      <label className={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => handleSettingChange("smsNotifications", e.target.checked)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Push Notifications</h4>
                        <p>Receive push notifications in the app</p>
                      </div>
                      <label className={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.settingGroup}>
                    <h3>Preferences</h3>
                    
                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Language</h4>
                        <p>Select your preferred language</p>
                      </div>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange("language", e.target.value)}
                        className={styles.settingSelect}
                      >
                        <option value="en">English</option>
                        <option value="af">Afrikaans</option>
                        <option value="zu">Zulu</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Timezone</h4>
                        <p>Set your local timezone</p>
                      </div>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange("timezone", e.target.value)}
                        className={styles.settingSelect}
                      >
                        <option value="Africa/Johannesburg">South Africa Standard Time</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div className={styles.settingItem}>
                      <div className={styles.settingInfo}>
                        <h4>Date Format</h4>
                        <p>Choose your preferred date format</p>
                      </div>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                        className={styles.settingSelect}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.settingsActions}>
                    <button className={styles.primaryBtn} onClick={() => alert('Settings saved!')}>
                      <FaSave /> Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className={styles.profileSection}>
                <div className={styles.sectionHeader}>
                  <h2>Security Settings</h2>
                  <p>Manage your account security and privacy</p>
                </div>

                <div className={styles.securityCard}>
                  <div className={styles.securityOverview}>
                    <h3>Security Overview</h3>
                    <div className={styles.securityStats}>
                      {securitySettings.map((item, index) => (
                        <div key={index} className={styles.securityStat}>
                          <div className={styles.statIcon}>{item.icon}</div>
                          <div className={styles.statInfo}>
                            <label>{item.label}</label>
                            <span>{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.securityActions}>
                    <div className={styles.securityAction}>
                      <div className={styles.actionInfo}>
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <div className={styles.actionControls}>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={settings.twoFactorAuth}
                            onChange={(e) => handleSettingChange("twoFactorAuth", e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                        <button className={styles.secondaryBtn}>Configure</button>
                      </div>
                    </div>

                    <div className={styles.securityAction}>
                      <div className={styles.actionInfo}>
                        <h4>Change Password</h4>
                        <p>Update your password regularly to keep your account secure</p>
                      </div>
                      <button className={styles.primaryBtn}>
                        <FaKey /> Change Password
                      </button>
                    </div>

                    <div className={styles.securityAction}>
                      <div className={styles.actionInfo}>
                        <h4>Active Sessions</h4>
                        <p>Manage your active login sessions across devices</p>
                      </div>
                      <button className={styles.secondaryBtn}>
                        View Sessions
                      </button>
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

export default Profile;