import { useCallback, useEffect, useRef, useState } from 'react';
import { ConsentModal } from '../components/ConsentModal/ConsentModal.js'; // Import the modal

export function useAdsgram({ blockId, onReward, onError }) {
  const [userConsented, setUserConsented] = useState(false); // Track user consent
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const AdControllerRef = useRef(undefined);

  // Initialize the Adsgram controller when the blockId changes
  useEffect(() => {
    if (window.Adsgram) {
      AdControllerRef.current = window.Adsgram.init({ blockId });
    } else {
      console.error('Adsgram script not loaded');
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      });
    }
  }, [blockId, onError]);

  // Function to show the ad with user consent check
  const showAd = useCallback(async () => {
    if (!userConsented) {
      setShowModal(true); // Show the modal to get user consent
      return; // Prevent showing ads if user hasn't consented
    }

    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then((result) => {
          // Reward the user after ad completion
          onReward?.();
        })
        .catch((result) => {
          // Handle error if ad could not be played
          onError?.(result);
        })
        .finally(() => {
          // Cleanup or perform any final actions if necessary
        });
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram controller not initialized',
      });
    }
  }, [onError, onReward, userConsented]);

  // Function to handle user consent
  const handleUserConsent = useCallback((consent) => {
    setUserConsented(consent); // Set user consent status
    setShowModal(false); // Close the modal
    if (consent) {
      showAd(); // Show the ad if the user consented
    }
  }, [showAd]);

  return { showAd, showModal, handleUserConsent };
}
