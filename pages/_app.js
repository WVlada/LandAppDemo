import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import HomeButton from '../components/home_button'
import '../styles/globals.css'
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
