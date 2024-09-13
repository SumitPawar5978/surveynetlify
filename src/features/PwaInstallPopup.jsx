import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const PwaInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false); // Show install button
  const [openPopup, setOpenPopup] = useState(false); // Show custom popup

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true); // Show the button to install the app
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    setOpenPopup(true); // Show the custom popup when button is clicked
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
        setDeferredPrompt(null);
      });
      setOpenPopup(false); // Close the custom popup after install
      setShowInstallButton(false); // Hide install button after installation
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false); // Close custom popup without installing
  };

  return (
    <div>
      {/* Show "Install App" button if the PWA is eligible for installation */}
      {showInstallButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleInstallClick}
          sx={{ m: 2 }}
        >
          Install App
        </Button>
      )}

      {/* Custom popup to confirm app installation */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
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
