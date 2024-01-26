import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font: inherit;
  }

  body {
    font-family: ${({ theme }) => theme.typography.ffPrimary};
    font-size: ${({ theme }) => theme.typography.fs5};
    background-color: ${({ theme }) => theme.colors.white};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-weight: 400;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    background-color: none;
  }

  button:hover {
    cursor: pointer;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

`;

export default GlobalStyles;
