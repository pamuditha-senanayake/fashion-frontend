// src/pages/MainPage.jsx
import React from "react";
import styled from "styled-components";
import AISearchBar from "../components/AISearchBar";
import AnimatedBackground from "../components/AnimatedBackground"; // optional

/* ---------- Styled Components ---------- */
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
  overflow: hidden; /* ensures blobs stay within this section */
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 10; /* above the animated background */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 200;
  font-family: 'Montserrat', sans-serif; /* title font */
`;

const Subtitle = styled.p`
  font-family: sans-serif; /* body font */
  font-size: 1.0em;
  color: #ccc;
  max-width: 800px;
  text-align: left; /* default left alignment */
  margin-left: 5px;
  margin-bottom: 7px;

  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
  }
`;

/* ---------- MainPage Component ---------- */
function MainPage({ onSearch }) {
  return (
    <div id="main-page">
      {/* First Section with Animated Background */}
      <Section id="home" bg="#fff8f0">
        <AnimatedBackground /> {/* confined to this section */}
        <SectionContent>
          <Title>Fashion Predictor</Title>
          <Subtitle>
            Uncover the future of style. Type your query and discover emerging fashion trends
          </Subtitle>
          <AISearchBar onSearch={onSearch} />
        </SectionContent>
      </Section>

      {/* Other Sections */}
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
