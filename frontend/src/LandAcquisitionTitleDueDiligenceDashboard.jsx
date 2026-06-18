import { useState } from "react";

const statusColor = (s) => {
  const map = {
    Completed: { bg: "#dcfce7", color: "#15803d" },
    "In Progress": { bg: "#dbeafe", color: "#1d4ed8" },
    Pending: { bg: "#fef9c3", color: "#a16207" },
    "Legal Review": { bg: "#ede9fe", color: "#7c3aed" },
    Approved: { bg: "#dcfce7", color: "#15803d" },
    Rejected: { bg: "#fee2e2", color: "#dc2626" },
    Verified: { bg: "#dcfce7", color: "#15803d" },
    "Issue Found": { bg: "#fee2e2", color: "#dc2626" },
    Initiated: { bg: "#f0f9ff", color: "#0369a1" },
  };
  return map[s] || { bg: "#f1f5f9", color: "#475569" };
};

const Badge = ({ label }) => {
  const { bg, color } = statusColor(label);
  return (
    <span
      style={{
        background: bg,
        color,
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
};

const statCards = [
  { label: "Total Parcels", value: "1,248", icon: "▦", color: "#2563eb" },
  { label: "Title Search Pending", value: "286", icon: "🔍", color: "#f59e0b" },
  { label: "Encumbrance Pending", value: "312", icon: "🛡", color: "#8b5cf6" },
  { label: "Legal Clearance Pending", value: "248", icon: "⚖", color: "#0891b2" },
  { label: "Approved Parcels", value: "342", icon: "✓", color: "#16a34a" },
  { label: "Rejected Parcels", value: "60", icon: "✕", color: "#dc2626" },
];

const parcels = [
  {
    id: "PRC-000125",
    survey: "SY123/2024",
    name: "Green Acres",
    owner: "Ramesh Kumar",
    district: "Hyderabad",
    area: 12.5,
    title: "Completed",
    enc: "Verified",
    legal: "Approved",
    updated: "20-May-2024",
  },
  {
    id: "PRC-000124",
    survey: "SY122/2024",
    name: "Sunrise Plot",
    owner: "Suresh Rao",
    district: "Ranga Reddy",
    area: 8.75,
    title: "In Progress",
    enc: "Pending",
    legal: "Legal Review",
    updated: "19-May-2024",
  },
  {
    id: "PRC-000123",
    survey: "SY121/2024",
    name: "Hill View Land",
    owner: "Lakshmi Devi",
    district: "Medchal",
    area: 15.2,
    title: "Pending",
    enc: "Issue Found",
    legal: "Initiated",
    updated: "18-May-2024",
  },
  {
    id: "PRC-000122",
    survey: "SY120/2024",
    name: "Golden Fields",
    owner: "Anil Reddy",
    district: "Vikarabad",
    area: 20.0,
    title: "Completed",
    enc: "Verified",
    legal: "Approved",
    updated: "17-May-2024",
  },
  {
    id: "PRC-000121",
    survey: "SY119/2024",
    name: "Lake Side Plot",
    owner: "Mohan Gupta",
    district: "Nizamabad",
    area: 9.3,
    title: "Rejected",
    enc: "Rejected",
    legal: "Rejected",
    updated: "16-May-2024",
  },
];

export default function Dashboard() {
  const [filters] = useState({ survey: "", parcel: "", owner: "", district: "" });
  const thStyle = {
    padding: "9px 12px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: "#475569",
    background: "#f8fafc",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #e2e8f0",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };
  const tdStyle = {
    padding: "9px 12px",
    fontSize: 12,
    color: "#374151",
    borderBottom: "1px solid #f1f5f9",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      {/* Filters */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Filters
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr auto auto",
            gap: 10,
            alignItems: "end",
          }}
        >
          {[
            ["Survey Number", "Enter Survey Number"],
            ["Parcel Name", "Enter Parcel Name"],
            ["Owner Name", "Enter Owner Name"],
          ].map(([l, p]) => (
            <div key={l}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                {l}
              </div>
              <input
                placeholder={p}
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: 5,
                  padding: "7px 10px",
                  fontSize: 12,
                  color: "#374151",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
              District
            </div>
            <select
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: 5,
                padding: "7px 10px",
                fontSize: 12,
                color: "#6b7280",
                outline: "none",
              }}
            >
              <option>Select Status</option>
              <option>Hyderabad</option>
              <option>Ranga Reddy</option>
            </select>
          </div>
          <button
            style={{
              background: "#1e293b",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              height: 34,
              alignSelf: "end",
            }}
          >
            Search
          </button>
          <button
            style={{
              background: "#fff",
              color: "#475569",
              border: "1px solid #d1d5db",
              borderRadius: 5,
              padding: "8px 14px",
              fontSize: 12,
              cursor: "pointer",
              height: 34,
              alignSelf: "end",
            }}
          >
            Clear Filters
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginTop: 12,
          }}
        >
          {[
            ["Title Search Status", "All"],
            ["Encumbrance Status", "All"],
            ["Legal Clearance Stage", "All"],
          ].map(([l, d]) => (
            <div key={l}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3 }}>{l}</div>
              <select
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: 5,
                  padding: "6px 10px",
                  fontSize: 12,
                  color: "#374151",
                  outline: "none",
                }}
              >
                <option>{d}</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "end" }}>
            {["From Date", "To Date"].map((l) => (
              <div key={l} style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 3 }}>{l}</div>
                <input
                  placeholder="DD-MM-YYYY"
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: 5,
                    padding: "6px 10px",
                    fontSize: 12,
                    color: "#374151",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#f8fafc",
              border: "1px solid #d1d5db",
              borderRadius: 5,
              padding: "6px 14px",
              fontSize: 12,
              color: "#374151",
              cursor: "pointer",
            }}
          >
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {statCards.map(({ label, value, icon, color }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18, color }}>{icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1e293b" }}>{value}</div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid #e2e8f0",
            fontWeight: 700,
            fontSize: 13,
            color: "#1e293b",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Land Parcels List
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Parcel ID",
                  "Survey Number",
                  "Parcel Name",
                  "Owner Name",
                  "District",
                  "Area (Acres)",
                  "Title Search Status",
                  "Encumbrance Status",
                  "Legal Clearance Stage",
                  "Last Updated",
                  "Actions",
                ].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parcels.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ ...tdStyle, color: "#2563eb", fontWeight: 600 }}>{p.id}</td>
                  <td style={tdStyle}>{p.survey}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.owner}</td>
                  <td style={tdStyle}>{p.district}</td>
                  <td style={tdStyle}>{p.area}</td>
                  <td style={tdStyle}>
                    <Badge label={p.title} />
                  </td>
                  <td style={tdStyle}>
                    <Badge label={p.enc} />
                  </td>
                  <td style={tdStyle}>
                    <Badge label={p.legal} />
                  </td>
                  <td style={tdStyle}>{p.updated}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["👁", "✏", "⇄", "🗑"].map((ic, j) => (
                        <button
                          key={j}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 14,
                            color: "#64748b",
                            padding: 2,
                          }}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing 1 to 5 of 1,248 entries
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginRight: 12 }}>
              <strong>Action Buttons Legend:</strong> 👁 View &nbsp; ✏ Edit &nbsp; ⇄ Update Status /
              Move Stage &nbsp; 🗑 Delete
            </div>
            {["Previous", "1", "2", "3", "…", "250", "Next"].map((l, i) => (
              <button
                key={i}
                style={{
                  padding: "4px 10px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 4,
                  fontSize: 12,
                  cursor: "pointer",
                  background: l === "1" ? "#2563eb" : "#fff",
                  color: l === "1" ? "#fff" : "#374151",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}