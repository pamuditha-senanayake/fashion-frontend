import React from "react";
import styled from "styled-components";
import { FaLinkedin } from "react-icons/fa";

import ImashiPhoto from "../assets/team/imashi.png";
import PamudithaPhoto from "../assets/team/pamuditha.png";
import AnjaliPhoto from "../assets/team/anjali.png";
import UdayangaPhoto from "../assets/team/udayanga.png";

const Container = styled.div`
  width: 100%;
  min-height: 140;
  padding: 40px 20px;
  background: #ffffffcc;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TeamGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  padding: 0 20px;
  
  @media (max-width: 1400px) {
    gap: 30px;
  }
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TeamMemberCard = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px;
  min-width: 280px;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  
  @media (max-width: 600px) {
    width: 100%;
    max-width: 350px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 25px;
`;

const MemberImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5a3e2b, #7d7d7d);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const LinkedInIcon = styled.a`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  background: #0077b5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: #005582;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MemberName = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #5a3e2b;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const MemberRole = styled.p`
  font-family: sans-serif;
  color: #7d7d7d;
  font-weight: 500;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const MemberBio = styled.p`
  font-family: sans-serif;
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
`;

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Imashi Dissanayaka",
      photo: ImashiPhoto,
      initials: "ID",
      linkedin: "https://www.linkedin.com/in/imashi-dissanayake-bb3b07339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
    },
    {
      id: 2,
      name: "Pamuditha Senanayaka",
      photo: PamudithaPhoto,
      initials: "PS",
      linkedin: "https://www.linkedin.com/in/pamuditha-senanayake-87794357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      id: 3,
      name: "Anjalee Kulathunga",
      photo: AnjaliPhoto,
      initials: "AU",
      linkedin: "https://www.linkedin.com/in/anjalee-umaya-kulathunga-b7b010365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      id: 4,
      name: "Udayanga Weerakoon",
      photo: UdayangaPhoto,
      initials: "UW",
      linkedin: "https://www.linkedin.com/in/udayanga-weerakoon-0b77a1269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    }
  ];

  return (
    <Container>      
      <TeamGrid>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id}>
            <ImageContainer>
              <MemberImage>
                {member.photo ? (
                  <img 
                    src={member.photo}
                    alt={member.name}
                  />
                ) : (
                  member.initials
                )}
              </MemberImage>
              
              {/* LinkedIn Icon */}
              <LinkedInIcon 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`Connect with ${member.name} on LinkedIn`}
              >
                <FaLinkedin />
              </LinkedInIcon>
            </ImageContainer>
            
            <MemberName>{member.name}</MemberName>
          </TeamMemberCard>
        ))}
      </TeamGrid>
    </Container>
  );
};

export default About;