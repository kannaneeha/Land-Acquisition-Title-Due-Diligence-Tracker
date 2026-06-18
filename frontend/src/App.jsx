import React, { useState } from "react";

import EntryForm from "./LandAcquisitionTitleDueDiligenceEntryForm";
import Dashboard from "./LandAcquisitionTitleDueDiligenceDashboard";
import ReportsDashboard from "./ReportsAnalyticsDashboard";
import StatusTracker from "./StatusWorkflowTracker";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "entry":
        return <EntryForm />;
      case "workflow":
        return <StatusTracker />;
      case "reports":
        return <ReportsDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* Simple left sidebar for navigation */}
      <aside
        style={{
          width: 200,
          minHeight: "100vh",
          background: "#1a2332",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #2d3a4a",
          }}
        >
          <div
            style={{
              background: "#2563eb",
              color: "#fff",
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 4,
              fontSize: 14,
              display: "inline-block",
            }}
          >
            LOGO
          </div>
        </div>
        <nav style={{ flex: 1, paddingTop: 10 }}>
          {[
            { key: "dashboard", label: "Dashboard" },
            { key: "entry", label: "Land Parcels (Entry Form)" },
            { key: "workflow", label: "Workflow Tracker" },
            { key: "reports", label: "Reports & Analytics" },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setActivePage(item.key)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: 13,
                color: activePage === item.key ? "#fff" : "#94a3b8",
                background:
                  activePage === item.key ? "#2563eb" : "transparent",
                borderLeft:
                  activePage === item.key
                    ? "3px solid #60a5fa"
                    : "3px solid transparent",
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Simple header */}
        <div
          style={{
            height: 54,
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, color: "#64748b" }}>☰</span>
            <span
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: "#1e293b",
              }}
            >
              Land Acquisition & Title Due Diligence Tracker
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>🔔</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#f1f5f9",
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 13,
                color: "#334155",
              }}
            >
              <span>👤</span>
              <span>Project User</span>
              <span>▾</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;