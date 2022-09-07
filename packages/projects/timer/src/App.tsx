import { StyledReset } from '@ignite-react/styled-reset';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CyclesContextProvider } from './contexts/cycles';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <StyledReset />
        <GlobalStyle />
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
