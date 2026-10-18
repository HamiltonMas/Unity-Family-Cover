import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import styles from "../styles/Orders.module.css";

const Orders = () => {
  const fakeUser = { name: "Super Admin" };

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      memberName: "John Doe",
      plan: "Family Plan Plus",
      amount: "R1,200",
      date: "2024-01-15",
      status: "Completed",
      paymentMethod: "Credit Card",
      branch: "Johannesburg",
    },
    {
      id: "ORD-002",
      memberName: "Jane Smith",
      plan: "Basic Family Plan",
      amount: "R800",
      date: "2024-01-14",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      branch: "Pretoria",
    },
    {
      id: "ORD-003",
      memberName: "Mike Johnson",
      plan: "Premium Family Plan",
      amount: "R2,000",
      date: "2024-01-13",
      status: "Processing",
      paymentMethod: "Debit Order",
      branch: "Cape Town",
    },
    {
      id: "ORD-004",
      memberName: "Sarah Wilson",
      plan: "Family Plan Plus",
      amount: "R1,200",
      date: "2024-01-12",
      status: "Failed",
      paymentMethod: "Credit Card",
      branch: "Johannesburg",
    },
    {
      id: "ORD-005",
      memberName: "David Brown",
      plan: "Basic Family Plan",
      amount: "R800",
      date: "2024-01-11",
      status: "Completed",
      paymentMethod: "Cash",
      branch: "Durban",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.memberName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.plan.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesBranch =
      branchFilter === "All" || order.branch === branchFilter;

    return matchesSearch && matchesStatus && matchesBranch;
  });

  const statusOptions = ["All", "Completed", "Pending", "Processing", "Failed"];
  const branchOptions = [
    "All",
    "Johannesburg",
    "Pretoria",
    "Cape Town",
    "Durban",
  ];

  const viewOrder = (id) => {
    const order = orders.find((o) => o.id === id);
    alert(
      `Viewing order: ${order.id}\nMember: ${order.memberName}\nPlan: ${order.plan}\nAmount: ${order.amount}`,
    );
  };

  const editOrder = (id) => alert(`Edit order: ${id}`);

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  const exportOrders = () => alert("Exporting orders to CSV...");
  const printOrders = () => alert("Printing orders...");

  const getStatusInfo = (status) => {
    switch (status) {
      case "Completed":
        return {
          icon: <FaCheckCircle />,
          color: "#10b981",
          bgColor: "#d1fae5",
        };
      case "Pending":
        return { icon: <FaClock />, color: "#f59e0b", bgColor: "#fef3c7" };
      case "Processing":
        return { icon: <FaClock />, color: "#3b82f6", bgColor: "#dbeafe" };
      case "Failed":
        return {
          icon: <FaTimesCircle />,
          color: "#ef4444",
          bgColor: "#fee2e2",
        };
      default:
        return {
          icon: <FaExclamationTriangle />,
          color: "#6b7280",
          bgColor: "#f3f4f6",
        };
    }
  };

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className={styles.title}>Orders Management</h2>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className={styles.exportBtn} onClick={exportOrders}>
              <FaDownload /> Export
            </button>
            <button className={styles.printBtn} onClick={printOrders}>
              <FaPrint /> Print
            </button>
          </div>
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filterGroup}>
            <label>
              <FaFilter /> Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>
              <FaFilter /> Branch
            </label>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              {branchOptions.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.statsOverview}>
            <div className={`${styles.statItem} ${styles.statItemTotal}`}>
              <span className={styles.statValue}>{orders.length}</span>
              <span className={styles.statLabel}>Total Orders</span>
            </div>
            <div className={`${styles.statItem} ${styles.statItemCompleted}`}>
              <span className={styles.statValue}>
                {orders.filter((o) => o.status === "Completed").length}
              </span>
              <span className={styles.statLabel}>Completed</span>
            </div>
            <div className={`${styles.statItem} ${styles.statItemPending}`}>
              <span className={styles.statValue}>
                {orders.filter((o) => o.status === "Pending").length}
              </span>
              <span className={styles.statLabel}>Pending</span>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Member Name</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Branch</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <tr key={order.id}>
                    <td data-label="Order ID" className={styles.orderId}>
                      {order.id}
                    </td>
                    <td data-label="Member">{order.memberName}</td>
                    <td data-label="Plan">{order.plan}</td>
                    <td data-label="Amount" className={styles.amount}>
                      {order.amount}
                    </td>
                    <td data-label="Date">{order.date}</td>
                    <td data-label="Branch">{order.branch}</td>
                    <td data-label="Payment">{order.paymentMethod}</td>
                    <td data-label="Status">
                      <span
                        className={styles.statusBadge}
                        style={{
                          color: statusInfo.color,
                          backgroundColor: statusInfo.bgColor,
                        }}
                      >
                        {statusInfo.icon} {order.status}
                      </span>
                    </td>
                    <td data-label="Actions" className={styles.actions}>
                      <button
                        className={styles.viewBtn}
                        onClick={() => viewOrder(order.id)}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className={styles.editBtn}
                        onClick={() => editOrder(order.id)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteOrder(order.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className={styles.noOrders}>
              <p>No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
