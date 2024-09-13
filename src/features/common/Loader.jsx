import React, { useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Reload from "../../assets/image/reload.svg";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";
import { getTestQuestionDetail } from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionCollection } from "../../app/reducer";
import { ref, set, onValue } from "firebase/database";
import { db } from "../../utils/firebase";
import Swal from "sweetalert2";

const Loading = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Retrieve data from Redux store
  const { requestData, selectedLanguage } = useSelector((state) => ({
    requestData: state.reducer.requestData,
    selectedLanguage: state.reducer.selectedLanguage,
  }));

  // Wrap fetchQuestion in useCallback
  const fetchQuestion = useCallback(async () => {
    try {
      const { data } = await getTestQuestionDetail({
        result_id: requestData?.result_id,
        language: selectedLanguage,
      });

      if (data.status === "success") {
        dispatch(setQuestionCollection(data));
        navigate(routePath.EXAMPAGE);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  }, [requestData?.result_id, selectedLanguage, dispatch, navigate]);

  // Memoize startListeningForStatus using useCallback
  const startListeningForStatus = useCallback((userId) => {
    const statusRef = ref(db, `examRequests/${userId}/status`);
    onValue(statusRef, (snapshot) => {
      const statusValue = snapshot.val();

      if (["Accept", "Reject"].includes(statusValue)) {
        if (statusValue === "Accept") {
          fetchQuestion();
          Toast.fire({
            icon: "success",
            title: "Request Accepted",
          });
        } else {
          navigate(routePath.HOME);
          Toast.fire({
            icon: "success",
            title: "Request Rejected",
          });
        }
      }
    });
  }, [fetchQuestion, navigate, Toast]); // fetchQuestion and navigate as dependencies

  // Automatically submit request on component mount
  useEffect(() => {
    const handleSubmit = () => {
      const userId = requestData.userId;

      set(ref(db, `examRequests/${userId}`), {
        name: requestData.name,
        surveyCode: requestData.surveyCode,
        location: requestData.location,
        userId,
        result_id: requestData.result_id,
        status: "pending", // Status set to pending
        test_type: requestData.test_type,
      })
        .then(() => {
          startListeningForStatus(userId); // Start listening for status updates
        })
        .catch((error) => {
          console.error("Error submitting request:", error);
        });
    };

    handleSubmit();
  }, [requestData, startListeningForStatus]); // Include startListeningForStatus as a dependency

  return (
    <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh" }}>
      <Box sx={{ padding: "0px 20px" }}>
        <Box sx={{ padding: "12px", borderRadius: "5px", background: "#fff" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ fontWeight: "700", fontSize: "17px", color: "#222222CC" }}>
              Head Code:{" "}
              <Box component="span" sx={{ color: "#F84D01" }}>
                {requestData.surveyCode}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ padding: "0px 20px", marginTop: "50px" }}>
        <Box
          sx={{
            padding: "10px",
            borderRadius: "5px",
            background: "#fff",
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={Reload}
            alt="Reload"
            sx={{
              my: 2,
              height: "95px",
              width: "95px",
              animation: "spin 2s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />

          <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#70787A" }}>
            Please Wait, Your Survey is Starting Soon!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
