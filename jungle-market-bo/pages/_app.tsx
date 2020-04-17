import React, { useState } from 'react';
import App, { AppContext } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import cookies from 'next-cookies';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import { I18nProvider, Messages } from 'contexts/I18n';
import { SessionProvider, ISession } from 'contexts/Session';

import withApollo from 'hooks/withApollo';

import theme, { ITheme } from 'themes';

import esAr from 'public/messages/es-AR.json';

export interface ThemeWrapper {
  theme: ITheme;
}

const GlobalStyle = createGlobalStyle<ThemeWrapper>`
  html,
  body,
  #__next {
    height: 100%;
  }

  /**
 * 1. Always reset this sucks.
 * 2. Inherit from default setting
 */

* {
  margin: 0; /* 1 */
  padding: 0; /* 1 */
  border: 0; /* 1 */
  background-repeat: no-repeat; /* 1 */
  box-sizing: inherit; /* 2 */
}

/**
 * 1. Prevent certain mobile browsers from automatically zooming fonts.
 * 2. Border box sizing 
 * 3. Smooth scroll  
 */

html {
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;

  -ms-text-size-adjust: 100%; /* 1 */
  -webkit-text-size-adjust: 100%; /* 1 */
  box-sizing: border-box; /* 2 */
  scroll-behavior: smooth; /* 3 */
}

/**
 * 1. Set default font styles
 * 2. Beautiful fonts again
 * 3. Prevent horizontal scroll
 */

body {
  font-size: 16px; /* 1 */
  -moz-osx-font-smoothing: grayscale; /* 2 */
  -webkit-font-smoothing: antialiased; /* 2 */
}

/**
 * All Headings look the same
 */

h1,
h2,
h3,
h4,
h5 {
  font-size: 1em;
  font-weight: normal;
}

/**
 * 1. Reset link styles 
 * 2. Sized links
 * 3. Remove the gray background on active links in IE 10.
 */

a {
  text-decoration: none; /* 1 */
  color: inherit; /* 1 */
  display: inline-block; /* 2 */
  background-color: transparent; /* 3 */
}

/**
 * No bullets anymore
 */

ol,
ul {
  list-style: none;
}

/**
 * Remove all default styles and all elements look the same 
 */

button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  overflow: visible;
  border: 0;
  outline: 0;
  font: inherit;
  -webkit-font-smoothing: inherit;
  letter-spacing: inherit;
  color: inherit;
  background: none;
  vertical-align: top;
}

/**
 * Avoid no background on Edge and IE 
 */

option {
  background-color: inherit;
}

/**
 * Set a color on active state 
 */

a:active,
button:active {
  color: inherit;
}

/**
 * Prevent chrome autofill style  
 */

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
  -webkit-transition-delay: 9999s;
  transition: "color 9999s ease-out, background-color 9999s ease-out";
  transition-delay: 9999s;
}

/**
 * You should define size for textarea
 */

textarea {
  resize: none;
}

/**
 * Pointer cursor for buttons
 */

input[type="button"],
button {
  cursor: pointer;
}

/**
 * Pointer default for disabled buttons
 */

button[disabled],
html input[disabled] {
  cursor: default;
}

/**
 * 1. Remove space after each image
 * 2. Ensure responsive images
 * 3. Remove the border on images inside links in IE 10.
 */

img {
  display: block; /* 1 */
  max-width: 100%; /* 2 */
  height: auto; /* 2 */
  border-style: none; /* 3 */
}

/**
 * Collapse border spacing
 */

table {
  border-collapse: collapse;
}
`;

// since "apollo" isn't a native Next.js prop we have to declare it's type.
interface Props {
  apollo: ApolloClient<NormalizedCacheObject>;
  initialLang: string;
  initialMessages: Messages;
  initialSession: ISession;
}

// adds our custom props interface to the generic App base class.
class MyApp extends App<Props> {
  static async getInitialProps(appContext: AppContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    const {
      publicRuntimeConfig: { COOKIE_NAME, COOKIE_NAME_ALTERNATIVE },
    } = getConfig();

    const jwtToken = cookies(appContext.ctx)[COOKIE_NAME]
      || cookies(appContext.ctx)[COOKIE_NAME_ALTERNATIVE];
    const initialSession = jwtToken && jwt.decode(jwtToken);

    const initialLang = 'es-AR';

    return {
      initialLang,
      initialMessages: esAr,
      initialSession,
      ...appProps,
    };
  }

  render() {
    // instead of creating a client here,
    // we use the rehydrated apollo client provided by our own withApollo provider.
    const {
      Component,
      pageProps,
      apollo,
      initialLang,
      initialMessages,
      initialSession,
    } = this.props;

    return (
      <>
        <Head>
          <title>GraphQL Job Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {/* adds the apollo provider to provide it's children with the apollo scope. */}
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <I18nState
              initialLang={initialLang}
              initialMessages={initialMessages}
            >
              <SessionState initialSession={initialSession}>
                <GlobalStyle />
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...pageProps}
                />
              </SessionState>
            </I18nState>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp);

interface I18nStateProps {
  initialLang: string;
  initialMessages: Messages;
  children: any;
}

function I18nState({ initialLang, initialMessages, children }: I18nStateProps) {
  const [lang] = useState(initialLang);
  const [messages] = useState(initialMessages);

  return (
    <I18nProvider lang={lang} messages={messages}>
      {children}
    </I18nProvider>
  );
}

interface SessionStateProps {
  initialSession: ISession;
  children: any;
}

function SessionState({ initialSession, children }: SessionStateProps) {
  const [session] = useState(initialSession);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
