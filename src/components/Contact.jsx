import React from "react";
import styled from "styled-components";

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
`;

const ContactList = styled.ul`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;

  li {
    margin-bottom: 12px;
  }

  a {
    color: #5a3e2b;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;

    &:hover {
      text-decoration: underline;
      color: #422b1d;
    }
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

function Contact() {
  return (
    <PageWrapper>
      <Title>Contact Us</Title>

      {/* Contact Info */}
      <Card>
        <ContactList>
            <strong>Address:</strong>{" "}
            <a
              href="https://maps.google.com/?q=SLIIT+Kandy+Uni+Campus"
              target="_blank"
              rel="noopener noreferrer"
            >
              123 Fashion Street, Kandy, Sri Lanka
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a href="tel:+94771234567">+94 77 123 4567</a>
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:anjaleekulathunga56@gmail.com">
              anjaleekulathunga56@gmail.com
            </a>
            <br />
            <strong>Website:</strong>{" "}
            <a
              href="https://www.fashiontrend.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.fashiontrend.com
            </a>
            
        </ContactList>
      </Card>

      {/* Google Map */}
      <MapWrapper>
        <iframe
          title="Fashion Trend Branch - SLIIT Kandy Campus"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2041334221077!2d80.62800887499635!3d7.306975713759368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368810c6898c5%3A0x312a1d73ab1099a4!2sSLIIT%20Kandy%20Uni%20Campus!5e0!3m2!1sen!2slk!4v1695827000000!5m2!1sen!2slk"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </MapWrapper>
    </PageWrapper>
  );
}

export default Contact;
