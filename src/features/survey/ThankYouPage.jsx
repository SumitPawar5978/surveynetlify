import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Pray from "../../assets/image/Pray.png";

const ThankYouPage = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh" }}>
       

        <Box sx={{ padding: "0px 20px" }}>
          <Box
            sx={{
              padding: "12px",
              borderRadius: "5px",
              background: "rgba(255, 255, 255, 1)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "700",
                    fontSize: "17px",
                    color: "#222222CC",
                  }}
                >
                  Survey Code :{" "}
                  <Box
                    component="div"
                    sx={{ display: "inline", color: "#F84D01" }}
                  >
                    {" "}
                    123 456 456
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: "0px 20px", marginTop: "50px" }}>
          <Box
            sx={{
              padding: "10px",
              borderRadius: "5px",
              background: "rgba(255, 255, 255, 1)",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Box component="img"
                src={Pray}
                alt="Logo"
                style={{ height: "108px", width: "108px", marginRight: "11px" }}
              />
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "700", color: "#70787A" }}
              >
                Thank you for taking the time to complete our survey. Your
                responses will help us to improve our programs and services.
              </Typography>
            </Box>

            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                Go Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Box> 
    </>
  );
};

export default ThankYouPage;
