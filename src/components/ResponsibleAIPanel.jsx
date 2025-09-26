// frontend/src/components/ResponsibleAIAudit.jsx
import React from "react";

const ResponsibleAIAudit = ({ trends }) => {
  if (!trends || trends.length === 0) return <p>No audit data available</p>;

  // The backend now returns a single object with ai_audit_notes as semicolon-separated points
  const auditPoints =
    trends[0]?.ai_audit_notes?.split(";").map((p) => p.trim()) || [];

  return (
    <div>
      <h2>Responsible AI Audit</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Audit Point</th>
          </tr>
        </thead>
        <tbody>
          {auditPoints.length > 0 ? (
            auditPoints.map((point, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{idx + 1}</td>
                <td style={tdStyle}>{point}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={tdStyle} colSpan={2}>
                No audit points available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "1rem",
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f0f0f0",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

export default ResponsibleAIAudit;
