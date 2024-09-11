import { Typography, Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Logo from "../../assets/image/logo.svg";
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../constants/routePath';
import { verifyOTP } from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../app/reducer';
import Swal from "sweetalert2";

const OTP = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const formData = useSelector((state) => state.reducer.formData);
    const [otp, setOtp] = useState('');

    console.log(formData.userType, 'formData');
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

    const handleSubmit = async () => {
        try {
            const payload = {
                first_name: formData.firstName,
                middle_name: formData.middleName,
                last_name: formData.lastName,
                email_id: formData.email,
                mobile_no: formData.mobileNumber,
                otp: otp, 
                password: formData.password,
                confirm_password: formData.confirmPassword,
                user_type: formData.userType
            };
    
            const res = await verifyOTP(payload);
    
            console.log("OTP verification response:", res.data.user_id);
    
            if (res.data.status === "success") {
                Toast.fire({
                    icon: "success",
                    title: res.data.message,
                  });
                dispatch(setUserId(res.data.user_id)); 
                switch (formData.userType) {
                    case "School / Children":
                        navigate(routePath.SCHOOLSTUDENT);
                        break;
                    case "Medical Students":
                        navigate(routePath.MEDICALSTUDENT);
                        break;
                    case "Other":
                        navigate(routePath.LOGIN);
                        break;
                    default:
                        console.error("Unknown user type.");
                        break;
                }
            } else {
                Toast.fire({
                    icon: "error",
                    title: res.data.message,
                  });
            }
        } catch (error) {
            console.error("Failed to verify OTP:", error);
        }
    };
    
    return (
        <>
            <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", padding: "35px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box component="img" src={Logo} alt="Logo" style={{ height: "90px", width:"87px" }} />
                </Box>
                <Typography mt={4} sx={{ fontSize: "33px", fontWeight: "700", display: "flex", justifyContent: "center", color: "#F21F2E" }}>
                    OTP
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                    <TextField
                        sx={{ width: "100%" }}
                        id="otp"
                        label="OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                    <Button variant="contained" sx={{ width: "100%" }} onClick={handleSubmit}>
                        SUBMIT
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
                        OTP Not Received Yet!{' '}
                        <Typography
                            component="span"
                            sx={{ color: "#EE2320",
                                fontSize: "14px",
                                textDecoration: "underline",
                                fontWeight: 700,
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" } }}
                            onClick={() => console.log('Resend OTP clicked')}
                        >
                            Resend OTP
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default OTP;
