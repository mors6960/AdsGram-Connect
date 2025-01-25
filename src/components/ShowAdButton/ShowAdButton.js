import React, { useCallback } from 'react';
import { useAdsgram } from '../../hooks/useAdsgram';
import { ConsentModal } from '../ConsentModal/ConsentModal'; // Import the modal

export function ShowAdButton() {
  // Callback for rewarding the user
  const onReward = useCallback(() => {
    alert('You have been rewarded!');
  }, []);

  // Callback for handling errors during the ad
  const onError = useCallback((result) => {
    alert(JSON.stringify(result, null, 4)); // Display error details
  }, []);

  // Replace with your Adsgram block ID
  const blockId = 'int-7418';  // Update this with your actual Adsgram Block ID
  
  // Get the functions to show the ad and request user consent
  const { showAd, showModal, handleUserConsent } = useAdsgram({ blockId, onReward, onError });

  return (
    <>
      <button onClick={showAd}>Show Ad</button>

      {/* Show the consent modal if the user hasn't consented */}
      {showModal && <ConsentModal onConsent={handleUserConsent} />}
    </>
  );
}
