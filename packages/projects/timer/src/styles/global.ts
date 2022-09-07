import { createGlobalStyle } from 'styled-components';
import robotoLatinRegularUrl from '../assets/roboto-v30-latin-regular.woff2';
import robotoLatin700Url from '../assets/roboto-v30-latin-700.woff2';
import robotoMonoLatin700Url from '../assets/roboto-mono-v22-latin-700.woff2';

export const GlobalStyle = createGlobalStyle`
  /* roboto-regular - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url(${robotoLatinRegularUrl}) format('woff2');
  }

  /* roboto-700 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local(''),
        url(${robotoLatin700Url}) format('woff2');
  }

  /* roboto-mono-700 - latin */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 700;
    src: local(''),
        url(${robotoMonoLatin700Url}) format('woff2');
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
  }

  body {
    background: ${({ theme }) => theme['gray-900']};
    color: ${({ theme }) => theme['gray-300']};
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
`;
