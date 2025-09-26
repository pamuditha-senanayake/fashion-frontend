import React from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffffcc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const TrendHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const TrendTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #5a3e2b;
`;

const TrendTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-family: sans-serif;
    font-size: 0.9rem;
  }

  th {
    background-color: #f0f0f0;
    font-weight: 600;
  }

  td {
    color: #333;
  }
`;

const TrendDetails = ({ trends }) => {
  if (!trends || !trends.length) return <p>No trend data available</p>;

  // Prepare data for charts: one chart per trend
  const chartData = trends.map((t) => ({
    name: t.trend_name,
    actual: Number(t.predicted_trend_score.toFixed(3)),
    forecast: Number(t.forecasted_trend_score.toFixed(3)),
  }));

  return (
    <Container>
      <TrendHeader>
        <TrendTitle>Trend Details & Forecasts</TrendTitle>
      </TrendHeader>

      <TrendTable>
        <thead>
          <tr>
            <th>Trend Name</th>
            <th>Predicted Score</th>
            <th>Forecasted Score</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {trends.map((t, idx) => (
            <tr key={idx}>
              <td>{t.trend_name}</td>
              <td>{t.predicted_trend_score.toFixed(3)}</td>
              <td>{t.forecasted_trend_score.toFixed(3)}</td>
              <td>{t.trendDirection}</td>


            </tr>
          ))}
        </tbody>
      </TrendTable>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#5a3e2b"
            strokeWidth={2}
            name="Predicted Score"
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#7d7d7d"
            strokeWidth={2}
            name="Forecasted Score"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default TrendDetails;
