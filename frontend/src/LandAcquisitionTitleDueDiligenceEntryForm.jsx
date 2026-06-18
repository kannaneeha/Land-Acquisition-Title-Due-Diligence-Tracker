import { useState } from "react";

const Field = ({ label, required, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label
      style={{
        display: "block",
        fontSize: 11,
        fontWeight: 600,
        color: "#374151",
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {label}
      {required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const Input = ({ placeholder, type = "text", readOnly, value }) => (
  <input
    type={type}
    placeholder={placeholder}
    readOnly={readOnly}
    defaultValue={value}
    style={{
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: 5,
      padding: "7px 10px",
      fontSize: 12,
      color: "#374151",
      background: readOnly ? "#f9fafb" : "#fff",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
);

const Select = ({ placeholder, options = [] }) => (
  <select
    style={{
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: 5,
      padding: "7px 10px",
      fontSize: 12,
      color: "#6b7280",
      background: "#fff",
      outline: "none",
      boxSizing: "border-box",
    }}
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o}>{o}</option>
    ))}
  </select>
);

const Textarea = ({ placeholder, rows = 3 }) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    style={{
      width: "100%",
      border: "1px solid #d1d5db",
      borderRadius: 5,
      padding: "7px 10px",
      fontSize: 12,
      color: "#374151",
      resize: "vertical",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
);

export default function EntryForm() {
  const [files, setFiles] = useState([]);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        padding: "24px",
      }}
    >
      <h2
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 22,
          paddingBottom: 12,
          borderBottom: "2px solid #2563eb",
        }}
      >
        Land Acquisition & Title Due Diligence Entry Form
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Left: Parcel Information */}
        <div>
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: 16,
              marginBottom: 0,
            }}
          >
            <h3
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              A. Parcel Information
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 12px",
              }}
            >
              <Field label="Parcel ID (Auto)">
                <Input placeholder="PRC-000125" readOnly value="PRC-000125" />
              </Field>
              <Field label="District" required>
                <Select
                  placeholder="Select District"
                  options={[
                    "Hyderabad",
                    "Rangareddy",
                    "Medchal",
                    "Vikarabad",
                    "Nizamabad",
                    "Warangal",
                  ]}
                />
              </Field>
              <Field label="Survey Number" required>
                <Input placeholder="Enter Survey Number" />
              </Field>
              <Field label="State" required>
                <Select
                  placeholder="Select State"
                  options={["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra"]}
                />
              </Field>
              <Field label="Parcel Name" required>
                <Input placeholder="Enter Parcel Name" />
              </Field>
              <Field label="Area (Acres / Sq Yards)" required>
                <Input placeholder="Enter Area" />
              </Field>
            </div>
            <Field label="Land Parcel Under Acquisition" required>
              <Input placeholder="Enter Land Parcel Description" />
            </Field>
            <Field label="Current Owner Name" required>
              <Input placeholder="Enter Owner Name" />
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 12px",
              }}
            >
              <Field label="Village" required>
                <Input placeholder="Enter Village" />
              </Field>
              <Field label="Owner Contact Number">
                <Input placeholder="Enter Contact Number" type="tel" />
              </Field>
              <Field label="Mandal / Taluk" required>
                <Input placeholder="Enter Mandal / Taluk" />
              </Field>
              <Field label="Date of Acquisition Proposal">
                <div style={{ position: "relative" }}>
                  <Input placeholder="DD-MM-YYYY" type="text" />
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                      fontSize: 14,
                    }}
                  >
                    📅
                  </span>
                </div>
              </Field>
            </div>
          </div>
        </div>

        {/* Right: Title Due Diligence */}
        <div>
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: 16,
            }}
          >
            <h3
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              B. Title Due Diligence Information
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 12px",
              }}
            >
              <Field label="Title Search Status" required>
                <Select
                  placeholder="Select Status"
                  options={["Pending", "In Progress", "Completed", "On Hold"]}
                />
              </Field>
              <Field label="Legal Clearance Stage" required>
                <Select
                  placeholder="Select Stage"
                  options={["Initiated", "Legal Review", "Approved", "Rejected"]}
                />
              </Field>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 12px",
              }}
            >
              <Field label="Title Search Remarks">
                <Textarea placeholder="Enter Title Search Remarks" rows={3} />
              </Field>
              <Field label="Legal Clearance Remarks">
                <Textarea placeholder="Enter Legal Clearance Remarks" rows={3} />
              </Field>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 12px",
              }}
            >
              <Field label="Encumbrance Status" required>
                <Select
                  placeholder="Select Status"
                  options={["Clear", "Pending", "Issue Found", "Verified"]}
                />
              </Field>
              <Field label="Supporting Documents">
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #d1d5db",
                      borderRadius: 5,
                      padding: "6px 12px",
                      fontSize: 12,
                      cursor: "pointer",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Choose File{" "}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFiles([...files, e.target.files[0]?.name].filter(Boolean))
                      }
                    />
                  </label>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>
                    {files[0] || "No file chosen"}
                  </span>
                </div>
              </Field>
            </div>
            <Field label="Encumbrance Remarks">
              <Textarea placeholder="Enter Encumbrance Remarks" rows={3} />
            </Field>
            <div
              style={{
                border: "1px dashed #cbd5e1",
                borderRadius: 6,
                padding: 16,
                marginTop: 4,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  marginBottom: 10,
                  fontWeight: 500,
                }}
              >
                Upload More Documents
              </div>
              {files.slice(1).map((f, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    color: "#374151",
                    background: "#f1f5f9",
                    padding: "4px 8px",
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                >
                  📎 {f}
                </div>
              ))}
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#fff",
                  border: "1px solid #2563eb",
                  color: "#2563eb",
                  padding: "6px 14px",
                  borderRadius: 5,
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                + Add File{" "}
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFiles([...files, e.target.files[0]?.name].filter(Boolean))
                  }
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <button
          style={{
            padding: "8px 20px",
            border: "1px solid #d1d5db",
            borderRadius: 5,
            background: "#fff",
            color: "#374151",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Reset
        </button>
        <button
          style={{
            padding: "8px 20px",
            border: "1px solid #2563eb",
            borderRadius: 5,
            background: "#fff",
            color: "#2563eb",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Save Draft
        </button>
        <button
          style={{
            padding: "8px 20px",
            border: "1px solid #d1d5db",
            borderRadius: 5,
            background: "#fff",
            color: "#374151",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Cancel
        </button>
        <button
          style={{
            padding: "8px 22px",
            border: "none",
            borderRadius: 5,
            background: "#1e293b",
            color: "#fff",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}