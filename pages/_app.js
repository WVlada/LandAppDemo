import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import HomeButton from '../components/home_button'
import '../styles/globals.css'
import { Provider } from "next-auth/client";
import { extendTheme } from "@chakra-ui/react";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";

const theme = extendTheme({
  colors: {
    lime: {
      50: "#C9E4E6",
      100: "#94B8BB",
      200: "00B0C0",
      300: "#b5f554",
      400: "#a1f226",
      500: "#94B8BB",
      600: "00B0C0",
      700: "#C9E4E6",
      800: "#2b4800",
      900: "#0b1900",
    },
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <NextNprogress
        color="#94B8BB"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
