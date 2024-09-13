import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const PwaInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Show custom popup

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('beforeinstallprompt event fired');
      setDeferredPrompt(e); // Save the event for later
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      console.log('Showing custom popup');
      setShowPopup(true); // Show the custom popup when the button is clicked
    } else {
      console.log('Deferred prompt is not available');
    }
  };

  const handleConfirmInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the browser install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null); // Clear the prompt after use
        setShowPopup(false); // Close the custom popup
      }).catch(error => {
        console.error('Error handling deferred prompt:', error);
      });
    } else {
      console.log('Deferred prompt is null'); // Debug log
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close custom popup without installing
  };

  return (
    <div>
      {/* Always show the install button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleInstallClick}
        style={{ position: 'fixed', bottom: '16px', right: '16px' }} // Fixed position
      >
        Install App
      </Button>

      {/* Custom popup to confirm app installation */}
      <Dialog open={showPopup} onClose={handleClosePopup}>
        <DialogTitle>Install App</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Do you want to install this app?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmInstall} color="primary">
            Yes, Install
          </Button>
          <Button onClick={handleClosePopup} color="secondary">
            No, Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PwaInstallPopup;
