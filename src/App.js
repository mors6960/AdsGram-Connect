import React from 'react';
import { ShowAdButton } from './components/ShowAdButton/ShowAdButton';
import AdsgramAd from './components/AdsgramAd/AdsgramAd';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Adsgram Integration</h1>
      <ShowAdButton />
      {/* Replace with the actual blockId of your ad */}
      <AdsgramAd blockId="int-7399" />
    </div>
  );
}

export default App;
