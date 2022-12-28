import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import ErrorBoundary from '../components/ErrorBoundary';
import StateContext from '../context/StateContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </StateContext>
  );
}

export default MyApp;
