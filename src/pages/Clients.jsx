// src/pages/Clients.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBan,
  FaUnlock,
  FaKey,
  FaEye,
  FaPlus,
  FaFilter,
} from "react-icons/fa";
import styles from "../styles/Clients.module.css";

const Clients = () => {
  const fakeUser = { name: "Super Admin" };

  const [clients, setClients] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+27 61 234 5678",
      role: "Client",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-15",
      branch: "Johannesburg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+27 73 876 5432",
      role: "Client",
      status: "Inactive",
      joinDate: "2024-01-14",
      lastActive: "2024-01-10",
      branch: "Pretoria",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "mike@example.com",
      phone: "+27 62 456 7890",
      role: "Client",
      status: "Active",
      joinDate: "2024-01-13",
      lastActive: "2024-01-15",
      branch: "Cape Town",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+27 64 123 4567",
      role: "Client",
      status: "Active",
      joinDate: "2024-01-12",
      lastActive: "2024-01-14",
      branch: "Durban",
    },
    {
      id: 5,
      name: "David Johnson",
      email: "david@example.com",
      phone: "+27 83 987 6543",
      role: "Client",
      status: "Inactive",
      joinDate: "2024-01-11",
      lastActive: "2024-01-09",
      branch: "Johannesburg",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
  });

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search);

    const matchesStatus =
      statusFilter === "All" || client.status === statusFilter;
    const matchesBranch =
      branchFilter === "All" || client.branch === branchFilter;

    return matchesSearch && matchesStatus && matchesBranch;
  });

  const branches = ["All", ...new Set(clients.map((client) => client.branch))];

  const toggleStatus = (id) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? {
              ...client,
              status: client.status === "Active" ? "Inactive" : "Active",
            }
          : client,
      ),
    );
  };

  const deleteClient = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((client) => client.id !== id));
      if (selectedClient && selectedClient.id === id) setSelectedClient(null);
    }
  };

  const resetPassword = (email) => {
    alert(`Password reset link sent to ${email}`);
  };

  const viewClient = (client) => setSelectedClient(client);
  const closeView = () => setSelectedClient(null);

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) {
      alert("Please fill in all required fields");
      return;
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      role: "Client",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
    };

    setClients((prev) => [...prev, client]);
    setShowAddModal(false);
    setNewClient({ name: "", email: "", phone: "", branch: "" });
  };

  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const inactiveClients = clients.filter((c) => c.status === "Inactive").length;

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.clientsPage}>
        <div className={styles.clientsHeader}>
          <h2>Clients Management</h2>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={styles.addClientBtn}
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus /> Add New Client
            </button>
          </div>
        </div>

        <div className={styles.statsCards}>
          <div className={`${styles.statCard} ${styles.total}`}>
            <div className={styles.statIcon}>
              <FaUser />
            </div>
            <div className={styles.statInfo}>
              <h3>Total Clients</h3>
              <p className={styles.statValue}>{totalClients}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.active}`}>
            <div className={styles.statIcon}>
              <FaCheckCircle />
            </div>
            <div className={styles.statInfo}>
              <h3>Active Clients</h3>
              <p className={styles.statValue}>{activeClients}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.inactive}`}>
            <div className={styles.statIcon}>
              <FaTimesCircle />
            </div>
            <div className={styles.statInfo}>
              <h3>Inactive Clients</h3>
              <p className={styles.statValue}>{inactiveClients}</p>
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
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.clientsTable}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <FaUser /> Name
                </th>
                <th>
                  <FaEnvelope /> Email
                </th>
                <th>
                  <FaPhone /> Phone
                </th>
                <th>Branch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, i) => (
                <tr key={client.id}>
                  <td data-label="#">{i + 1}</td>
                  <td data-label="Name" className={styles.clientName}>
                    {client.name}
                  </td>
                  <td data-label="Email">{client.email}</td>
                  <td data-label="Phone">{client.phone}</td>
                  <td data-label="Branch">{client.branch}</td>
                  <td data-label="Status">
                    {client.status === "Active" ? (
                      <span className={`${styles.status} ${styles.active}`}>
                        <FaCheckCircle /> Active
                      </span>
                    ) : (
                      <span className={`${styles.status} ${styles.inactive}`}>
                        <FaTimesCircle /> Inactive
                      </span>
                    )}
                  </td>
                  <td data-label="Actions" className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => viewClient(client)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => alert(`Edit client ${client.name}`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className={
                        client.status === "Active"
                          ? styles.disableBtn
                          : styles.enableBtn
                      }
                      onClick={() => toggleStatus(client.id)}
                    >
                      {client.status === "Active" ? (
                        <>
                          <FaBan /> Disable
                        </>
                      ) : (
                        <>
                          <FaUnlock /> Enable
                        </>
                      )}
                    </button>
                    <button
                      className={styles.resetBtn}
                      onClick={() => resetPassword(client.email)}
                    >
                      <FaKey /> Reset
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteClient(client.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredClients.length === 0 && (
            <div className={styles.noClients}>
              <FaUser className={styles.noDataIcon} />
              <p>No clients found matching your criteria.</p>
            </div>
          )}
        </div>

        {selectedClient && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Client Details</h3>
                <button className={styles.closeBtn} onClick={closeView}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.clientDetailSection}>
                  <h4>Personal Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Full Name:</label>
                      <span>{selectedClient.name}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Email:</label>
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Phone:</label>
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Role:</label>
                      <span>{selectedClient.role}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.clientDetailSection}>
                  <h4>Account Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Status:</label>
                      <span
                        className={`${styles.status} ${selectedClient.status.toLowerCase()}`}
                      >
                        {selectedClient.status}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Branch:</label>
                      <span>{selectedClient.branch}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Join Date:</label>
                      <span>{selectedClient.joinDate}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Last Active:</label>
                      <span>{selectedClient.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => alert(`Edit ${selectedClient.name}`)}
                >
                  <FaEdit /> Edit Client
                </button>
                <button className={styles.secondaryBtn} onClick={closeView}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Add New Client</h3>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) =>
                        setNewClient({ ...newClient, name: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) =>
                        setNewClient({ ...newClient, email: e.target.value })
                      }
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) =>
                        setNewClient({ ...newClient, phone: e.target.value })
                      }
                      placeholder="+27 12 345 6789"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Branch</label>
                    <select
                      value={newClient.branch}
                      onChange={(e) =>
                        setNewClient({ ...newClient, branch: e.target.value })
                      }
                    >
                      <option value="">Select Branch</option>
                      {branches
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
                <button className={styles.primaryBtn} onClick={handleAddClient}>
                  <FaPlus /> Add Client
                </button>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setShowAddModal(false)}
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

export default Clients;
