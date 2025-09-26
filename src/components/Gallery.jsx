import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const GalleryWrapper = styled.div`
  padding: 60px 20px;
  background: #fff0f5;
  text-align: center;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  justify-items: center; /* keeps cards centered */
  margin-top: 20px;
`;

const ImageCard = styled.div`
  width: 160px;       /* fixed width */
  height: 200px;      /* fixed height */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  margin: 0 auto;     /* center cards in grid cell */

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* keeps aspect ratio, fills card */
    display: block;
  }
`;

const RefreshButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  background-color: #ff69b4;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease;

  &:hover {
    background-color: #ff85c1;
  }
`;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const BACKEND_URL = "http://localhost:8000";

  const fetchImages = async (refresh = false) => {
    console.log("[Gallery] Fetching images, refresh:", refresh);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/fetch_gallery?limit=20${refresh ? "&refresh=true" : ""}`
      );

      if (Array.isArray(res.data)) {
        setImages(res.data);
        console.log("[Gallery] Images set. Count:", res.data.length);
      }
    } catch (err) {
      console.error("[Gallery] Error fetching gallery images:", err);
    }
  };

  useEffect(() => {
    fetchImages(false); // Load local images first
  }, []);

  return (
    <GalleryWrapper id="gallery">
      <h1>Gallery</h1>
      <RefreshButton onClick={() => fetchImages(true)}>Refresh from FB</RefreshButton>
      <GalleryGrid>
        {images.map((img) => (
          <ImageCard key={img.id} onClick={() => img.permalink !== "#" && window.open(img.permalink, "_blank")}>
            <img src={`${BACKEND_URL}${img.url}`} alt={img.message || "Fashion Image"} />
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryWrapper>
  );
}
