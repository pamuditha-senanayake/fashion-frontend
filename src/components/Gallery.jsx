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


export default function Gallery() {
  const [images, setImages] = useState([]);
  const BACKEND_URL = "http://localhost:8000"; // Change to deployed URL

  useEffect(() => {
    const fetchImages = async () => {
      console.log("[Gallery] Starting fetch from:", `${BACKEND_URL}/fetch_gallery?limit=20`);
      try {
        const res = await axios.get(`${BACKEND_URL}/fetch_gallery?limit=20`);
        console.log("[Gallery] Response status:", res.status);
        console.log("[Gallery] Raw response data:", res.data);

        if (Array.isArray(res.data)) {
          setImages(res.data);
          console.log("[Gallery] Images set successfully. Count:", res.data.length);
        } else {
          console.warn("[Gallery] Unexpected response format:", res.data);
        }
      } catch (err) {
        console.error("[Gallery] Error fetching gallery images:", err);
        if (err.response) {
          console.error("[Gallery] Error details:", err.response.status, err.response.data);
        }
      }
    };
    fetchImages();
  }, []);

  return (
    <GalleryWrapper id="gallery">
      <h1>Gallery</h1>
      <p>Latest images from our Fashion Page</p>
      <GalleryGrid>
        {images.map((img) => (
          <ImageCard key={img.id} onClick={() => window.open(img.permalink, "_blank")}>
            <img src={img.url} alt={img.message || "Fashion Image"} />
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryWrapper>
  );
}
