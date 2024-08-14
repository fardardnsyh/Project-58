import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2CB1BC',
      light: '#BCF3F8',
      dark: '#00484F',
    },
    secondary: {
      main: '#F0F4F8',
      light: '#F5F5F5',
      dark: '#565656',
    },
    success: {
      main: '#71EB58',
      light: '#C7E8C0',
      dark: '#0E4F00',
    },
    warning: {
      light: '#FFE8C6',
      main: '#ed6c02',
      dark: '#e65100',
    },
    error: {
      main: '#FF0000',
      light: '#FB8080',
      dark: '#4E0000',
    },
  },
});

export default theme;
