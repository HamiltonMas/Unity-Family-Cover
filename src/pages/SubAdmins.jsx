// src/pages/SubAdmins.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaTrash,
  FaBan,
  FaUnlock,
  FaPlus,
  FaEye,
  FaBuilding,
  FaFilter,
  FaKey,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaUserShield,
} from "react-icons/fa";
import styles from "../styles/SubAdmins.module.css";

const SubAdmins = () => {
  const fakeUser = { name: "Super Admin" };

  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@company.com",
      phone: "+27 61 234 5678",
      status: "Active",
      branch: "Johannesburg",
      joinDate: "2024-01-15",
      lastActive: "2024-01-15",
      permissions: ["Manage Users", "View Reports", "Process Claims"],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@company.com",
      phone: "+27 73 876 5432",
      status: "Inactive",
      branch: "Pretoria",
      joinDate: "2024-01-10",
      lastActive: "2024-01-12",
      permissions: ["View Reports"],
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@company.com",
      phone: "+27 82 345 6789",
      status: "Active",
      branch: "Cape Town",
      joinDate: "2024-01-08",
      lastActive: "2024-01-15",
      permissions: ["Manage Users", "Process Claims"],
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [showAddWizard, setShowAddWizard] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [step, setStep] = useState(1);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    permissions: [],
  });

  const branches = ["Johannesburg", "Pretoria", "Cape Town", "Durban"];
  const permissionOptions = [
    "Manage Users",
    "View Reports",
    "Process Claims",
    "Manage Invoices",
    "System Settings",
    "Manage Branches",
  ];

  const filteredAdmins = subAdmins.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || admin.status === statusFilter;
    const matchesBranch =
      branchFilter === "All" || admin.branch === branchFilter;
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const toggleStatus = (id) => {
    setSubAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "Active" ? "Inactive" : "Active",
            }
          : admin,
      ),
    );
  };

  const deleteAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this sub-admin?")) {
      setSubAdmins((prev) => prev.filter((admin) => admin.id !== id));
      if (selectedAdmin && selectedAdmin.id === id) setSelectedAdmin(null);
    }
  };

  const viewAdmin = (admin) => setSelectedAdmin(admin);
  const closeView = () => setSelectedAdmin(null);

  const resetPassword = (email) => {
    alert(`Password reset link sent to ${email}`);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePermissionToggle = (permission) => {
    setNewAdmin((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.branch) {
      alert("Please fill all required fields");
      return;
    }

    const admin = {
      id: subAdmins.length + 1,
      ...newAdmin,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
    };

    setSubAdmins((prev) => [...prev, admin]);
    setShowAddWizard(false);
    setNewAdmin({
      name: "",
      email: "",
      phone: "",
      branch: "",
      permissions: [],
    });
    setStep(1);
  };

  const totalAdmins = subAdmins.length;
  const activeAdmins = subAdmins.filter((a) => a.status === "Active").length;
  const inactiveAdmins = subAdmins.filter(
    (a) => a.status === "Inactive",
  ).length;

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.subadminsPage}>
        <div className={styles.subadminsHeader}>
          <h2>Sub Admins Management</h2>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search sub-admins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={styles.addBtn}
              onClick={() => setShowAddWizard(true)}
            >
              <FaPlus /> Add Sub Admin
            </button>
          </div>
        </div>

        <div className={styles.statsCards}>
          <div className={`${styles.statCard} ${styles.total}`}>
            <div className={styles.statIcon}>
              <FaUserShield />
            </div>
            <div className={styles.statInfo}>
              <h3>Total Sub Admins</h3>
              <p className={styles.statValue}>{totalAdmins}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.active}`}>
            <div className={styles.statIcon}>
              <FaCheckCircle />
            </div>
            <div className={styles.statInfo}>
              <h3>Active Admins</h3>
              <p className={styles.statValue}>{activeAdmins}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.inactive}`}>
            <div className={styles.statIcon}>
              <FaTimesCircle />
            </div>
            <div className={styles.statInfo}>
              <h3>Inactive Admins</h3>
              <p className={styles.statValue}>{inactiveAdmins}</p>
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
              <option value="All">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.subadminsTable}>
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
                <th>
                  <FaBuilding /> Branch
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin, i) => (
                <tr key={admin.id}>
                  <td data-label="#">{i + 1}</td>
                  <td data-label="Name" className={styles.adminName}>
                    {admin.name}
                  </td>
                  <td data-label="Email">{admin.email}</td>
                  <td data-label="Phone">{admin.phone}</td>
                  <td data-label="Branch">{admin.branch}</td>
                  <td data-label="Status">
                    {admin.status === "Active" ? (
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
                      onClick={() => viewAdmin(admin)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => alert(`Edit admin ${admin.name}`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className={
                        admin.status === "Active"
                          ? styles.disableBtn
                          : styles.enableBtn
                      }
                      onClick={() => toggleStatus(admin.id)}
                    >
                      {admin.status === "Active" ? (
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
                      onClick={() => resetPassword(admin.email)}
                    >
                      <FaKey /> Reset
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteAdmin(admin.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAdmins.length === 0 && (
            <div className={styles.noAdmins}>
              <FaUserShield className={styles.noDataIcon} />
              <p>No sub-admins found matching your criteria.</p>
            </div>
          )}
        </div>

        {selectedAdmin && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Sub Admin Details</h3>
                <button className={styles.closeBtn} onClick={closeView}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.adminDetailSection}>
                  <h4>Personal Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Full Name:</label>
                      <span>{selectedAdmin.name}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Email:</label>
                      <span>{selectedAdmin.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Phone:</label>
                      <span>{selectedAdmin.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Branch:</label>
                      <span>{selectedAdmin.branch}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.adminDetailSection}>
                  <h4>Account Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Status:</label>
                      <span
                        className={`${styles.status} ${selectedAdmin.status.toLowerCase()}`}
                      >
                        {selectedAdmin.status}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Join Date:</label>
                      <span>{selectedAdmin.joinDate}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Last Active:</label>
                      <span>{selectedAdmin.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.adminDetailSection}>
                  <h4>Permissions</h4>
                  <div className={styles.permissionsList}>
                    {selectedAdmin.permissions.map((permission, index) => (
                      <span key={index} className={styles.permissionTag}>
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => alert(`Edit ${selectedAdmin.name}`)}
                >
                  <FaEdit /> Edit Admin
                </button>
                <button className={styles.secondaryBtn} onClick={closeView}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddWizard && (
          <div className={styles.modalOverlay}>
            <div className={styles.wizard}>
              <div className={styles.wizardHeader}>
                <h3>Add New Sub Admin - Step {step}/3</h3>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowAddWizard(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.wizardBody}>
                {step === 1 && (
                  <div className={styles.wizardStep}>
                    <h4>Personal Information</h4>
                    <div className={styles.formGroup}>
                      <label>Full Name *</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={newAdmin.name}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, name: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email Address *</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={newAdmin.email}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, email: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+27 12 345 6789"
                        value={newAdmin.phone}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className={styles.wizardStep}>
                    <h4>Branch & Permissions</h4>
                    <div className={styles.formGroup}>
                      <label>Assign Branch *</label>
                      <select
                        value={newAdmin.branch}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, branch: e.target.value })
                        }
                      >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Permissions</label>
                      <div className={styles.permissionsGrid}>
                        {permissionOptions.map((permission) => (
                          <label
                            key={permission}
                            className={styles.permissionCheckbox}
                          >
                            <input
                              type="checkbox"
                              checked={newAdmin.permissions.includes(
                                permission,
                              )}
                              onChange={() =>
                                handlePermissionToggle(permission)
                              }
                            />
                            <span className={styles.checkmark}></span>
                            {permission}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className={styles.wizardStep}>
                    <h4>Confirm Details</h4>
                    <div className={styles.confirmationDetails}>
                      <div className={styles.confirmationItem}>
                        <label>Name:</label>
                        <span>{newAdmin.name || "Not provided"}</span>
                      </div>
                      <div className={styles.confirmationItem}>
                        <label>Email:</label>
                        <span>{newAdmin.email || "Not provided"}</span>
                      </div>
                      <div className={styles.confirmationItem}>
                        <label>Phone:</label>
                        <span>{newAdmin.phone || "Not provided"}</span>
                      </div>
                      <div className={styles.confirmationItem}>
                        <label>Branch:</label>
                        <span>{newAdmin.branch || "Not selected"}</span>
                      </div>
                      <div className={styles.confirmationItem}>
                        <label>Permissions:</label>
                        <div className={styles.confirmationPermissions}>
                          {newAdmin.permissions.length > 0 ? (
                            newAdmin.permissions.map((permission, index) => (
                              <span
                                key={index}
                                className={styles.permissionTag}
                              >
                                {permission}
                              </span>
                            ))
                          ) : (
                            <span className={styles.noPermissions}>
                              No permissions selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.wizardActions}>
                {step > 1 && (
                  <button className={styles.prevBtn} onClick={handlePrev}>
                    <FaArrowLeft /> Previous
                  </button>
                )}
                {step < 3 ? (
                  <button className={styles.nextBtn} onClick={handleNext}>
                    Next <FaArrowRight />
                  </button>
                ) : (
                  <button className={styles.saveBtn} onClick={handleAddAdmin}>
                    <FaSave /> Add Sub Admin
                  </button>
                )}
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowAddWizard(false)}
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

export default SubAdmins;
