import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
  
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = {edges: []}, incoming) {
              
              const {edges, ...rest} = incoming
              let result = rest;

              result.edges = [...existing?.edges, ...edges]
              
              return result;
            },
          }
        }
      }
    }
  
  }),
})

const theme = {
  colors: {
  }
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
  }

  a {
    color: #0070f0;
    text-decoration: none;
  }

  a:hover {
    color: #0050d0;
    text-decoration: underline;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }

  p {
    font-size: 1rem;
    margin: 0 0 1rem;
  }

  * {
    box-sizing: border-box;
  }
`;