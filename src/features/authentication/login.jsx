import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Logo from "../../assets/image/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";
import { loginAxios } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setIsHead, setUserDetails } from "../../app/reducer";
import Swal from "sweetalert2";

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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

    // Validate email or mobile number
    if (!emailOrMobile) {
      tempErrors.emailOrMobile = "Email or mobile number is required.";
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailOrMobile) &&
      !/^\d{10}$/.test(emailOrMobile)
    ) {
      tempErrors.emailOrMobile =
        "Enter a valid email address or 10-digit mobile number.";
    }

    // Validate password
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(tempErrors);

    // Return true if no errors
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      await loginAxios({
        username: emailOrMobile,
        password: password,
      })
        .then(async (res) => {
          if (res.data.status === "success") {
            await localStorage.setItem(
              "userDetails",
              JSON.stringify(res.data.authorisation)
            );
            dispatch(setUserDetails(res?.data?.user));
            dispatch(setIsHead(res.data.isHead))
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            navigate(routePath.HOME);
          } else {
            alert()
            Toast.fire({
              icon: "error",
              title: "Login Failed",
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
  };

  return (
    <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", padding: "35px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ height: "90px", width: "87px" }}
        />
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
        Login
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          sx={{ width: "100%" }}
          id="email-or-mobile"
          label="Enter Email-Id Or Mobile Number"
          variant="outlined"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          error={Boolean(errors.emailOrMobile)}
          helperText={errors.emailOrMobile}
        />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          sx={{ width: "100%" }}
          id="password"
          label="Enter Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{ transform: "scale(0.75)", padding: "10px 0px 10px 10px" }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                color: "#22222299",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Remember Me
            </Typography>
          }
          sx={{ flexShrink: 0 }}
        />
        <Link
          to={routePath.FORGOTPASSWORD}
          style={{
            color: "#22222299",
            fontSize: "14px",
            textDecoration: "underline",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot Password?
        </Link>
      </Box>
      <Box
        sx={{
          marginTop: "25px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#22222299",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Not Registered Yet?{" "}
        </Typography>
        <Link
          style={{
            color: "#EE2320",
            fontSize: "14px",
            textDecoration: "underline",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          to={"/registration"}
        >
          Register Now
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
