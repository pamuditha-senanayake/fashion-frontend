// frontend/src/components/ResponsibleAIAudit.jsx
import React from "react";

const ResponsibleAIAudit = ({ trends }) => {
  if (!trends || trends.length === 0) return null;

  const containerStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "0 20px",
    color: "#111",
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.6,
    textAlign: "left",
  };

  const headingStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "20px",
  };

  const pointStyle = {
    fontSize: "1rem",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Responsible AI Audit</h2>
      {trends.map((item, idx) => {
        const points = item.ai_audit_notes?.split(";").map((p) => p.trim()) || [];
        return points.map((point, i) => (
          <p key={`${idx}-${i}`} style={pointStyle}>
            {point}
          </p>
        ));
      })}
    </div>
  );
};

export default ResponsibleAIAudit;
