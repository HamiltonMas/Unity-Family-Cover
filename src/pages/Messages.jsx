// src/pages/Messages.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaReply,
  FaArchive,
  FaTrash,
  FaEnvelope,
  FaEnvelopeOpen,
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaUserCircle,
  FaSort,
  FaPaperclip,
  FaTimes,
} from "react-icons/fa";
import styles from "../styles/Messages.module.css";

const Messages = () => {
  const fakeUser = { name: "Super Admin" };

  // Sample messages data from clients
  const [messages, setMessages] = useState([
    {
      id: 1,
      clientName: "John Doe",
      clientId: "M001",
      email: "john.doe@email.com",
      phone: "+27 61 234 5678",
      subject: "Claim Status Inquiry",
      message:
        "Hello, I submitted a claim last week and haven't received any update. Could you please check the status for me?",
      priority: "High",
      status: "unread", // unread, read, replied, closed
      category: "Claims",
      timestamp: "2024-01-15 10:30:00",
      attachments: 1,
      branch: "Johannesburg",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      clientId: "M002",
      email: "jane.smith@email.com",
      phone: "+27 73 876 5432",
      subject: "Family Member Addition",
      message:
        "I need to add my newborn baby to our family plan. What documents are required for this process?",
      priority: "Medium",
      status: "read",
      category: "Membership",
      timestamp: "2024-01-15 09:15:00",
      attachments: 0,
      branch: "Pretoria",
    },
    {
      id: 3,
      clientName: "Mike Johnson",
      clientId: "M003",
      email: "mike.j@email.com",
      phone: "+27 62 456 7890",
      subject: "Payment Issue",
      message:
        "My payment failed this month but the funds are available. Can you help me resolve this?",
      priority: "High",
      status: "replied",
      category: "Billing",
      timestamp: "2024-01-14 16:45:00",
      attachments: 0,
      branch: "Cape Town",
    },
    {
      id: 4,
      clientName: "Sarah Wilson",
      clientId: "M004",
      email: "sarah.wilson@email.com",
      phone: "+27 64 123 4567",
      subject: "Plan Upgrade Request",
      message:
        "I'd like to upgrade from Basic Family Plan to Family Plan Plus. Can you send me the details?",
      priority: "Low",
      status: "closed",
      category: "Plans",
      timestamp: "2024-01-14 14:20:00",
      attachments: 0,
      branch: "Johannesburg",
    },
    {
      id: 5,
      clientName: "David Brown",
      clientId: "M005",
      email: "david.b@email.com",
      phone: "+27 83 987 6543",
      subject: "URGENT: Medical Emergency Coverage",
      message:
        "My spouse was hospitalized yesterday. What's covered under our emergency medical benefits?",
      priority: "High",
      status: "unread",
      category: "Coverage",
      timestamp: "2024-01-15 11:30:00",
      attachments: 2,
      branch: "Durban",
    },
    {
      id: 6,
      clientName: "Lisa Anderson",
      clientId: "M006",
      email: "lisa.a@email.com",
      phone: "+27 71 234 5678",
      subject: "Document Submission Confirmation",
      message:
        "I uploaded the required documents for my claim. Please confirm receipt and processing timeline.",
      priority: "Medium",
      status: "read",
      category: "Claims",
      timestamp: "2024-01-13 13:15:00",
      attachments: 3,
      branch: "Johannesburg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter and sort messages
  const filteredMessages = messages
    .filter((message) => {
      const matchesSearch =
        message.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || message.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || message.priority === priorityFilter;
      const matchesCategory =
        categoryFilter === "all" || message.category === categoryFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "timestamp") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Actions
  const viewMessage = (message) => {
    setSelectedMessage(message);
    // Mark as read when viewing
    if (message.status === "unread") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" } : msg,
        ),
      );
    }
  };

  const closeView = () => {
    setSelectedMessage(null);
  };

  const replyToMessage = (message) => {
    alert(
      `Reply to: ${message.clientName}\nSubject: ${message.subject}\n\nOpening reply form...`,
    );
    // Mark as replied
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === message.id ? { ...msg, status: "replied" } : msg,
      ),
    );
    if (selectedMessage && selectedMessage.id === message.id) {
      setSelectedMessage((prev) => ({ ...prev, status: "replied" }));
    }
  };

  const archiveMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  const closeMessage = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "closed" } : msg)),
    );
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((prev) => ({ ...prev, status: "closed" }));
    }
  };

  const markAsUnread = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "unread" } : msg)),
    );
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((prev) => ({ ...prev, status: "unread" }));
    }
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "unread":
        return {
          icon: <FaEnvelope />,
          color: "#ef4444",
          bgColor: "#fee2e2",
          label: "Unread",
        };
      case "read":
        return {
          icon: <FaEnvelopeOpen />,
          color: "#3b82f6",
          bgColor: "#dbeafe",
          label: "Read",
        };
      case "replied":
        return {
          icon: <FaReply />,
          color: "#10b981",
          bgColor: "#d1fae5",
          label: "Replied",
        };
      case "closed":
        return {
          icon: <FaCheckCircle />,
          color: "#6b7280",
          bgColor: "#f3f4f6",
          label: "Closed",
        };
      default:
        return {
          icon: <FaEnvelopeOpen />,
          color: "#6b7280",
          bgColor: "#f3f4f6",
          label: "Read",
        };
    }
  };

  // Get priority icon and color
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "High":
        return {
          icon: <FaExclamationCircle />,
          color: "#ef4444",
          label: "High Priority",
        };
      case "Medium":
        return {
          icon: <FaClock />,
          color: "#f59e0b",
          label: "Medium Priority",
        };
      case "Low":
        return { icon: <FaClock />, color: "#10b981", label: "Low Priority" };
      default:
        return { icon: <FaClock />, color: "#6b7280", label: "Normal" };
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays > 1) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Sort handler
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Get sort icon
  const getSortIcon = (column) => {
    if (sortBy !== column) return <FaSort />;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  // Statistics
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(
    (msg) => msg.status === "unread",
  ).length;
  const highPriorityMessages = messages.filter(
    (msg) => msg.priority === "High",
  ).length;

  return (
    <DashboardLayout user={fakeUser}>
      <div className={styles.messagesPage}>
        <div className={styles.messagesHeader}>
          <h1>Client Messages</h1>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalMessages}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={`${styles.stat} ${styles.unread}`}>
              <span className={styles.statValue}>{unreadMessages}</span>
              <span className={styles.statLabel}>Unread</span>
            </div>
            <div className={`${styles.stat} ${styles.urgent}`}>
              <span className={styles.statValue}>{highPriorityMessages}</span>
              <span className={styles.statLabel}>Urgent</span>
            </div>
          </div>
        </div>

        <div className={styles.messagesContainer}>
          {/* Messages List Panel */}
          <div className={styles.messagesListPanel}>
            {/* Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className={styles.filterGroup}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Claims">Claims</option>
                  <option value="Billing">Billing</option>
                  <option value="Membership">Membership</option>
                  <option value="Plans">Plans</option>
                  <option value="Coverage">Coverage</option>
                </select>
              </div>
            </div>

            {/* Messages List */}
            <div className={styles.messagesList}>
              <div className={styles.listHeader}>
                <div
                  className={styles.headerItem}
                  onClick={() => handleSort("clientName")}
                >
                  Client {getSortIcon("clientName")}
                </div>
                <div
                  className={styles.headerItem}
                  onClick={() => handleSort("subject")}
                >
                  Subject {getSortIcon("subject")}
                </div>
                <div
                  className={styles.headerItem}
                  onClick={() => handleSort("category")}
                >
                  Category {getSortIcon("category")}
                </div>
                <div
                  className={styles.headerItem}
                  onClick={() => handleSort("timestamp")}
                >
                  Date {getSortIcon("timestamp")}
                </div>
              </div>

              <div className={styles.messagesItems}>
                {filteredMessages.map((message) => {
                  const statusInfo = getStatusInfo(message.status);
                  const priorityInfo = getPriorityInfo(message.priority);

                  return (
                    <div
                      key={message.id}
                      className={`${styles.messageItem} ${message.status === "unread" ? styles.unread : ""} ${
                        selectedMessage?.id === message.id
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => viewMessage(message)}
                    >
                      <div className={styles.messagePreview}>
                        <div className={styles.clientInfo}>
                          <div className={styles.clientAvatar}>
                            <FaUserCircle />
                          </div>
                          <div className={styles.clientDetails}>
                            <h4 className={styles.clientName}>
                              {message.clientName}
                            </h4>
                            <p className={styles.messageSubject}>
                              {message.subject}
                            </p>
                            <p className={styles.messageExcerpt}>
                              {message.message}
                            </p>
                          </div>
                        </div>

                        <div className={styles.messageMeta}>
                          <div className={styles.metaItem}>
                            <span
                              className={styles.priorityBadge}
                              style={{ color: priorityInfo.color }}
                              title={priorityInfo.label}
                            >
                              {priorityInfo.icon}
                            </span>
                          </div>

                          <div className={styles.metaItem}>
                            <span className={styles.categoryTag}>
                              {message.category}
                            </span>
                          </div>

                          <div className={styles.metaItem}>
                            <span className={styles.timestamp}>
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>

                          <div className={styles.metaItem}>
                            <span
                              className={styles.statusBadge}
                              style={{
                                color: statusInfo.color,
                                backgroundColor: statusInfo.bgColor,
                              }}
                            >
                              {statusInfo.icon}
                            </span>
                          </div>

                          {message.attachments > 0 && (
                            <div className={styles.metaItem}>
                              <span
                                className={styles.attachmentIndicator}
                                title={`${message.attachments} attachment(s)`}
                              >
                                <FaPaperclip />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredMessages.length === 0 && (
                  <div className={styles.noMessages}>
                    <FaEnvelopeOpen className={styles.noMessagesIcon} />
                    <p>No messages found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Detail Panel */}
          <div className={styles.messageDetailPanel}>
            {selectedMessage ? (
              <div className={styles.messageDetail}>
                <div className={styles.detailHeader}>
                  <div className={styles.messageTitle}>
                    <h3>{selectedMessage.subject}</h3>
                    <div className={styles.messageTags}>
                      <span
                        className={styles.priorityTag}
                        style={{
                          color: getPriorityInfo(selectedMessage.priority)
                            .color,
                          backgroundColor:
                            getPriorityInfo(selectedMessage.priority).color +
                            "20",
                        }}
                      >
                        {getPriorityInfo(selectedMessage.priority).icon}{" "}
                        {selectedMessage.priority} Priority
                      </span>
                      <span className={styles.categoryTag}>
                        {selectedMessage.category}
                      </span>
                      <span
                        className={styles.statusTag}
                        style={{
                          color: getStatusInfo(selectedMessage.status).color,
                          backgroundColor: getStatusInfo(selectedMessage.status)
                            .bgColor,
                        }}
                      >
                        {getStatusInfo(selectedMessage.status).icon}{" "}
                        {getStatusInfo(selectedMessage.status).label}
                      </span>
                    </div>
                  </div>

                  <div className={styles.messageActions}>
                    <button
                      className={styles.replyBtn}
                      onClick={() => replyToMessage(selectedMessage)}
                    >
                      <FaReply /> Reply
                    </button>
                    <button
                      className={styles.closeBtn}
                      onClick={() => closeMessage(selectedMessage.id)}
                    >
                      <FaCheckCircle /> Close
                    </button>
                    {selectedMessage.status !== "unread" && (
                      <button
                        className={styles.markUnreadBtn}
                        onClick={() => markAsUnread(selectedMessage.id)}
                      >
                        <FaEnvelope /> Mark Unread
                      </button>
                    )}
                    <button
                      className={styles.archiveBtn}
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      <FaTrash /> Archive
                    </button>
                  </div>
                </div>

                <div className={styles.clientInfoDetailed}>
                  <div className={styles.clientAvatar}>
                    <FaUserCircle />
                  </div>
                  <div className={styles.clientDetails}>
                    <h4>{selectedMessage.clientName}</h4>
                    <p>Member ID: {selectedMessage.clientId}</p>
                    <p>Email: {selectedMessage.email}</p>
                    <p>Phone: {selectedMessage.phone}</p>
                    <p>Branch: {selectedMessage.branch}</p>
                  </div>
                  <div className={styles.messageTime}>
                    <p>
                      Received:{" "}
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className={styles.messageContent}>
                  <div className={styles.contentHeader}>
                    <h4>Message:</h4>
                    {selectedMessage.attachments > 0 && (
                      <div className={styles.attachments}>
                        <FaPaperclip /> {selectedMessage.attachments}{" "}
                        attachment(s)
                      </div>
                    )}
                  </div>
                  <div className={styles.messageText}>
                    <p>{selectedMessage.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.noMessageSelected}>
                <FaEnvelope className={styles.selectMessageIcon} />
                <h3>Select a Message</h3>
                <p>Choose a message from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
