import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <Head>
        <title>Shopiverse Store</title>
        <meta name='description' content='Shopiverse ecommerce store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <Navbar />
      </header>

      <main className='main-container'>{children}</main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

