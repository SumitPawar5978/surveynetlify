import React, { useEffect, useState } from 'react';
import { onValue, ref, update, remove } from "firebase/database";
import { db } from "../../utils/firebase";
import { Box, Button } from '@mui/material';

export default function ExaminerPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const query = ref(db, 'examRequests');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const requestsList = [];
      if (data) {
        Object.values(data).forEach((request) => {
          if (request.status === 'pending') {
            requestsList.push(request);
          }
        });
        setRequests(requestsList);
      }
    });
  }, []);

  const handleApproval = (userId, isApproved) => {
    const status = isApproved ? 'approved' : 'rejected';
    update(ref(db, 'examRequests/' + userId), { status }).then(() => {
      alert(`Request ${status}!`);
    }).catch((error) => {
      console.error(`Error updating status: ${error}`);
    });
  };

  const handleDelete = (userId) => {
    remove(ref(db, 'examRequests/' + userId)).then(() => {
      alert("Request deleted successfully");
    });
  };

  return (
    <Box>
      {requests.length === 0 ? <p>No pending requests</p> : null}
      {requests.map((item) => (
        <Box key={item.userId} mb={3}>
          <p>name: {item.name}</p>
          <p>surveyCode: {item.surveyCode}</p>
          <p>location: {item.location}</p>
          <p>userId ID: {item.userId}</p>
          <p>result_id: {item.result_id}</p>
          <p>status: {item.status}</p>
          <p>test_type: {item.test_type}</p>
          <Button variant='outlined' onClick={() => handleApproval(item.userId, true)}>Approve</Button>
          <Button variant='outlined' onClick={() => handleApproval(item.userId, false)}>Reject</Button>
          <Button variant='outlined' onClick={() => handleDelete(item.userId)}>Delete</Button>
        </Box>
      ))}
    </Box>
  );
}
