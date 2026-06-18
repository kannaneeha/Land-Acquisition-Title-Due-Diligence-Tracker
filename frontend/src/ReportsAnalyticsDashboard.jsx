import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const CardTitle = ({ children }) => (
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
    {children}
  </div>
);

const pieData = [
  { name: "In Progress", value: 482, color: "#2563eb" },
  { name: "Under Legal Review", value: 276, color: "#8b5cf6" },
  { name: "Cleared", value: 342, color: "#94a3b8" },
  { name: "Rejected / On Hold", value: 148, color: "#ef4444" },
];

const districtData = [
  { name: "Hyderabad", parcels: 320 },
  { name: "Ranga Reddy", parcels: 280 },
  { name: "Medchal", parcels: 210 },
  { name: "Vikarabad", parcels: 180 },
  { name: "Nizamabad", parcels: 140 },
  { name: "Warangal", parcels: 118 },
];

const stageCompletion = [
  { stage: "Parcel Registration", pct: 85 },
  { stage: "Title Search", pct: 68 },
  { stage: "Encumbrance Verification", pct: 55 },
  { stage: "Legal Review", pct: 40 },
  { stage: "Legal Clearance", pct: 30 },
  { stage: "Acquisition Complete", pct: 60 },
];

const monthlyTrend = [
  { month: "Apr-24", created: 120, cleared: 90 },
  { month: "May-24", created: 180, cleared: 130 },
  { month: "Jun-24", created: 220, cleared: 175 },
  { month: "Jul-24", created: 270, cleared: 200 },
  { month: "Aug-24", created: 310, cleared: 250 },
  { month: "Sep-24", created: 280, cleared: 230 },
];

const avgTimeData = [
  { stage: "Parcel\nReg.", days: 3 },
  { stage: "Title\nSearch", days: 12 },
  { stage: "Encumb.\nVerif.", days: 8 },
  { stage: "Legal\nReview", days: 18 },
  { stage: "Legal\nClear.", days: 22 },
  { stage: "Acquis.\nComplete", days: 5 },
];

const topPending = [
  { survey: "SY200/2024", stage: "Legal Review", days: 45 },
  { survey: "SY201/2024", stage: "Encumbrance Verif.", days: 38 },
  { survey: "SY202/2024", stage: "Title Search", days: 35 },
  { survey: "SY203/2024", stage: "Legal Clearance", days: 30 },
  { survey: "SY204/2024", stage: "Legal Review", days: 28 },
];

export default function ReportsDashboard() {
  const [fromDate, setFromDate] = useState("01-04-2024");
  const [toDate, setToDate] = useState("20-05-2024");

  const thStyle = {
    padding: "7px 10px",
    textAlign: "left",
    fontSize: 10,
    fontWeight: 700,
    color: "#475569",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  };
  const tdStyle = {
    padding: "7px 10px",
    fontSize: 11,
    color: "#374151",
    borderBottom: "1px solid #f1f5f9",
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
            fontWeight: 700,
            fontSize: 11,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Report Filters
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto 1fr auto auto auto",
            gap: 12,
            alignItems: "end",
          }}
        >
          {[
            ["From Date", fromDate, setFromDate],
            ["To Date", toDate, setToDate],
          ].map(([l, v, set]) => (
            <div key={l}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 4,
                }}
              >
                {l}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  value={v}
                  onChange={(e) => set(e.target.value)}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: 5,
                    padding: "7px 30px 7px 10px",
                    fontSize: 12,
                    color: "#374151",
                    outline: "none",
                    width: 130,
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  📅
                </span>
              </div>
            </div>
          ))}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 4,
              }}
            >
              District
            </div>
            <select
              style={{
                border: "1px solid #d1d5db",
                borderRadius: 5,
                padding: "7px 10px",
                fontSize: 12,
                color: "#374151",
                outline: "none",
                width: 160,
              }}
            >
              <option>All Districts</option>
              <option>Hyderabad</option>
              <option>Ranga Reddy</option>
              <option>Medchal</option>
            </select>
          </div>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 4,
              }}
            >
              Report Type
            </div>
            <select
              style={{
                border: "1px solid #d1d5db",
                borderRadius: 5,
                padding: "7px 10px",
                fontSize: 12,
                color: "#374151",
                outline: "none",
                width: 180,
              }}
            >
              <option>Select Report Type</option>
              <option>Status Summary</option>
              <option>District Wise</option>
              <option>Stage Completion</option>
            </select>
          </div>
          <button
            style={{
              padding: "8px 18px",
              background: "#1e293b",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              height: 34,
              alignSelf: "end",
            }}
          >
            Generate Report
          </button>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "#f8fafc",
              border: "1px solid #d1d5db",
              borderRadius: 5,
              fontSize: 12,
              color: "#374151",
              cursor: "pointer",
              height: 34,
              alignSelf: "end",
            }}
          >
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Row 1: Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* Parcels by Status */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <CardTitle>Parcels by Status</CardTitle>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <PieChart width={140} height={140}>
              <Pie
                data={pieData}
                cx={65}
                cy={65}
                innerRadius={38}
                outerRadius={62}
                dataKey="value"
                strokeWidth={2}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ flex: 1 }}>
              {pieData.map((d) => (
                <div
                  key={d.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: d.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 11, color: "#374151" }}>
                    {d.name} ({d.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parcels by District */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <CardTitle>Parcels by District</CardTitle>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              data={districtData}
              margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="parcels"
                fill="#2563eb"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage Wise Completion */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <CardTitle>Stage Wise Completion %</CardTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stageCompletion.map(({ stage, pct }) => (
              <div key={stage}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "#374151",
                    marginBottom: 3,
                  }}
                >
                  <span>{stage}</span>
                  <span style={{ fontWeight: 700 }}>{pct}%</span>
                </div>
                <div
                  style={{
                    height: 7,
                    background: "#e2e8f0",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: "#2563eb",
                      borderRadius: 4,
                      transition: "width 0.4s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
        }}
      >
        {/* Monthly Trend */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <CardTitle>Monthly Trend (Parcels Created vs Cleared)</CardTitle>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart
              data={monthlyTrend}
              margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Created"
              />
              <Line
                type="monotone"
                dataKey="cleared"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Cleared"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Average Time by Stage */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <CardTitle>Average Time Taken (Days) by Stage</CardTitle>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={avgTimeData}
              margin={{ top: 0, right: 0, bottom: 10, left: -20 }}
            >
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 8, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="days"
                fill="#1e293b"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pending */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <CardTitle>Top Pending Parcels</CardTitle>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {["Survey Number", "Current Stage", "Days Pending"].map((h) => (
                  <th key={h} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topPending.map((row, i) => (
                <tr key={i}>
                  <td
                    style={{
                      ...tdStyle,
                      color: "#2563eb",
                      fontWeight: 600,
                    }}
                  >
                    {row.survey}
                  </td>
                  <td style={tdStyle}>{row.stage}</td>
                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: 700,
                      color:
                        row.days >= 40
                          ? "#dc2626"
                          : row.days >= 30
                          ? "#d97706"
                          : "#374151",
                    }}
                  >
                    {row.days}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <button
              style={{
                width: "100%",
                padding: "7px 0",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 5,
                fontSize: 11,
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}