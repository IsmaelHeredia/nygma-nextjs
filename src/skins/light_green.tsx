import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

export const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 18
  },
  palette: {
    mode: "light",
    primary: palette.augmentColor({
      color: {
        main: "#4a6800",
        contrastText: "#ffffff",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#5a6147",
        contrastText: "#ffffff",
      },
    }),
    text: {
      primary: "#1b1c17",
      secondary: "#1b1c17",
    },
    background: {
      default: "#fefdf4",
      paper: "#fefcf4",
    },
    error: palette.augmentColor({
      color: {
        main: "#ba1b1b",
        contrastText: "#ffffff",
      },
    }),
    success: palette.augmentColor({
      color: {
        main: "#006e10",
        contrastText: "#ffffff",
      },
    }),
    info: palette.augmentColor({
      color: {
        main: "#0062a2",
        contrastText: "#ffffff",
      },
    }),
    warning: palette.augmentColor({
      color: {
        main: "#606200",
        contrastText: "#ffffff",
      },
    }),
    divider: "#75786a",
    upvote: palette.augmentColor({
      color: {
        main: "#4a6800",
        contrastText: "#ffffff",
      },
    }),
    downvote: palette.augmentColor({
      color: {
        main: "#ba1b1b",
        contrastText: "#ffffff",
      },
    }),
    containerPrimary: palette.augmentColor({
      color: {
        main: "#c8f16c",
        contrastText: "#131f00",
      },
    }),
    containerSecondary: palette.augmentColor({
      color: {
        main: "#d8e8cb",
        contrastText: "#131f0e",
      },
    }),
  }
})