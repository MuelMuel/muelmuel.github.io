import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: `'Quicksand', sans-serif`,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        draggable: false
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#2a1c3f',
    },
    secondary: {
      main: '#ef7da4',
    },
  }
})