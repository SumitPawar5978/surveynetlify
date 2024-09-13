import React from "react";
import Logo from "../../assets/image/logo.svg";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";
import { useDispatch } from "react-redux";
import { setSelectedLanguage } from "../../app/reducer";
import PwaInstallPopup from "../PwaInstallPopup";

const Language = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (language) => {
    dispatch(setSelectedLanguage(language));
    navigate(routePath.LOGIN);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "accent.main",
          height: "100vh",
          padding: "35px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "700",
            display: "flex",
            justifyContent: "center",
            backgroundImage: "linear-gradient(90deg, #FB4C02 0%, #36B54A 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Survey App
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          {/* <img src={Logo} alt="Logo" /> */}
          <Box
            component="img"
            sx={{
              width: 135,
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="logo"
            src={Logo}
          />
        </Box>
        <Typography
          mt={4}
          sx={{
            fontSize: "16px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Select your test language / आपली चाचणी भाषा निवडा
        </Typography>
        <Box sx={{ paddingBlock: "20px" }}>
          <Button
            onClick={() => handleSubmit("eng")}
            variant="contained"
            sx={{ width: "100%", backgroundColor: "primary.main" }}
          >
            English
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => handleSubmit("mar")}
            variant="contained"
            sx={{ width: "100%", backgroundColor: "secondary.main" }}
          >
            मराठी
          </Button>
        </Box>
        <Box mt={4}>
          <PwaInstallPopup /> 
        </Box>
      </Box>
    </>
  );
};

export default Language;
