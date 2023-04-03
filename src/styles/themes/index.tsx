import { createTheme, Theme } from "@mui/material/styles";

export const defaultTheme: Theme = createTheme({
  palette: { secondary: { main: "#a2a2a7" } },
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 1rem",
        },
        expandIconWrapper: {
          transform: "none",
          WebkitTransform: "none",
        },
      },
    },
  },
});
