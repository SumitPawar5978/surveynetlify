import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from "firebase/database";
import { db } from "../../utils/firebase";
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export default function StudentForm() {
  const [formData, setFormData] = useState({ surveyCode: '', location: '' });
  const [loading, setLoading] = useState(false); // Loader for sending request
  const [statusLoading, setStatusLoading] = useState(false); // Loader for checking status
  const [status, setStatus] = useState(''); // Holds the current status (approved/rejected)
  const handleSubmit = () => {
    const { name,surveyCode, location } = formData;
    setLoading(true); // Show loader for submitting the request
    let userId = new Date().getTime();
    set(ref(db, 'examRequests/' + userId), {
        name:'imran',
      surveyCode,
      location,
      userId,
      status: 'pending',
         test_type:"pre test",
         result_id:20,
    })
      .then(() => {
        setLoading(false); // Hide loader after submission
        setStatusLoading(true); // Show loader for checking status
        startListeningForStatus(userId); // Start listening for status updates
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
        setLoading(false);
      });
  };

  // Function to start listening for status updates from Firebase
  const startListeningForStatus = (userId) => {
    const statusRef = ref(db, 'examRequests/' + userId + '/status');
    onValue(statusRef, (snapshot) => {
      const statusValue = snapshot.val();
      if (statusValue === 'Accept' || statusValue === 'Reject') {
        setStatus(statusValue);
        setStatusLoading(false); // Stop the loader when status is received
      }
    });
  };

  return (
    <Box display={'flex'} flexDirection="column" gap={1} alignItems="center">
      {loading && <CircularProgress />} {/* Show loader when sending request */}
      {statusLoading && <CircularProgress />} {/* Show loader when checking status */}

      {!loading && !statusLoading && status === '' && (
        <>
          <TextField
            type='text'
            value={formData.surveyCode}
            onChange={(e) => setFormData({ ...formData, surveyCode: e.target.value })}
            placeholder='Enter your surveyCode'
            required
          />
          <TextField
            type='text'
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder='Enter your unique ID'
            required
          />
          <Button variant='outlined' onClick={handleSubmit}>
            Submit
          </Button>
        </>
      )}

      {/* Display approval or rejection message */}
      {status === 'Accept' && <p>Your request has been approved!</p>}
      {status === 'Reject' && <p>Your request has been rejected.</p>}
    </Box>
  );
}
