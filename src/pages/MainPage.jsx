import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AISearchBar from "../components/AISearchBar";
import AnimatedBackground from "../components/AnimatedBackground";
import TrendDetails from "../components/TrendDetails";
import ResponsibleAIPanel from "../components/ResponsibleAIPanel.jsx";
import Gallery from "../components/Gallery";
import AboutUs from "../components/AboutUs.jsx";

import axios from "axios";

// const BACKEND_URL = "https://fashion-backend-j02w.onrender.com";
const BACKEND_URL = "http://localhost:8000";

// Styled components (unchanged)
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px 20px 20px;
  text-align: center;
  position: relative;
  background: ${(props) => props.bg || "#f9f9f9"};
  overflow: hidden;
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: ${(props) => (props.fullWidth ? "100%" : "800px")};
  width: 100%;
  margin: 0 auto;
  padding: ${(props) => (props.fullWidth ? "0 20px" : "0")};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 0;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
`;

const Subtitle = styled.p`
  font-family: sans-serif;
  font-size: 1em;
  color: #ccc;
  max-width: 800px;
  margin: 0 auto 20px auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(90deg, #5a3e2b, #7d7d7d);
  font-size: 6rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const DisplayBox = styled.div`
  margin: 20px auto 0;
  padding: 20px;
  max-width: 800px;
  background: #ffffffcc;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: sans-serif;
  color: #333;
  text-align: left;
  white-space: pre-wrap;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 25px;
  padding: 12px 24px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
`;

const NavLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #5a3e2b;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: #5a3e2b;
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover:after {
    width: 100%;
  }
`;

const TrendsWrapper = styled.div`
  width: 100%;
  padding: 60px 20px;
  background: #fff8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrendsHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const TrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const TrendCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  background: white;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FeatureContent = styled(SectionContent)`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const FashionFeed = ({ posts }) => {
  if (!posts.length) return <p>No trends available</p>;

  return (
    <TrendsGrid>
      {posts.map((post) => (
        <TrendCard key={post.id}>
          <div>
            <h3 style={{ marginBottom: "4px" }}>{post.trend_name || "No Trend Name"}</h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>{post.content || ""}</p>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              {(post.hashtags || []).map((tag) => `#${tag} `)}
            </div>
          </div>
          <div style={{ textAlign: "right", fontWeight: "600", color: "#5a3e2b" }}>
            Trend Score: {Number(post.predicted_trend_score || 0).toFixed(2)}
          </div>
        </TrendCard>
      ))}
    </TrendsGrid>
  );
};

// ===== Button Styling =====
const modernButtonStyle = {
  marginBottom: "20px",
  padding: "12px 28px",
  borderRadius: "12px",
  cursor: "pointer",
  border: "2px solid #111",
  background: "#fff",
  color: "#111",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const onButtonHover = (e) => {
  e.currentTarget.style.background = "#111";
  e.currentTarget.style.color = "#fff";
  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
};

const onButtonLeave = (e) => {
  e.currentTarget.style.background = "#fff";
  e.currentTarget.style.color = "#111";
  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
};

// ===== MainPage Component =====
function MainPage() {
  const [aiResponse, setAiResponse] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiAudit, setAiAudit] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resTrends = await axios.get(`${BACKEND_URL}/predict_trends_full?limit=20`);
        if (Array.isArray(resTrends.data)) setPosts(resTrends.data);
      } catch (err) {
        console.error("Error fetching trends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const fetchAiAudit = async () => {
    if (!posts || posts.length === 0) {
      alert("No trend data to audit yet.");
      return;
    }

    try {
      setAuditLoading(true);
      const resAudit = await axios.post(`${BACKEND_URL}/audit_trends`, { trends: posts });
      if (Array.isArray(resAudit.data)) setAiAudit(resAudit.data);
    } catch (err) {
      console.error("Error running AI audit:", err);
    } finally {
      setAuditLoading(false);
    }
  };

  const handleSearch = (query) => {
    setAiResponse("");
    try {
      const evtSource = new EventSource(
        `${BACKEND_URL}/search?query=${encodeURIComponent(query)}`
      );

      evtSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.delta) setAiResponse((prev) => prev + data.delta);
          else if (data.status === "Done") evtSource.close();
          else if (data.status) setAiResponse(data.status);
        } catch (err) {
          console.error(err);
        }
      };

      evtSource.onerror = () => {
        setAiResponse("Error connecting to backend.");
        evtSource.close();
      };
    } catch (err) {
      console.error("SSE error:", err);
      setAiResponse("Error starting search.");
    }
  };

  return (
    <div id="main-page">
      <Navbar>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#fashion">Fashion Items</NavLink>
        <NavLink href="#features">Insights</NavLink>
        <NavLink href="#audit">Audit</NavLink>
        <NavLink href="#gallery">Gallery</NavLink>
      </Navbar>

      <Section id="home" bg="#fff8f0">
        <AnimatedBackground />
        <SectionContent>
          <GradientTitle>Fashion Predictor</GradientTitle>
          <Subtitle>Type your query and discover emerging fashion trends</Subtitle>
          <AISearchBar onSearch={handleSearch} />
          {aiResponse && <DisplayBox>{aiResponse}</DisplayBox>}
        </SectionContent>
      </Section>

      <TrendsWrapper id="fashion">
        <TrendsHeader>
          <Title>Latest Fashion Trends</Title>
          <Subtitle>
            Explore emerging trends from social media with predicted trend scores.
          </Subtitle>
        </TrendsHeader>

        {loading ? (
          <p>Loading fashion posts...</p>
        ) : posts.length ? (
          <FashionFeed posts={posts} />
        ) : (
          <p>No trends available</p>
        )}
      </TrendsWrapper>

      <Section id="features" bg="#f0f4ff">
        <SectionContent fullWidth>
          <Title>Trend Insights</Title>
          <Subtitle>
            Explore detailed analytics of emerging fashion trends, including scores, forecasts, and directions.
          </Subtitle>
          <TrendDetails trends={posts} />
        </SectionContent>
      </Section>

      <Section id="audit" bg="#f7fff0">
        <SectionContent>
          <Title>Audit</Title>
          <Subtitle>
            Click below to run Responsible AI auditing on the current trend data.
          </Subtitle>

          {/* Modern button applied */}
          <button
            onClick={fetchAiAudit}
            disabled={auditLoading}
            style={modernButtonStyle}
            onMouseEnter={onButtonHover}
            onMouseLeave={onButtonLeave}
          >
            {auditLoading ? "Running Audit..." : "Run Responsible AI Audit"}
          </button>

          {aiAudit.length > 0 ? (
            <ResponsibleAIPanel trends={aiAudit} />
          ) : (
            <p>No AI audit report available</p>
          )}
        </SectionContent>
      </Section>
         <Section id="about" bg="#f0f4ff">
        <SectionContent fullWidth>
          <Title>About Us</Title>
          <Subtitle>
            <strong>Fashion Trend Predictor</strong> is an AI-driven web application that helps
            businesses in the fashion industry stay ahead of rapidly changing style trends.
            By analyzing social media, e-commerce platforms, and influencer activity, our
            system provides reliable forecasts that support data-driven design, marketing,
            and stocking decisions.
          </Subtitle>
          <AboutUs />
        </SectionContent>
      </Section>

      <Gallery />


    </div>
  );
}

export default MainPage;
