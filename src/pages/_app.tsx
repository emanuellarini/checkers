import React from 'react';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { RoomProvider } from '../context';
import { createEmotionCache } from '../lib/createEmotionCache';
import { theme } from '../lib/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppPropsWithLayout = AppProps & {
  emotionCache?: EmotionCache;
  Component: NextPage;
};

const App = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RoomProvider>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </RoomProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
