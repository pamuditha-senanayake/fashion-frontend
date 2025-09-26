import React from 'react';
import styled, { keyframes } from 'styled-components';

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px;
`;

const AboutContainer = styled.div`
  max-width: 900px;
  width: 100%;
  border-radius: 30px;
  padding: 3px;
  background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet, red);
  background-size: 600% 600%;
  animation: ${rainbow} 10s linear infinite;
`;

const InnerContainer = styled.div`
  background: #fff;
  border-radius: 30px;
  padding: 40px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 0 40px rgba(0,150,255,0.1);
  transition: box-shadow 0.3s ease;
  &:hover { box-shadow: 0 0 40px rgba(0,150,255,0.25); }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 20px 0 10px;
  color: #111;
`;

const Paragraph = styled.p`
  margin-bottom: 18px;
  line-height: 1.6;
  font-weight: 300;
`;

const List = styled.ul`
  list-style: disc;
  margin: 0 0 20px 20px;
  line-height: 1.6;
`;

function AboutUs() {
  return (
    <PageWrapper>
      <AboutContainer>
        <InnerContainer>
          <SectionTitle>Our Business Idea</SectionTitle>
          <Paragraph>
            We empower fashion brands, designers, and platforms to reduce guesswork and
            minimize unsold inventory by delivering accurate trend predictions. This not only
            improves profitability but also promotes sustainability by reducing fashion waste.
          </Paragraph>

          <SectionTitle>Target Users</SectionTitle>
          <strong>Fashion Designers</strong> – create collections inspired by upcoming trends.<br/>
          <strong>Clothing Retailers & Brands</strong> – stock the right items at the right time.<br/>
          <strong>E-commerce Platforms</strong> – personalize recommendations and boost sales.<br/>
          <strong>Influencers & Stylists</strong> – stay relevant and set trends for their audiences.<br/>

          <SectionTitle>Pricing Model</SectionTitle>
          <strong>One-Time License</strong> – lifetime access for businesses.<br/>
          <strong>Advertisement Integration</strong> – strategic fashion-related ads.<br/>
          <strong>E-commerce Partnerships</strong> – trend-driven recommendations with commission revenue.<br/><br/>

          <Paragraph>
            With a clear business focus, scalable revenue models, and high-value target users,
            <strong> Fashion Trend Predictor</strong> positions itself as a feasible and innovative
            solution for the global fashion industry.
          </Paragraph>
        </InnerContainer>
      </AboutContainer>
    </PageWrapper>
  );
}

export default AboutUs;
