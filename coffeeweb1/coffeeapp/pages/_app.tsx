import { BaseGoerli } from "@thirdweb-dev/chains";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react"; 
import "../styles/globals.css";
import type { ReactNode } from 'react';
import React from 'react';




// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "Base-Goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={BaseGoerli}>

    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>


      
    </ThirdwebProvider>
  );
};



export default MyApp;



