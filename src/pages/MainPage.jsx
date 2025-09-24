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
  font-size: 4rem;
  margin-bottom: 0px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif; /* title font */
`;

const Subtitle = styled.p`
  font-family: sans-serif; /* body font */
  font-size: 1.0em;
  color: #ccc;
  max-width: 800px;
  text-align: center; /* center-align all subtitles */
  margin: 0 auto 7px auto; /* auto margin to center horizontally */

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;
const GradientTitle = styled(Title)`
  background: linear-gradient(90deg, #5a3e2b, #7d7d7d); /* bluish dark bronze → dark silver */
  font-size: 6rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;


/* ---------- Styled Components ---------- */
const Navbar = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 25px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2); /* semi-transparent */
  backdrop-filter: blur(10px); /* frosted glass effect */
  border-radius: 16px;
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
`;

const NavLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #333;
  text-decoration: none; /* remove underline */
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #5a3e2b; /* bronze-ish hover */
    text-decoration: none; /* remove underline on hover */
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
    width: 100%; /* animated bottom border on hover */
  }
`;




/* ---------- MainPage Component ---------- */
function MainPage({ onSearch }) {
  return (
    <div id="main-page">
  {/* Floating Navigation Bar */}
  <Navbar>
    <NavLink href="#home">Home</NavLink>
    <NavLink href="#features">Features</NavLink>
    <NavLink href="#about">About</NavLink>
    <NavLink href="#contact">Contact</NavLink>
  </Navbar>

      {/* First Section with Animated Background */}
      <Section id="home" bg="#fff8f0">
        <AnimatedBackground /> {/* confined to this section */}
        <SectionContent>
        <GradientTitle>Fashion Predictor</GradientTitle>
          <Subtitle>
            <center>
             Type your query and discover emerging fashion trends
             </center>
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
