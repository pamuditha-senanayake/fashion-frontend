import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 60px auto;
  border-radius: 50px;
  padding: 3px;
  background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet, red);
  background-size: 600% 600%;
  animation: ${rainbow} 8s linear infinite;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 50px;
  overflow: hidden;
  background-color: white;
  transition: box-shadow 0.3s ease;
  &:focus-within { box-shadow: 0 0 40px 15px rgba(0,150,255,0.25); }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 28px 25px;
  border: none;
  font-size: 0.95em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 200;
  outline: none;
  color: #333;
  caret-color: #FFD700;
  &::placeholder { color: #aaa; }
`;

const SearchButton = styled.button`
  width: 60px;
  height: 60px;
  margin: 5px;
  border-radius: 50%;
  border: none;
  background-color: #FFD700;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background-color 0.3s ease;
  &:hover { background-color: #FFEA70; transform: scale(1.1); }
  &:active { transform: scale(1); }
  svg { width: 24px; height: 24px; }
`;

const AISearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => { if(searchTerm.trim()) onSearch(searchTerm); }
  const handleKeyPress = (e) => { if(e.key === 'Enter') handleSearch(); }
  return (
    <SearchContainer>
      <InnerContainer>
        <SearchInput value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} placeholder="Predict the next fashion trend"/>
        <SearchButton onClick={handleSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>
            <path d="M12 22v-4"/>
            <path d="m9 12-3 3-3-3"/>
            <path d="m15 12 3 3 3-3"/>
            <path d="M12 2v10l-4 4h8l-4-4V2"/>
          </svg>
        </SearchButton>
      </InnerContainer>
    </SearchContainer>
  );
};

export default AISearchBar;
