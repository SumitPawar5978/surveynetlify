import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import Logo from "../../assets/image/logo.svg";
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../constants/routePath';
import { loginAxios, updateAddressDetail } from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../app/reducer';
import Swal from "sweetalert2";

const SchoolChildren = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const formDatas = useSelector((state) => state.reducer.formData);
    const userId = useSelector((state) => state.reducer.userId);

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
    
    console.log(formDatas.userType, userId, "name")
    const [formData, setFormData] = useState({
        institute_name: '',
        institute_type: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const loginApi = async () => {
        const email = await localStorage.getItem("registrationEMail")
        const password = await localStorage.getItem("registrationPassword")
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
        try {
            const payload = {
                user_type: "School/Children", 
                user_id: userId, 
                institute_name: formData.institute_name, 
                education_type: formData.institute_type, 
            };

            const res = await updateAddressDetail(payload);
            console.log(res.data, "datass")
            if (res.data.status === "success") {    
                loginApi()
                // navigate(routePath.LOGIN);
            } else {
                console.error("API call failed:", res.data.message);
            }
        } catch (error) {
            console.error("Failed to update address details:", error);
        }
    };


    return (
        <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", padding: "35px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box component="img" src={Logo} alt="Logo" style={{ height: "90px", width: "87px" }} />
            </Box>
            <Typography
                mt={4}
                sx={{
                    fontSize: "33px",
                    fontWeight: "700",
                    display: "flex",
                    justifyContent: "center",
                    color: "#F21F2E"
                }}
            >
                Registration
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
                <Typography
                    variant='h5'
                    sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "rgba(34, 34, 34, 0.8)",
                        marginLeft: '15px',
                        marginBlock: "7px"
                    }}
                >
                    Institute Name
                </Typography>
                <Box>
                    <TextField
                        sx={{ width: "100%" }}
                        name="institute_name"
                        label="Enter Your Institute Name"
                        variant="outlined"
                        value={formData.institute_name}
                        onChange={handleInputChange}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    variant='h5'
                    sx={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "rgba(34, 34, 34, 0.8)",
                        marginLeft: '15px',
                        marginBlock: "7px"
                    }}
                >
                    Education Type
                </Typography>
                <Box>
                    <TextField
                        sx={{ width: "100%" }}
                        name="institute_type"
                        label="Enter Your Education Type"
                        variant="outlined"
                        value={formData.institute_type}
                        onChange={handleInputChange}
                    />
                </Box>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Button
                    variant="contained"
                    sx={{
                        width: "100%",
                        fontSize: "16px",
                        fontWeight: "700",
                    }}
                    onClick={handleSubmit}
                >
                    SUBMIT
                </Button>
            </Box>
        </Box>
    );
};

export default SchoolChildren;
