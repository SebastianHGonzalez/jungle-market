import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import withApollo from 'hooks/withApollo';

export interface Theme {
  niceBlack: string;
}

export interface ThemeWrapper {
  theme: Theme;
}

export const theme: Theme = {
  niceBlack: '#001F3F',
};

const GlobalStyle = createGlobalStyle<ThemeWrapper>`
  body {
    margin: 0 auto;
    color: ${(props) => props.theme.niceBlack}; 
  }
`;

// since "apollo" isn't a native Next.js prop we have to declare it's type.
interface Props {
  apollo: ApolloClient<NormalizedCacheObject>;
}

// adds our custom props interface to the generic App base class.
class MyApp extends App<Props> {
  render() {
    // instead of creating a client here,
    // we use the rehydrated apollo client provided by our own withApollo provider.
    const { Component, pageProps, apollo } = this.props;

    return (
      <>
        <Head>
          <title>GraphQL Job Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* adds the apollo provider to provide it's children with the apollo scope. */}
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...pageProps}
            />
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp);
