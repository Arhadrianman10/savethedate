import React from 'react';
import BackgroundContainer from './components/BackgroundContainer';
import Header from './components/Header';
import FooterPolaroids from './components/FooterPolaroids';
import Countdown from './components/Countdown';

export default function SaveTheDate() {
  return (
    <BackgroundContainer>
      <Header />
      <Countdown />
      <FooterPolaroids />
    </BackgroundContainer>
  );
}
