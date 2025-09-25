import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const TrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const TrendCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
`;

const TrendIcon = styled.span`
  margin-right: 6px;
  color: ${(props) => (props.direction === "up" ? "green" : "red")};
  font-weight: bold;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${(props) => (props.active ? "#5a3e2b" : "#eee")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  transition: all 0.3s;

  &:hover {
    background: #5a3e2b;
    color: #fff;
  }
`;

const FashionFeed = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/predict_trends?limit=20");

        const data = res.data.map((post, idx) => ({
          id: post.id || idx,
          trend_name: post.trend_name || `Trend ${idx + 1}`,
          content: post.content || "No description",
          hashtags: post.hashtags || ["fashion", "trend", "OOTD"],
          predicted_trend_score: post.predicted_trend_score?.toFixed(2) || Math.random().toFixed(2),
          trendDirection: post.trendDirection || (Math.random() > 0.5 ? "up" : "down"),
          prediction: post.prediction || "Next week",
        }));

        // Remove duplicates by trend_name
        const uniquePosts = data.filter(
          (post, index, self) =>
            index === self.findIndex((p) => p.trend_name === post.trend_name)
        );

        setPosts(uniquePosts);
      } catch (err) {
        console.error("Error fetching fashion posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts =
    filter === "all"
      ? posts
      : posts.filter((p) => p.trendDirection === filter);

  if (loading) return <p style={{ textAlign: "center" }}>Loading fashion posts...</p>;

  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <FilterWrapper>
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterButton>
        <FilterButton active={filter === "up"} onClick={() => setFilter("up")}>
          Uptrend ▲
        </FilterButton>
        <FilterButton active={filter === "down"} onClick={() => setFilter("down")}>
          Downtrend ▼
        </FilterButton>
      </FilterWrapper>

      <TrendsGrid>
        {filteredPosts.map((post) => (
          <TrendCard key={post.id}>
            <div>
              <h3 style={{ marginBottom: "4px" }}>
                <TrendIcon direction={post.trendDirection}>
                  {post.trendDirection === "up" ? "▲" : "▼"}
                </TrendIcon>
                {post.trend_name}
              </h3>
              <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>{post.content}</p>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                {post.hashtags.map((tag, i) => (
                  <span key={i}>#{tag} </span>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <span style={{ fontWeight: "600", color: "#5a3e2b" }}>
                Trend Score: {post.predicted_trend_score}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#888" }}>
                {post.prediction}
              </span>
            </div>
          </TrendCard>
        ))}
      </TrendsGrid>
    </div>
  );
};

export default FashionFeed;
