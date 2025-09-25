import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AISearchBar from "../components/AISearchBar";
import AnimatedBackground from "../components/AnimatedBackground";
import axios from "axios";

// Navbar & Section components
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
`;

// Titles & Subtitles
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

// -----------------
// Trends Section Grid
// -----------------
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
  height: 200px; /* fixed height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// -----------------
// FashionFeed Component
// -----------------
const FashionFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/predict_trends?limit=20");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching fashion posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading fashion posts...</p>;

  return (
    <TrendsGrid>
      {posts.map((post) => (
        <TrendCard key={post.id}>
          <div>
            <h3 style={{ marginBottom: "4px" }}>{post.trend_name || "No Trend Name"}</h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>{post.content}</p>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              {post.hashtags.map((tag) => `#${tag} `)}
            </div>
          </div>
          <div style={{ textAlign: "right", fontWeight: "600", color: "#5a3e2b" }}>
            Trend Score: {post.predicted_trend_score?.toFixed(2)}
          </div>
        </TrendCard>
      ))}
    </TrendsGrid>
  );
};

// -----------------
// Main Page
// -----------------
function MainPage() {
  const [aiResponse, setAiResponse] = useState("");

  const handleSearch = (query) => {
    setAiResponse("");

    const evtSource = new EventSource(
      `http://localhost:8000/search?query=${encodeURIComponent(query)}`
    );

    evtSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.delta) {
          setAiResponse(prev => prev + data.delta);
        } else if (data.status && data.status === "Done") {
          evtSource.close();
        } else if (data.status) {
          setAiResponse(data.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    evtSource.onerror = () => {
      setAiResponse("Error connecting to backend.");
      evtSource.close();
    };
  };

  return (
    <div id="main-page">
      <Navbar>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
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

      {/* -------------------- */}
      {/* Trends Section */}
      {/* -------------------- */}
      <TrendsWrapper>
        <TrendsHeader>
          <Title>Latest Fashion Trends</Title>
          <Subtitle>
            Explore emerging trends from social media with predicted trend scores.
          </Subtitle>
        </TrendsHeader>

        <FashionFeed />
      </TrendsWrapper>

      <Section id="features" bg="#f0f4ff">
        <SectionContent>
          <Title>Features</Title>
          <Subtitle>
            Discover trend analysis, personalized recommendations, and social media insights powered by AI.
          </Subtitle>
        </SectionContent>
      </Section>

      <Section id="about" bg="#f7fff0">
        <SectionContent>
          <Title>About Us</Title>
          <Subtitle>
            We’re building the future of fashion prediction with cutting-edge technology and creativity.
          </Subtitle>
        </SectionContent>
      </Section>

      <Section id="contact" bg="#fff0f5">
        <SectionContent>
          <Title>Contact</Title>
          <Subtitle>
            Reach out for collaborations, inquiries, or just to say hi!
          </Subtitle>
        </SectionContent>
      </Section>
    </div>
  );
}

export default MainPage;
