import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import HomeButton from '../components/home_button'
import {useRouter} from 'next/router'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ChakraProvider>
      {
        router !== "/" ? <HomeButton></HomeButton> : null
      }
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
