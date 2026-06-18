import { useState } from "react";

const statusStyle = (s) => {
  const map = {
    Completed: { background: "#dcfce7", color: "#15803d" },
    "In Progress": { background: "#dbeafe", color: "#1d4ed8" },
    Pending: { background: "#fef9c3", color: "#a16207" },
  };
  return {
    padding: "3px 10px",
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 700,
    ...(map[s] || { background: "#f1f5f9", color: "#475569" }),
  };
};

const workflowStages = [
  { num: 1, label: "Parcel Registration", count: "320 Parcels", icon: "📄" },
  { num: 2, label: "Title Search", count: "482 Parcels", icon: "👤" },
  { num: 3, label: "Encumbrance Verification", count: "276 Parcels", icon: "🛡" },
  { num: 4, label: "Legal Review", count: "98 Parcels", icon: "⚖" },
  { num: 5, label: "Legal Clearance", count: "72 Parcels", icon: "⚖" },
  { num: 6, label: "Acquisition Complete", count: "342 Parcels", icon: "✓" },
];

const workflowDetails = [
  {
    stage: "1. Parcel Registration",
    status: "Completed",
    assignedTo: "LA Officer",
    start: "10-May-2024",
    end: "10-May-2024",
    remarks: "Parcel registered",
  },
  {
    stage: "2. Title Search",
    status: "In Progress",
    assignedTo: "Legal Officer",
    start: "11-May-2024",
    end: "-",
    remarks: "Title search in progress",
  },
  {
    stage: "3. Encumbrance Verification",
    status: "Pending",
    assignedTo: "Legal Officer",
    start: "-",
    end: "-",
    remarks: "-",
  },
  {
    stage: "4. Legal Review",
    status: "Pending",
    assignedTo: "Legal Officer",
    start: "-",
    end: "-",
    remarks: "-",
  },
  {
    stage: "5. Legal Clearance",
    status: "Pending",
    assignedTo: "Legal Officer",
    start: "-",
    end: "-",
    remarks: "-",
  },
  {
    stage: "6. Acquisition Complete",
    status: "Pending",
    assignedTo: "LA Officer",
    start: "-",
    end: "-",
    remarks: "-",
  },
];

export default function StatusTracker() {
  const [selectedStage, setSelectedStage] = useState("");
  const [remarks, setRemarks] = useState("");

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
  };

  return (
    <div>
      {/* Workflow Stages */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "#1e293b",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 20,
          }}
        >
          Workflow Stages
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
            position: "relative",
          }}
        >
          {workflowStages.map((s, i) => (
            <div
              key={s.num}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Connector line */}
              {i < workflowStages.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    left: "50%",
                    width: "100%",
                    height: 2,
                    background: i < 2 ? "#2563eb" : "#e2e8f0",
                    zIndex: 0,
                  }}
                />
              )}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: `2px solid ${i < 2 ? "#2563eb" : "#d1d5db"}`,
                  background: i < 2 ? "#2563eb" : "#fff",
                  color: i < 2 ? "#fff" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  zIndex: 1,
                  position: "relative",
                  marginBottom: 10,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1e293b",
                  textAlign: "center",
                  marginBottom: 4,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  background: "#f1f5f9",
                  padding: "2px 10px",
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                {s.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 16,
        }}
      >
        {/* Parcel Details Card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#1e293b",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 16,
            }}
          >
            Parcel Workflow Details
          </div>
          {[
            ["Parcel ID", "PRC-000124"],
            ["Survey Number", "SY122/2024"],
            ["Parcel Name", "Sunrise Plot"],
            ["Owner Name", "Suresh Rao"],
            ["District", "Ranga Reddy"],
            ["Area (Acres)", "8.75"],
          ].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#1e293b",
                  fontWeight: 500,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Table + Update */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "Stage",
                    "Status",
                    "Assigned To",
                    "Start Date",
                    "End Date",
                    "Remarks",
                  ].map((h) => (
                    <th key={h} style={thStyle}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workflowDetails.map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                  >
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{row.stage}</td>
                    <td style={tdStyle}>
                      <span style={statusStyle(row.status)}>{row.status}</span>
                    </td>
                    <td style={tdStyle}>{row.assignedTo}</td>
                    <td style={tdStyle}>{row.start}</td>
                    <td style={tdStyle}>{row.end}</td>
                    <td style={tdStyle}>{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Stage */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: 12,
                alignItems: "end",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#374151",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Update / Move Workflow Stage
                </div>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: 5,
                    padding: "8px 10px",
                    fontSize: 12,
                    color: "#374151",
                    outline: "none",
                  }}
                >
                  <option value="">Select Next Stage</option>
                  <option>3. Encumbrance Verification</option>
                  <option>4. Legal Review</option>
                  <option>5. Legal Clearance</option>
                  <option>6. Acquisition Complete</option>
                </select>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#374151",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Remarks
                </div>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter Remarks"
                  rows={2}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: 5,
                    padding: "8px 10px",
                    fontSize: 12,
                    color: "#374151",
                    resize: "none",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                style={{
                  padding: "8px 20px",
                  background: "#1e293b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  height: 36,
                }}
              >
                Update Stage
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: "#fff",
                border: "1px solid #d1d5db",
                borderRadius: 5,
                fontSize: 12,
                color: "#374151",
                cursor: "pointer",
              }}
            >
              ← Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}