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
    let isValid = true;
    const mandatoryFields = ['firstName', 'middleName', 'lastName', 'email', 'mobileNumber', 'password', 'confirmPassword'];
    // Check if more than one field is empty
    const emptyFields = mandatoryFields.filter(field => !formData[field]);
    if (emptyFields.length > 1) {
      Toast.fire({
        icon: "error",
        title: "Please fill all mandatory fields.",
      });
      return false;
    }
    // Validate first name
    if (!formData.firstName) {
      tempErrors.firstName = 'First name is required.';
      isValid = false;
    } else if (!/^[A-Z]/.test(formData.firstName)) {
      tempErrors.firstName = 'First name must start with a capital letter.';
      isValid = false;
    }
    // Validate middle name
    if (!formData.middleName) {
      tempErrors.middleName = 'Middle name is required.';
      isValid = false;
    } else if (!/^[A-Z]/.test(formData.middleName)) {
      tempErrors.middleName = 'Middle name must start with a capital letter.';
      isValid = false;
    }
    // Validate last name
    if (!formData.lastName) {
      tempErrors.lastName = 'Last name is required.';
      isValid = false;
    } else if (!/^[A-Z]/.test(formData.lastName)) {
      tempErrors.lastName = 'Last name must start with a capital letter.';
      isValid = false;
    }
    // Validate email
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
      isValid = false;
    } else if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      tempErrors.email = 'Enter a valid email address.';
      isValid = false;
    }
    // Validate mobile number
    if (!formData.mobileNumber) {
      tempErrors.mobileNumber = 'Mobile number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
      isValid = false;
    }
    // Validate password
    if (!formData.password) {
      tempErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }
    // Validate confirm password
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Confirm Password is required.';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }
    setErrors(tempErrors);
    // Show Toast for first error message, if applicable
    if (!isValid && Object.values(tempErrors).length > 0) {
      Toast.fire({
        icon: "error",
        title: Object.values(tempErrors)[0], // Show the first error
      });
    }
    return isValid;
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
    if (validate()) { // Call the updated validate function
      try {
        const res = await sendOtp({
          email_id: formData.email,
          mobile_no: formData.mobileNumber,
          first_name:formData.firstName
        });
  
        localStorage.setItem("registrationEMail", formData.email);
        localStorage.setItem("registrationPassword", formData.password);
        console.log("OTP verification response:", res.data);
  
        if (res.data.status === "success") {
          dispatch(setRegistrationData(formData));
          dispatch(setIsRegistration(true));
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
          navigate(routePath.OTP);
        } else {
          Toast.fire({
            icon: "error",
            title: res.data.message,
          });
        }
      } catch (error) {
        console.error("Failed to verify OTP:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to send OTP. Please try again.",
        });
      }
    } // No need for else here, validate handles error messaging
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
            <FormControlLabel value="School/Children" control={<CustomRadio />} label="School / Children" />
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
