import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a5d67', // deep, elegant blue-grey for primary actions and headers
    },
    secondary: {
      main: '#d4a373', // earthy, horse-like tan for secondary content
    },
    error: {
      main: '#ff3d00', // keep the default error color
    },
    background: {
      default: 'black', // a light grey background to make content stand out
    },
    text: {
      primary: '#303030', // almost black for primary text
      secondary: '#4a5d67', // text secondary color matches the primary color
    },
  },
  typography: {
    fontFamily: ['"Times New Roman"', 'serif'].join(','), // choose an elegant serif font
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // avoid uppercase text for buttons
    },
  },
});

export default theme;
