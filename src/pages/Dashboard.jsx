import React from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaUserShield,
  FaChartLine,
  FaBell,
  FaClipboardList,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const company = {
    name: "Unity Family Cover",
    location: "Johannesburg, South Africa",
    subAdmins: 3,
    members: 142,
    activePlans: 4,
    pendingClaims: 5,
    revenue: "R52,400",
  };

  const stats = [
    {
      title: "Total Members",
      value: company.members,
      change: "+12%",
      icon: <FaUsers />,
      color: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
    },
    {
      title: "Active Plans",
      value: company.activePlans,
      change: "+3%",
      icon: <FaChartLine />,
      color: "linear-gradient(135deg, #10b981, #047857)",
    },
    {
      title: "Pending Claims",
      value: company.pendingClaims,
      change: "-2%",
      icon: <FaClipboardList />,
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
    {
      title: "Revenue",
      value: company.revenue,
      change: "+9%",
      icon: <FaMoneyBillWave />,
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    },
    {
      title: "Sub Admins",
      value: company.subAdmins,
      change: "+1%",
      icon: <FaUserShield />,
      color: "linear-gradient(135deg, #6366f1, #312e81)",
    },
  ];

  const activities = [
    "Member Jane Doe added a new family plan.",
    "Claim #2032 approved by Admin Thabo.",
    "Sub-admin Zinhle updated coverage details.",
    "Member registration request from Sipho M.",
    "Claim #2041 is pending verification.",
  ];

  const notifications = [
    { message: "3 pending claims need review.", time: "1h ago" },
    { message: "Monthly report generated successfully.", time: "3h ago" },
    { message: "New member joined Family Plan Plus.", time: "Yesterday" },
  ];

  const growthData = [
    { month: "Jun", members: 120, claims: 4 },
    { month: "Jul", members: 125, claims: 6 },
    { month: "Aug", members: 130, claims: 3 },
    { month: "Sep", members: 135, claims: 5 },
    { month: "Oct", members: 142, claims: 7 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{`Month: ${label}`}</p>
          <p className={styles.tooltipValue} style={{ color: '#3b82f6' }}>
            {`Members: ${payload[0].value}`}
          </p>
          <p className={styles.tooltipValue} style={{ color: '#f59e0b' }}>
            {`Claims: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout user={{ name: "Company Admin" }}>
      <div className={styles.dashboardHome}>
        <div className={styles.companyHeader}>
          <h1 className={styles.companyTitle}>{company.name}</h1>
          <p className={styles.companyLocation}>{company.location}</p>
        </div>

        {/* --- Company Stats --- */}
        <div className={styles.statsGrid}>
          {stats.map((item, i) => (
            <div key={i} className={styles.statCard} style={{ background: item.color }}>
              <div className={styles.statIcon}>{item.icon}</div>
              <div className={styles.statInfo}>
                <h3 className={styles.statTitle}>{item.title}</h3>
                <p className={styles.statValue}>{item.value}</p>
                <span
                  className={`${styles.statChange} ${
                    item.change.startsWith("+") ? styles.statChangeUp : styles.statChangeDown
                  }`}
                >
                  {item.change.startsWith("+") ? <FaArrowUp /> : <FaArrowDown />}{" "}
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- Company Growth Chart --- */}
        <div className={styles.chartSection}>
          <h2 className={styles.chartTitle}>Member & Claims Growth</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="claims" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.legendMembers}`}></div>
                <span>Members</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.legendClaims}`}></div>
                <span>Claims</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Activity and Notifications --- */}
        <div className={styles.bottomGrid}>
          <div className={styles.recentSection}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <ul className={styles.activityList}>
              {activities.map((act, i) => (
                <li key={i} className={styles.activityItem}>
                  <span className={styles.activityDot} />
                  <span className={styles.activityText}>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.notificationSection}>
            <h2 className={styles.sectionTitle}>
              <FaBell /> Notifications
            </h2>
            <ul className={styles.notificationList}>
              {notifications.map((n, i) => (
                <li key={i} className={styles.notificationItem}>
                  <p className={styles.notificationMessage}>{n.message}</p>
                  <span className={styles.notificationTime}>{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;