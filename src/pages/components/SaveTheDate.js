import React from 'react';
import BackgroundContainer from './components/BackgroundContainer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import FooterPolaroids from './components/FooterPolaroids';
import Countdown from './components/Countdown';

export default function SaveTheDate() {
  return (
    <BackgroundContainer>
      <Header />
      <MainContent />
      <Countdown />
      <FooterPolaroids />
    </BackgroundContainer>
  );
}
