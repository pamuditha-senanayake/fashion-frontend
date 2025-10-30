import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// ===== Styled Components =====
const GalleryWrapper = styled.div`
  padding: 60px 20px;
  background: #fff0f5;
  text-align: center;
`;

const GalleryGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  overflow-x: auto;
  padding-bottom: 10px;

  /* Hide scrollbar (optional, can remove if you want it visible) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
`;


const ImageCard = styled.div`
  flex: 0 0 auto;
  width: 160px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;


// ===== Gallery Title =====
const GalleryTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 3.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// ===== Reusable Modern Button Styling =====
const modernButtonStyle = {
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
  marginBottom: "20px",
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

// ===== Gallery Component =====
export default function Gallery() {
  const [images, setImages] = useState([]);
  const BACKEND_URL = "http://localhost:8000";

  const fetchImages = async (refresh = false) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/fetch_gallery?limit=20${refresh ? "&refresh=true" : ""}`
      );
      if (Array.isArray(res.data)) setImages(res.data);
    } catch (err) {
      console.error("[Gallery] Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages(false);
  }, []);

  return (
    <GalleryWrapper id="gallery">
      <GalleryTitle>Gallery</GalleryTitle>
      <button
        style={modernButtonStyle}
        onMouseEnter={onButtonHover}
        onMouseLeave={onButtonLeave}
        onClick={() => fetchImages(true)}
      >
        Refresh from FB
      </button>
      <GalleryGrid>
        {images.map((img) => (
          <ImageCard
            key={img.id}
            onClick={() =>
              img.permalink && img.permalink !== "#" && window.open(img.permalink, "_blank")
            }
          >
            <img src={`${BACKEND_URL}${img.url}`} alt={img.message || "Fashion Image"} />
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryWrapper>
  );
}
