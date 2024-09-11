import React, { useState } from 'react';
import { Typography, Box, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from "../../assets/image/logo.svg";
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../constants/routePath';
import { sendOtp } from '../../utils/axios';
import { setIsRegistration, setRegistrationData } from '../../app/reducer';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

const CustomRadio = styled(Radio)({
  color: 'rgba(0, 0, 0, 0.6)', // Unselected color
  '&.Mui-checked': {
    color: 'rgba(112, 120, 122, 1)', // Selected color
  },
});

const Registration = () => {
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
     userType: 'Medical Students'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      userType: event.target.value 
    }));
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
  
    if (!formData.firstName) tempErrors.firstName = 'First name is required.';
    
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      tempErrors.email = 'Enter a valid email address.';
    }
  
    if (!formData.mobileNumber) {
      tempErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }
  
    if (!formData.password) {
      tempErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
    }
  
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }
  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  

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
    if (validate()) {
      try {
        const res = await sendOtp({         
          email_id: formData.email,
          mobile_no: formData.mobileNumber,
        });
        localStorage.setItem("registrationEMail", formData.email)
        localStorage.setItem("registrationPassword", formData.password)
        console.log("OTP verification response:", res.data);

        if (res.data.status === "success") {
          dispatch(setRegistrationData(formData));
          dispatch(setIsRegistration(true))
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
          console.log(res.data.message, "responses")
          navigate(routePath.OTP);
        } else {
          Toast.fire({
            icon: "error",
            title: res.data.message,
          });
        }
      } catch (error) {
        console.error("Failed to verify OTP:", error);
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: "accent.main", height: "100%", padding: "35px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="img" src={Logo} alt="Logo" sx={{ height: "90px", width: "87px" }} />
      </Box>
      <Typography mt={4} sx={{ fontSize: "33px", fontWeight: "700", display: "flex", justifyContent: "center", color: "#F21F2E" }}>
        Registration
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant='h5' sx={{ fontSize: "14px", fontWeight: "700", color: "rgba(34, 34, 34, 0.8)", marginLeft: '15px', marginBottom: "7px" }}>
          Full Name
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          id="firstName"
          label="Enter First Name"
          variant="outlined"
          value={formData.firstName}
          onChange={handleInputChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ width: "100%" }}
            id="middleName"
            label="Enter Middle Name"
            variant="outlined"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ width: "100%" }}
            id="lastName"
            label="Enter Last Name"
            variant="outlined"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Typography variant='h5' sx={{ fontSize: "14px", fontWeight: "700", color: "rgba(34, 34, 34, 0.8)", marginLeft: '15px', marginBottom: "7px" }}>
          Email Id
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          id="email"
          label="Enter Email Id"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Typography variant='h5' sx={{ fontSize: "14px", fontWeight: "700", color: "rgba(34, 34, 34, 0.8)", marginLeft: '15px', marginBottom: "7px" }}>
          Mobile Number
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          id="mobileNumber"
          label="Enter Mobile Number"
          variant="outlined"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          error={Boolean(errors.mobileNumber)}
          helperText={errors.mobileNumber}
        />
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Typography variant='h5' sx={{ fontSize: "14px", fontWeight: "700", color: "rgba(34, 34, 34, 0.8)", marginLeft: '15px', marginBottom: "7px" }}>
          Set Password
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          id="password"
          label="Enter Password"
          variant="outlined"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ width: "100%" }}
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <Typography variant='h5' sx={{ fontSize: "14px", fontWeight: "700", marginLeft: '15px', color: "rgba(34, 34, 34, 0.8)" }}>
          Select Your User Type
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="user-type-label"
            value={formData.userType}
            onChange={handleChange}
          >
            <FormControlLabel value="Medical Students" control={<CustomRadio />} label="Medical Students" />
            <FormControlLabel value="School / Children" control={<CustomRadio />} label="School / Children" />
            <FormControlLabel value="Other" control={<CustomRadio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Button variant="contained" sx={{ width: "100%" }} onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
}

export default Registration;
