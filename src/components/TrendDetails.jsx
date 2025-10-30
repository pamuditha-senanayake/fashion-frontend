import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TrendPopularityOverTime from "./TrendPopularityOverTime";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
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

const TrendDetails = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.get("http://localhost:8000/predict_trends_full?limit=20");
        if (Array.isArray(res.data)) {
          // Sort by predicted_trend_score descending
          const sorted = res.data.sort(
            (a, b) => (b.predicted_trend_score || 0) - (a.predicted_trend_score || 0)
          );
          setTrends(sorted);
        }
        console.log("Fetched trends:", res.data);
      } catch (err) {
        console.error("Error fetching trends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) return <p>Loading trend data...</p>;
  if (!trends.length) return <p>No trend data available</p>;

const chartData = [...trends]
  .sort((a, b) => a.trend_name.localeCompare(b.trend_name))
  .map((t) => ({
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
          {trends.map((t) => (
            <tr key={t.trend_name}>
              <td>{t.trend_name}</td>
              <td>{t.predicted_trend_score.toFixed(3)}</td>
              <td>{t.forecasted_trend_score.toFixed(3)}</td>
              <td>{t.trendDirection}</td>
            </tr>
          ))}
        </tbody>
      </TrendTable>

      {/* Line Chart: Actual vs Forecast */}
   <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData} margin={{ top: 10, bottom: 10 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis domain={[0, 1]} />
    <Tooltip />
    <Line type="monotone" dataKey="actual" stroke="#5a3e2b" strokeWidth={2} name="Predicted Score" />
    <Line type="monotone" dataKey="forecast" stroke="#7d7d7d" strokeWidth={2} name="Forecasted Score" strokeDasharray="5 5" />
  </LineChart>
</ResponsiveContainer>

      {/* Bar Chart: Compare Predicted vs Forecasted */}
      <TrendHeader>
        <TrendTitle>Predicted vs Forecast Comparison</TrendTitle>
      </TrendHeader>
      <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData} margin={{ top: 10, bottom: 10 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis domain={[0, 1]} />
    <Tooltip />
    <Legend />
    <Bar dataKey="actual" fill="#5a3e2b" name="Predicted Score" />
    <Bar dataKey="forecast" fill="#7d7d7d" name="Forecasted Score" />
  </BarChart>
</ResponsiveContainer>
         <TrendPopularityOverTime />
    </Container>
  );
};

export default TrendDetails;
