// src/pages/_app.js
import React from 'react';
import './index.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
