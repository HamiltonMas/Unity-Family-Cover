// src/pages/Invoices.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaDownload,
  FaPrint,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationTriangle,
  FaFileInvoice,
  FaMoneyBillWave,
  FaPlus,
} from "react-icons/fa";
import styles from "../styles/Invoices.module.css";

const Invoices = () => {
  const fakeUser = { name: "Super Admin" };

  const [invoices, setInvoices] = useState([
    {
      id: "INV-2024-001",
      memberName: "John Doe",
      memberId: "M001",
      plan: "Family Plan Plus",
      amount: "R1,200",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Paid",
      paymentMethod: "Credit Card",
      branch: "Johannesburg",
    },
    {
      id: "INV-2024-002",
      memberName: "Jane Smith",
      memberId: "M002",
      plan: "Basic Family Plan",
      amount: "R800",
      issueDate: "2024-01-14",
      dueDate: "2024-02-14",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      branch: "Pretoria",
    },
    {
      id: "INV-2024-003",
      memberName: "Mike Johnson",
      memberId: "M003",
      plan: "Premium Family Plan",
      amount: "R2,000",
      issueDate: "2024-01-13",
      dueDate: "2024-02-13",
      status: "Overdue",
      paymentMethod: "Debit Order",
      branch: "Cape Town",
    },
    {
      id: "INV-2024-004",
      memberName: "Sarah Wilson",
      memberId: "M004",
      plan: "Family Plan Plus",
      amount: "R1,200",
      issueDate: "2024-01-12",
      dueDate: "2024-02-12",
      status: "Paid",
      paymentMethod: "Cash",
      branch: "Johannesburg",
    },
    {
      id: "INV-2024-005",
      memberName: "David Brown",
      memberId: "M005",
      plan: "Basic Family Plan",
      amount: "R800",
      issueDate: "2024-01-11",
      dueDate: "2024-02-11",
      status: "Pending",
      paymentMethod: "Credit Card",
      branch: "Durban",
    },
    {
      id: "INV-2024-006",
      memberName: "Lisa Anderson",
      memberId: "M006",
      plan: "Premium Family Plan",
      amount: "R2,000",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "Cancelled",
      paymentMethod: "Bank Transfer",
      branch: "Johannesburg",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.memberName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.memberId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || invoice.status === statusFilter;
    const matchesBranch =
      branchFilter === "All" || invoice.branch === branchFilter;

    return matchesSearch && matchesStatus && matchesBranch;
  });

  const statusOptions = ["All", "Paid", "Pending", "Overdue", "Cancelled"];
  const branchOptions = [
    "All",
    "Johannesburg",
    "Pretoria",
    "Cape Town",
    "Durban",
  ];
  const dateOptions = ["All", "This Week", "This Month", "Last Month"];

  const viewInvoice = (invoice) => setSelectedInvoice(invoice);
  const closeView = () => setSelectedInvoice(null);

  const downloadInvoice = (id) => alert(`Downloading invoice: ${id}`);
  const printInvoice = (id) => alert(`Printing invoice: ${id}`);

  const sendReminder = (id) => {
    const invoice = invoices.find((inv) => inv.id === id);
    alert(
      `Sending payment reminder for ${invoice.id} to ${invoice.memberName}`,
    );
  };

  const markAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "Paid" } : invoice,
      ),
    );
    if (selectedInvoice && selectedInvoice.id === id) {
      setSelectedInvoice((prev) => ({ ...prev, status: "Paid" }));
    }
  };

  const generateNewInvoice = () => setShowGenerateModal(true);

  const handleGenerateInvoice = () => {
    alert("Generating new invoice...");
    setShowGenerateModal(false);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "Paid":
        return {
          icon: <FaCheckCircle />,
          color: "#10b981",
          bgColor: "#d1fae5",
        };
      case "Pending":
        return { icon: <FaClock />, color: "#f59e0b", bgColor: "#fef3c7" };
      case "Overdue":
        return {
          icon: <FaExclamationTriangle />,
          color: "#ef4444",
          bgColor: "#fee2e2",
        };
      case "Cancelled":
        return {
          icon: <FaTimesCircle />,
          color: "#6b7280",
          bgColor: "#f3f4f6",
        };
      default:
        return {
          icon: <FaFileInvoice />,
          color: "#3b82f6",
          bgColor: "#dbeafe",
        };
    }
  };

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.status === "Paid").length;
  const pendingInvoices = invoices.filter(
    (inv) => inv.status === "Pending",
  ).length;
  const overdueInvoices = invoices.filter(
    (inv) => inv.status === "Overdue",
  ).length;
  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce(
      (sum, inv) =>
        sum + parseFloat(inv.amount.replace("R", "").replace(",", "")),
      0,
    );

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.invoicesPage}>
        <div className={styles.invoicesHeader}>
          <h2>Invoices Management</h2>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className={styles.generateBtn} onClick={generateNewInvoice}>
              <FaPlus /> Generate Invoice
            </button>
          </div>
        </div>

        <div className={styles.summaryCards}>
          <div className={`${styles.summaryCard} ${styles.total}`}>
            <div className={styles.cardIcon}>
              <FaFileInvoice />
            </div>
            <div className={styles.cardInfo}>
              <h3>Total Invoices</h3>
              <p className={styles.cardValue}>{totalInvoices}</p>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.paid}`}>
            <div className={styles.cardIcon}>
              <FaCheckCircle />
            </div>
            <div className={styles.cardInfo}>
              <h3>Paid Invoices</h3>
              <p className={styles.cardValue}>{paidInvoices}</p>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.pending}`}>
            <div className={styles.cardIcon}>
              <FaClock />
            </div>
            <div className={styles.cardInfo}>
              <h3>Pending</h3>
              <p className={styles.cardValue}>{pendingInvoices}</p>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.revenue}`}>
            <div className={styles.cardIcon}>
              <FaMoneyBillWave />
            </div>
            <div className={styles.cardInfo}>
              <h3>Total Revenue</h3>
              <p className={styles.cardValue}>
                R{totalRevenue.toLocaleString()}
              </p>
            </div>
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

          <div className={styles.filterGroup}>
            <label>
              <FaFilter /> Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.invoicesTable}>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Member</th>
                <th>Member ID</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => {
                const statusInfo = getStatusInfo(invoice.status);
                const isOverdue = invoice.status === "Overdue";
                const isPending = invoice.status === "Pending";

                return (
                  <tr
                    key={invoice.id}
                    className={isOverdue ? styles.overdueRow : ""}
                  >
                    <td data-label="Invoice ID" className={styles.invoiceId}>
                      {invoice.id}
                    </td>
                    <td data-label="Member" className={styles.memberName}>
                      {invoice.memberName}
                    </td>
                    <td data-label="Member ID" className={styles.memberId}>
                      {invoice.memberId}
                    </td>
                    <td data-label="Plan">{invoice.plan}</td>
                    <td data-label="Amount" className={styles.amount}>
                      {invoice.amount}
                    </td>
                    <td data-label="Issued">{invoice.issueDate}</td>
                    <td
                      data-label="Due"
                      className={`${styles.dueDate} ${isOverdue ? styles.overdue : ""}`}
                    >
                      {invoice.dueDate}
                    </td>
                    <td data-label="Branch">{invoice.branch}</td>
                    <td data-label="Status">
                      <span
                        className={styles.statusBadge}
                        style={{
                          color: statusInfo.color,
                          backgroundColor: statusInfo.bgColor,
                        }}
                      >
                        {statusInfo.icon} {invoice.status}
                      </span>
                    </td>
                    <td data-label="Actions" className={styles.actions}>
                      <button
                        className={styles.viewBtn}
                        onClick={() => viewInvoice(invoice)}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className={styles.downloadBtn}
                        onClick={() => downloadInvoice(invoice.id)}
                      >
                        <FaDownload /> Download
                      </button>
                      <button
                        className={styles.printBtn}
                        onClick={() => printInvoice(invoice.id)}
                      >
                        <FaPrint /> Print
                      </button>
                      {(isPending || isOverdue) && (
                        <button
                          className={styles.reminderBtn}
                          onClick={() => sendReminder(invoice.id)}
                        >
                          <FaEnvelope /> Remind
                        </button>
                      )}
                      {isPending && (
                        <button
                          className={styles.markPaidBtn}
                          onClick={() => markAsPaid(invoice.id)}
                        >
                          <FaCheckCircle /> Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className={styles.noInvoices}>
              <FaFileInvoice className={styles.noDataIcon} />
              <p>No invoices found matching your criteria.</p>
            </div>
          )}
        </div>

        {selectedInvoice && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Invoice Details</h3>
                <button className={styles.closeBtn} onClick={closeView}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.invoiceDetailSection}>
                  <h4>Invoice Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Invoice ID:</label>
                      <span>{selectedInvoice.id}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Status:</label>
                      <span
                        className={`${styles.status} ${selectedInvoice.status.toLowerCase()}`}
                      >
                        {selectedInvoice.status}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Issue Date:</label>
                      <span>{selectedInvoice.issueDate}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Due Date:</label>
                      <span>{selectedInvoice.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.invoiceDetailSection}>
                  <h4>Member Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Member Name:</label>
                      <span>{selectedInvoice.memberName}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Member ID:</label>
                      <span>{selectedInvoice.memberId}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Plan:</label>
                      <span>{selectedInvoice.plan}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Branch:</label>
                      <span>{selectedInvoice.branch}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.invoiceDetailSection}>
                  <h4>Payment Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Amount:</label>
                      <span className={styles.amount}>
                        {selectedInvoice.amount}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Payment Method:</label>
                      <span>{selectedInvoice.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => downloadInvoice(selectedInvoice.id)}
                >
                  <FaDownload /> Download Invoice
                </button>
                <button className={styles.secondaryBtn} onClick={closeView}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showGenerateModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Generate New Invoice</h3>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowGenerateModal(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Member Name *</label>
                    <select className={styles.selectInput}>
                      <option value="">Select Member</option>
                      <option value="M001">John Doe</option>
                      <option value="M002">Jane Smith</option>
                      <option value="M003">Mike Johnson</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Plan *</label>
                    <select className={styles.selectInput}>
                      <option value="">Select Plan</option>
                      <option value="Basic Family Plan">
                        Basic Family Plan - R800
                      </option>
                      <option value="Family Plan Plus">
                        Family Plan Plus - R1,200
                      </option>
                      <option value="Premium Family Plan">
                        Premium Family Plan - R2,000
                      </option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Issue Date *</label>
                    <input
                      type="date"
                      className={styles.dateInput}
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Due Date *</label>
                    <input
                      type="date"
                      className={styles.dateInput}
                      defaultValue={
                        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Payment Method</label>
                    <select className={styles.selectInput}>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Debit Order">Debit Order</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Branch</label>
                    <select className={styles.selectInput}>
                      {branchOptions
                        .filter((b) => b !== "All")
                        .map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={handleGenerateInvoice}
                >
                  <FaFileInvoice /> Generate Invoice
                </button>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setShowGenerateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
