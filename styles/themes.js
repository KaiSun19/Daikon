import { createTheme } from '@mui/material';

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#304ffe',
    },
    dark : {
      main : '#212121'
    },
    background: {
      default: '#ffffff',
      paper: '#f7f7f7',
    },
    divider: 'rgba(119,119,119,0.12)',
  },
  typography: {
    h1: {
      fontSize: '6rem',
    },
  },
});