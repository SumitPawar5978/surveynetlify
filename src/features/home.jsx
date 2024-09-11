import React, {  useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
} from "@mui/material";

import { routePath } from "../constants/routePath";
import { useNavigate } from "react-router-dom";
import Pray from "../assets/image/Pray.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsRegistration, setRequestData } from "../app/reducer";
import { applyForTest } from "../utils/axios";
const Homes = () => {
  const isHead = useSelector((state) => state.reducer.isHead);
  const isRegistration = useSelector((state) => state.reducer.isRegistration);
  const navigate = useNavigate();
  const [surveyCode, setSurveyCode] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()

  const validate = () => {
    let tempErrors = {};
    tempErrors.surveyCode = surveyCode ? "" : "Survey code is required.";
    tempErrors.location = location ? "" : "Location is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleApply = async() => {
    if (validate()) {
      

      try {
        const res = await applyForTest({head_code:surveyCode, location:location});
        console.log("responses :", res?.data.result_id);

        if (res.data.status === "success") {
          // let userId=new Date().getTime();
    
          dispatch(setRequestData({surveyCode:surveyCode, location:location, result_id:res?.data?.result_id, name:res?.data?.name, test_type:res?.data?.test_type, userId:res?.data?.userId}))
          navigate(routePath.LOADING);
        } else {
         alert(res.data.message)
        }
      } catch (error) {
        console.error("Failed to get code:", error);
      }   
    }
  };





  return (
    <>
      <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", p: "20px" }}>
        

        <Box sx={{ p: "10px", mt: 5, borderRadius: "5px", backgroundColor: "#FFF" }}>
          <Typography sx={{ fontSize: 25, fontWeight: 700, color: "#F84D01" }}>
            Help us to improve.
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#70787A", mb: 2 }}>
            Take our survey and make a difference.
          </Typography>
          <TextField
            fullWidth
            label="Enter a code to join survey"
            variant="outlined"
            value={surveyCode}
            onChange={(e) => setSurveyCode(e.target.value)}
            error={!!errors.surveyCode}
            helperText={errors.surveyCode}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Enter Your Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={!!errors.location}
            helperText={errors.location}
          />
          <Typography
            sx={{ fontSize: 10, fontWeight: 700, color: "#70787A", mt: 1 }}
          >
            Ex. Institute Name, School / College Name, Office Name Etc
          </Typography>
          <Button
          disabled={isHead}
            variant="contained"
            fullWidth
            sx={{ mt: 2, fontSize: 16, fontWeight: 700 }}
            onClick={handleApply}
          >
            APPLY
          </Button>
        </Box>

        <Box sx={{ mt: 2, px: 2 }}>
          <Button
          disabled={!isHead}
            variant="contained"
            fullWidth
            sx={{ fontSize: 16, fontWeight: 700 }}
            onClick={() => navigate(routePath.STARTSURVEY)}
          >
            CLICK TO HEAD LOGIN
          </Button>
        </Box>
      </Box>

      <Modal
        open={isRegistration}
        onClose={() => dispatch(setIsRegistration(false))}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            py: 2,
            borderRadius: 2,
            px: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Box component="img" src={Pray} alt="Thank You" sx={{ height: 108, width: 108 }} />
          </Box>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#70787A", textAlign: 'center' }}>
            Thank you for registration
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, fontSize: 16, fontWeight: 700, textTransform: "uppercase" }}
            onClick={() => dispatch(setIsRegistration(false))}
          >
            Start App
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Homes;
