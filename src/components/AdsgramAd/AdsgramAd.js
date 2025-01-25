import React, { useState, useEffect } from 'react';
import './AdsgramAd.css';  // Add the CSS file for styling

const AdsgramAd = ({ blockId, onUserConsent }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [adShown, setAdShown] = useState(false); // Track if ad has been shown

  useEffect(() => {
    if (!blockId) {
      console.error('Adsgram block ID is missing.');
      setAdError(true);
      return;
    }

    // Check if Adsgram is loaded and initialize
    if (window.Adsgram) {
      try {
        window.Adsgram.init({
          blockId,
          onAdLoaded: () => setAdLoaded(true),
          onAdError: () => setAdError(true),
        });
      } catch (error) {
        console.error('Error initializing Adsgram:', error);
        setAdError(true);
      }
    } else {
      console.error('Adsgram library not found.');
      setAdError(true);
    }
  }, [blockId]);

  // Function to handle ad display after consent
  const showAd = () => {
    if (!adShown) {
      setAdShown(true);
      onUserConsent();  // Trigger user consent on ad show
    }
  };

  return (
    <div className="adsgram-container">
      {adError ? (
        <div className="adsgram-error">Failed to load ad. Please try again later.</div>
      ) : adLoaded ? (
        <div id={blockId} className="adsgram-ad" onClick={showAd}></div> // Click to show ad
      ) : (
        <p>Loading ad...</p>
      )}
    </div>
  );
};

export default AdsgramAd;
