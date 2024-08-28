"use client";

import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

export const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 18,
    "fontWeightLight": 300,
    "fontWeightRegular": 700,
    "fontWeightMedium": 500
  },
  palette: {
    mode: "dark",
    primary: palette.augmentColor({
      color: {
        main: "#acd452",
        contrastText: "#253600",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#c2caaa",
        contrastText: "#2c331c",
      },
    }),
    text: {
      primary: "#e4e2db",
      secondary: "#e4e2db",
    },
    background: {
      default: "#1b1c17",
      paper: "#1b1c17",
    },
    error: palette.augmentColor({
      color: {
        main: "#ffb4a9",
        contrastText: "#680003",
      },
    }),
    success: palette.augmentColor({
      color: {
        main: "#79dd72",
        contrastText: "#003a03",
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
    divider: "#909284",
    upvote: palette.augmentColor({
      color: {
        main: "#acd452",
        contrastText: "#253600",
      },
    }),
    downvote: palette.augmentColor({
      color: {
        main: "#ffb4a9",
        contrastText: "#680003",
      },
    }),
    containerPrimary: palette.augmentColor({
      color: {
        main: "#374e00",
        contrastText: "#c8f16c",
      },
    }),
    containerSecondary: palette.augmentColor({
      color: {
        main: "#3d4a36",
        contrastText: "#d8e8cb",
      },
    }),
  }
})