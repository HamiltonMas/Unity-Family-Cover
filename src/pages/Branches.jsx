// src/pages/Branches.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaEye,
  FaSort,
} from "react-icons/fa";
import styles from "../styles/Branches.module.css";

const Branches = () => {
  const fakeUser = { name: "Super Admin" };

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Johannesburg Main",
      code: "JHB-001",
      address: "123 Main Street, Johannesburg, 2000",
      phone: "+27 11 123 4567",
      email: "johannesburg@unityfamilycover.co.za",
      manager: "Thabo Mbeki",
      status: "Active",
      totalMembers: 542,
      totalStaff: 15,
      established: "2020-03-15",
      region: "Gauteng",
    },
    {
      id: 2,
      name: "Pretoria Central",
      code: "PTA-001",
      address: "456 Church Street, Pretoria, 0001",
      phone: "+27 12 234 5678",
      email: "pretoria@unityfamilycover.co.za",
      manager: "Sarah Johnson",
      status: "Active",
      totalMembers: 387,
      totalStaff: 12,
      established: "2021-06-20",
      region: "Gauteng",
    },
    {
      id: 3,
      name: "Cape Town Coastal",
      code: "CPT-001",
      address: "789 Beach Road, Cape Town, 8001",
      phone: "+27 21 345 6789",
      email: "capetown@unityfamilycover.co.za",
      manager: "David Williams",
      status: "Active",
      totalMembers: 298,
      totalStaff: 10,
      established: "2022-01-10",
      region: "Western Cape",
    },
    {
      id: 4,
      name: "Durban Beachfront",
      code: "DBN-001",
      address: "321 Marine Parade, Durban, 4001",
      phone: "+27 31 456 7890",
      email: "durban@unityfamilycover.co.za",
      manager: "Nomalanga Zulu",
      status: "Inactive",
      totalMembers: 0,
      totalStaff: 0,
      established: "2023-08-05",
      region: "KwaZulu-Natal",
    },
    {
      id: 5,
      name: "Port Elizabeth",
      code: "PE-001",
      address: "654 Summerstrand, Port Elizabeth, 6001",
      phone: "+27 41 567 8901",
      email: "portelizabeth@unityfamilycover.co.za",
      manager: "Michael Brown",
      status: "Active",
      totalMembers: 156,
      totalStaff: 8,
      established: "2022-11-30",
      region: "Eastern Cape",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [newBranch, setNewBranch] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
    region: "",
    established: "",
  });

  const filteredBranches = branches
    .filter((branch) => {
      const matchesSearch =
        branch.name.toLowerCase().includes(search.toLowerCase()) ||
        branch.code.toLowerCase().includes(search.toLowerCase()) ||
        branch.manager.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || branch.status === statusFilter;
      const matchesRegion =
        regionFilter === "All" || branch.region === regionFilter;

      return matchesSearch && matchesStatus && matchesRegion;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "established") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const regions = [
    "All",
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape",
    "Free State",
    "Mpumalanga",
  ];

  const viewBranch = (branch) => setSelectedBranch(branch);
  const closeView = () => setSelectedBranch(null);

  const toggleStatus = (id) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === id
          ? {
              ...branch,
              status: branch.status === "Active" ? "Inactive" : "Active",
            }
          : branch,
      ),
    );
  };

  const deleteBranch = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this branch? This action cannot be undone.",
      )
    ) {
      setBranches((prev) => prev.filter((branch) => branch.id !== id));
      if (selectedBranch && selectedBranch.id === id) setSelectedBranch(null);
    }
  };

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.code || !newBranch.address) {
      alert("Please fill in all required fields");
      return;
    }

    const branch = {
      id: branches.length + 1,
      ...newBranch,
      status: "Active",
      totalMembers: 0,
      totalStaff: 0,
    };

    setBranches((prev) => [...prev, branch]);
    setShowAddModal(false);
    setNewBranch({
      name: "",
      code: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
      region: "",
      established: "",
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <FaSort />;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const totalBranches = branches.length;
  const activeBranches = branches.filter((b) => b.status === "Active").length;
  const totalMembers = branches.reduce((sum, b) => sum + b.totalMembers, 0);
  const totalStaff = branches.reduce((sum, b) => sum + b.totalStaff, 0);

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.branchesPage}>
        <div className={styles.branchesHeader}>
          <h2>Branches Management</h2>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search branches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={styles.addBranchBtn}
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus /> Add New Branch
            </button>
          </div>
        </div>

        <div className={styles.statsCards}>
          <div className={`${styles.statCard} ${styles.total}`}>
            <div className={styles.statIcon}>
              <FaMapMarkerAlt />
            </div>
            <div className={styles.statInfo}>
              <h3>Total Branches</h3>
              <p className={styles.statValue}>{totalBranches}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.active}`}>
            <div className={styles.statIcon}>
              <FaCheckCircle />
            </div>
            <div className={styles.statInfo}>
              <h3>Active Branches</h3>
              <p className={styles.statValue}>{activeBranches}</p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.members}`}>
            <div className={styles.statIcon}>
              <FaUsers />
            </div>
            <div className={styles.statInfo}>
              <h3>Total Members</h3>
              <p className={styles.statValue}>
                {totalMembers.toLocaleString()}
              </p>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.staff}`}>
            <div className={styles.statIcon}>
              <FaUsers />
            </div>
            <div className={styles.statInfo}>
              <h3>Total Staff</h3>
              <p className={styles.statValue}>{totalStaff}</p>
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
              <FaFilter /> Region
            </label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.branchesTable}>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Branch Name {getSortIcon("name")}
                </th>
                <th onClick={() => handleSort("code")}>
                  Code {getSortIcon("code")}
                </th>
                <th>Contact Info</th>
                <th onClick={() => handleSort("manager")}>
                  Manager {getSortIcon("manager")}
                </th>
                <th onClick={() => handleSort("totalMembers")}>
                  Members {getSortIcon("totalMembers")}
                </th>
                <th>Staff</th>
                <th onClick={() => handleSort("region")}>
                  Region {getSortIcon("region")}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch) => (
                <tr key={branch.id}>
                  <td data-label="Branch" className={styles.branchName}>
                    <div className={styles.nameWrapper}>
                      <FaMapMarkerAlt className={styles.branchIcon} />
                      <span>{branch.name}</span>
                    </div>
                  </td>
                  <td data-label="Code" className={styles.branchCode}>
                    {branch.code}
                  </td>
                  <td data-label="Contact" className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <FaPhone /> {branch.phone}
                    </div>
                    <div className={styles.contactItem}>
                      <FaEnvelope /> {branch.email}
                    </div>
                  </td>
                  <td data-label="Manager">{branch.manager}</td>
                  <td data-label="Members" className={styles.membersCount}>
                    {branch.totalMembers.toLocaleString()}
                  </td>
                  <td data-label="Staff" className={styles.staffCount}>
                    {branch.totalStaff}
                  </td>
                  <td data-label="Region">{branch.region}</td>
                  <td data-label="Status">
                    {branch.status === "Active" ? (
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
                      onClick={() => viewBranch(branch)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => alert(`Edit branch: ${branch.name}`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className={
                        branch.status === "Active"
                          ? styles.disableBtn
                          : styles.enableBtn
                      }
                      onClick={() => toggleStatus(branch.id)}
                    >
                      {branch.status === "Active" ? (
                        <>
                          <FaTimesCircle /> Disable
                        </>
                      ) : (
                        <>
                          <FaCheckCircle /> Enable
                        </>
                      )}
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteBranch(branch.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBranches.length === 0 && (
            <div className={styles.noBranches}>
              <FaMapMarkerAlt className={styles.noDataIcon} />
              <p>No branches found matching your criteria.</p>
            </div>
          )}
        </div>

        {selectedBranch && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Branch Details</h3>
                <button className={styles.closeBtn} onClick={closeView}>
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.branchDetailSection}>
                  <h4>Basic Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Branch Name:</label>
                      <span>{selectedBranch.name}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Branch Code:</label>
                      <span>{selectedBranch.code}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Manager:</label>
                      <span>{selectedBranch.manager}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Region:</label>
                      <span>{selectedBranch.region}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Established:</label>
                      <span>
                        {new Date(
                          selectedBranch.established,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Status:</label>
                      <span
                        className={`${styles.status} ${selectedBranch.status.toLowerCase()}`}
                      >
                        {selectedBranch.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.branchDetailSection}>
                  <h4>Contact Information</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Address:</label>
                      <span>{selectedBranch.address}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Phone:</label>
                      <span>{selectedBranch.phone}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Email:</label>
                      <span>{selectedBranch.email}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.branchDetailSection}>
                  <h4>Statistics</h4>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <label>Total Members:</label>
                      <span>
                        {selectedBranch.totalMembers.toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Total Staff:</label>
                      <span>{selectedBranch.totalStaff}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => alert(`Edit ${selectedBranch.name}`)}
                >
                  <FaEdit /> Edit Branch
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
                <h3>Add New Branch</h3>
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
                    <label>Branch Name *</label>
                    <input
                      type="text"
                      value={newBranch.name}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, name: e.target.value })
                      }
                      placeholder="e.g., Johannesburg Main"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Branch Code *</label>
                    <input
                      type="text"
                      value={newBranch.code}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, code: e.target.value })
                      }
                      placeholder="e.g., JHB-001"
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Address *</label>
                    <input
                      type="text"
                      value={newBranch.address}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, address: e.target.value })
                      }
                      placeholder="Full street address"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={newBranch.phone}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, phone: e.target.value })
                      }
                      placeholder="+27 11 123 4567"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={newBranch.email}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, email: e.target.value })
                      }
                      placeholder="branch@company.co.za"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Manager</label>
                    <input
                      type="text"
                      value={newBranch.manager}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, manager: e.target.value })
                      }
                      placeholder="Branch manager name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Region</label>
                    <select
                      value={newBranch.region}
                      onChange={(e) =>
                        setNewBranch({ ...newBranch, region: e.target.value })
                      }
                    >
                      <option value="">Select Region</option>
                      {regions
                        .filter((r) => r !== "All")
                        .map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Established Date</label>
                    <input
                      type="date"
                      value={newBranch.established}
                      onChange={(e) =>
                        setNewBranch({
                          ...newBranch,
                          established: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.primaryBtn} onClick={handleAddBranch}>
                  <FaPlus /> Add Branch
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

export default Branches;
