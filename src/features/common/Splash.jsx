import Logo from "../../assets/image/logo.svg";
import bgSVG from "../../assets/image/curve.svg"; 
import { Box, Typography } from "@mui/material";
const Splash = () => {
  return (
    <>
        <Box
        sx={{
          backgroundColor: "#E5F9FF",
          height: "100vh",
          width: "100%",
          position: "relative",
        }}
      >
        <Box pt={3} pl={3}>
          <Box src={Logo} height={120} width={120} alt="Logo"component="img" />
        </Box>

        <Box sx={{ position: "absolute", top: "10%", width: "100%" }}>
        <Box src={bgSVG} height={120} width={120} sx={{ width: "100%", height: "auto" }} alt="Logo"component="img" />
          
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontSize: "44px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            Survey App
          </Typography>
        </Box>
      </Box>  
    </>
  )
}

export default Splash

