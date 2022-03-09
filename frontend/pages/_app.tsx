import React from "react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import client from "../utils/client";

import "../styles/globals.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
  },
  typography: {
    body1: {
      fontWeight: "400",
      fontSize: "0.875rem",
    },
    body2: {
      fontWeight: "700",
      fontSize: "0.875rem",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
