// TrendPopularityOverTime.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const ChartContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffffcc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const TrendPopularityOverTime = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/trend_popularity_over_time");
        const rows = res.data;

        // Transform for line chart: { timestamp: ..., 'trend name': score, ... }
        const trendMap = {};
        const trendNames = new Set();

        rows.forEach((row) => {
          trendNames.add(row.trend_name);
          if (!trendMap[row.timestamp]) trendMap[row.timestamp] = { timestamp: row.timestamp };
          trendMap[row.timestamp][row.trend_name] = row.trend_score;
        });

        const chartData = Object.values(trendMap).sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setData(chartData);
      } catch (err) {
        console.error("Error fetching trend popularity:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, []);

  if (loading) return <p>Loading trend popularity data...</p>;
  if (!data.length) return <p>No trend data available.</p>;

  const trendKeys = Object.keys(data[0]).filter((k) => k !== "timestamp");

  return (
    <ChartContainer>
      {/*<h2 style={{ textAlign: "center", color: "#5a3e2b" }}>*/}
      {/*  Trend Popularity Over Time*/}
      {/*</h2>*/}
      {/*<ResponsiveContainer width="100%" height={400}>*/}
      {/*  <LineChart data={data} margin={{ top: 20, bottom: 20, left: 0, right: 20 }}>*/}
      {/*    <CartesianGrid strokeDasharray="3 3" />*/}
      {/*    <XAxis*/}
      {/*      dataKey="timestamp"*/}
      {/*      tickFormatter={(t) => new Date(t).toLocaleDateString()}*/}
      {/*    />*/}
      {/*    <YAxis domain={[0, 1]} />*/}
      {/*    <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />*/}
      {/*    <Legend />*/}
      {/*    {trendKeys.map((trend) => (*/}
      {/*      <Line*/}
      {/*        key={trend}*/}
      {/*        type="monotone"*/}
      {/*        dataKey={trend}*/}
      {/*        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}*/}
      {/*        strokeWidth={2}*/}
      {/*        dot={false}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </LineChart>*/}
      {/*</ResponsiveContainer>*/}
    </ChartContainer>
  );
};

export default TrendPopularityOverTime;
