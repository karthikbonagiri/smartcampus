import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1a2a6c' },
    secondary: { main: '#0e7c6b' },
    error: { main: '#d32f2f' },
    warning: { main: '#f57c00' },
    success: { main: '#2e7d32' },
    background: { default: '#f8f9fa', paper: '#ffffff' }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { boxShadow: '0 8px 32px rgba(0,0,0,0.08)' } } }
  }
});