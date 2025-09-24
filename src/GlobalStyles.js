import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

  :root {
    --primary-bg: #0D1117; /* Dark background */
    --glow-color: #00FFFF; /* Cyan for AI glow */
    --border-color: #36454F; /* Charcoal for borders */
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--primary-bg);
    color: var(--text-color);
    line-height: 1.6;
   
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: var(--accent-blue);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', sans-serif;
    margin-bottom: 0.5em;
  }
    /* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

`;

export default GlobalStyles;