import React, { useState } from 'react';
import { Typography, Box, Button, TextField, Link } from '@mui/material';
import Logo from "../../assets/image/logo.svg";
import { routePath } from '../../constants/routePath';
import { useNavigate } from 'react-router-dom';
import { forgetPassword, verifyForgotPasswordOtp } from '../../utils/axios'; 
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [otpDisabled, setOtpDisabled] = useState(true); 
  const [otpStage, setOtpStage] = useState(false); 
  const navigate = useNavigate();

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

  const validate = () => {
    let tempErrors = {};

    if (!emailOrMobile && !otpStage) {
      tempErrors.emailOrMobile = "Email or mobile number is required.";
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailOrMobile) &&
      !/^\d{10}$/.test(emailOrMobile) &&
      !otpStage
    ) {
      tempErrors.emailOrMobile =
        "Enter a valid email address or 10-digit mobile number.";
    }

    if (!otp && otpStage) {
      tempErrors.otp = "OTP is required.";
    } else if (!/^\d{4}$/.test(otp) && otpStage) {
      tempErrors.otp = "Enter a valid 4-digit OTP.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInitialSubmit = async () => {
    if (validate()) {
      try {
        const response = await forgetPassword({
          mobile_no: emailOrMobile,
        });

        if (response.data.status === "success") {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          setOtpDisabled(false); 
          setOtpStage(true); 
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      } catch (error) {
        console.error('Error fetching API', error);
        setErrors({ apiError: "Something went wrong. Please try again." });
      }
    }
  };

  const handleOtpSubmit = async () => {
    if (validate()) {
      try {
        const response = await verifyForgotPasswordOtp({
          mobile_no: emailOrMobile,
          otp: otp,
        });
       localStorage.setItem("fogotEmail", emailOrMobile)

        if (response.data.status === "success") {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          navigate(routePath.SETPASSWORD); 
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      } catch (error) {
        console.error('Error verifying OTP', error);
        setErrors({ apiError: "Invalid OTP. Please try again." });
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", padding: "35px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="img" src={Logo} alt="Logo" sx={{ height: "90px", width: "87px" }} />
      </Box>
      <Typography
        mt={4}
        sx={{
          fontSize: "33px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "center",
          color: "#F21F2E",
        }}
      >
        Forgot Password
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          sx={{ width: "100%" }}
          id="email-or-mobile"
          label="Email ID or Mobile Number"
          variant="outlined"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          error={Boolean(errors.emailOrMobile)}
          helperText={errors.emailOrMobile}
          disabled={otpStage} 
        />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          sx={{ width: "100%" }}
          id="otp"
          label="Enter OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={Boolean(errors.otp)}
          helperText={errors.otp}
          disabled={otpDisabled} 
        />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={otpStage ? handleOtpSubmit : handleInitialSubmit}
        >
          {otpStage ? 'SUBMIT OTP' : 'SUBMIT'}
        </Button>
      </Box>
      <Box sx={{ marginTop: "25px", textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{
            color: "#22222299",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          OTP Not Received Yet?{" "}
          <Link
            href="#"
            sx={{
              color: "#EE2320",
              fontSize: "14px",
              textDecoration: "underline",
              fontWeight: 700,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={handleInitialSubmit} 
          >
            Resend OTP
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
