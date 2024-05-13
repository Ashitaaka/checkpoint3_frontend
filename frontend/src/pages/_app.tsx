import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <header className="header text-center p-8 bg-pink-600 text-white mb-12">
        <h1 className="text-3xl font-medium">Checkpoint : frontend</h1>
        <h2 className="text-2xl font-light">Countries</h2>
      </header>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
