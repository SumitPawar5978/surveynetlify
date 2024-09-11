import { Typography, Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Logo from "../../assets/image/logo.svg";
import { routePath } from '../../constants/routePath';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAxios, updatePassword } from '../../utils/axios';
import Swal from "sweetalert2";
import { setUserDetails } from '../../app/reducer';

const SetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userId = useSelector((state) => state.reducer.userId);
    const userDetails = useSelector((state) => state.reducer.userDetails);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    console.log(userDetails.web_user_id, 'userDetails')
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

    const loginApi = async () => {
        const email = await localStorage.getItem("fogotEmail")
        await loginAxios({
            username: email,
            password: password,
        })
            .then(async (res) => {
                if (res.data.status === "success") {
                    await localStorage.setItem(
                        "userDetails",
                        JSON.stringify(res.data.authorisation)
                    );
                    dispatch(setUserDetails(res?.data?.user));
                    navigate(routePath.HOME);
                } else {
                    alert()
                    Toast.fire({
                        icon: "error",
                        title: "Try to Relogin",
                    });
                }
            })
            .catch((err) => {
                console.log(err, "errorMessage");
                Toast.fire({
                    icon: "error",
                    title: err.response?.data?.message,
                });
            });
    }
    const handleSubmit = async () => {
        // Check if password fields are filled
        if (!password || !confirmPassword) {
            Toast.fire({
                icon: "error",
                title: "Please Enter Valid Password",
            });
            return;
        }
    
        // Check if the passwords match
        if (password !== confirmPassword) {
            Toast.fire({
                icon: "error",
                title: 'Passwords do not match',
            });
            return;
        }
    
        // Check if userDetails exists and has web_user_id
        const webUserId = userDetails?.web_user_id || userId;
    
        if (!webUserId) {
            Toast.fire({
                icon: "error",
                title: "User details not found",
            });
            return;
        }
    
        const payload = {
            user_id: webUserId,
            password: password,
            confirm_password: confirmPassword,
        };
    
        try {
            const res = await updatePassword(payload);
    
            if (res.data.status === "success") {
                Toast.fire({
                    icon: "success",
                    title: res.data.message,
                });
                loginApi(); // Call the login API if successful
            } else {
                Toast.fire({
                    icon: "error",
                    title: res.data.message,
                });
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Failed to verify OTP',
            });
            console.error("Failed to verify OTP:", error);
        }
    };
    



    return (
        <>
            <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", padding: "35px" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box component="img" src={Logo} alt="Logo" style={{ height: "90px", width: "87px" }} />
                </Box>
                <Typography mt={4} sx={{ fontSize: "33px", fontWeight: "700", display: "flex", justifyContent: "center", color: "#F21F2E" }}>
                    Set Password
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                    <TextField
                        sx={{ width: "100%" }}
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                    <TextField
                        sx={{ width: "100%" }}
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                    <Button
                        variant="contained"
                        sx={{ width: "100%" }}
                        onClick={handleSubmit}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default SetPassword;
