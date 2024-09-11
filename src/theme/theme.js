import { createTheme } from "@mui/material/styles";
// import { poppins_600, poppins_500, poppins_400, roboto_400, roboto_500} from "../components/common/font";

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"Sahitya"', // Sahitya font
      'Arial', // Fallback font
      'sans-serif', // Generic sans-serif fallback
    ].join(','),
  },
  palette: {
    primary: {
      main: '#F84D01',
      dark: "#B58A44",
      dark2:"#F21F2E",
    },
    secondary: {
      main: "#38B544",
      dark: "#B58A44",
    },
    accent : {
      main: "#E5F9FF",
      dark: "#B58A44",
    },
    
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '-10px',
          '&.Mui-focused': {
            top: '0px',
          },
          '&.MuiFormLabel-filled': {
            top: '0px',
          },
        },
      },
    },
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-root .MuiOutlinedInput-input': {
            padding: '6.5px 14px',
          },
        },
      },
    },
  },
});
