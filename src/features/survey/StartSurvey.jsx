import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";
import { getAllocatedTestToHead } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setSelectedHeadCode } from "../../app/reducer";

const StartSurvey = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allocatedTest, setAllocatedTest] = useState([]);

  const fetchTest = async () => {
    try {
      let res = await getAllocatedTestToHead();
      setAllocatedTest(res.data.testDetails);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  console.log(allocatedTest, "allocatedTest");
  useEffect(() => {
    fetchTest();
  }, []);

  const handleStartTest = async (head_code) => {
    if (head_code) {
      dispatch(setSelectedHeadCode(head_code));
      navigate(routePath.TESTREQUEST);
    } else {
      alert("head code not found");
    }
  };

 
  return (
    <>
      <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh" }}>
        <Box sx={{ padding: "10px 20px" }}>
          <Divider
            sx={{
              backgroundColor: "#F84D01",
              height: "2px",
              borderRadius: "4px",
            }}
          />
        </Box>

        <Box sx={{ padding: "10px 20px" }}>
          <Box>
            {allocatedTest.map((item, index) => (
              <Box
                key={index}
                sx={{
                  my: 2,
                  borderRadius: "5px",
                  background: "rgba(255, 255, 255, 1)",
                }}
              >
                <Box p={1}>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "rgba(34, 34, 34, 0.8)",
                      }}
                    >
                      Survey Title :{" "}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#F84D01",
                        pl: "3px",
                      }}
                    >
                      {item.survey_title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "rgba(34, 34, 34, 0.8)",
                      }}
                    >
                      Survey Code :{" "}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#F84D01",
                        pl: "3px",
                      }}
                    >
                      {" "}
                      {item.survey_code}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "rgba(34, 34, 34, 0.8)",
                      }}
                    >
                      Location :{" "}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#F84D01",
                        pl: "3px",
                      }}
                    >
                      {item.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "rgba(34, 34, 34, 0.8)",
                      }}
                    >
                      Date :{" "}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#F84D01",
                        pl: "3px",
                      }}
                    >
                      {item.test_date}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    onClick={() => handleStartTest(item.head_code)}
                    variant="contained"
                    sx={{
                      width: "100%",
                      fontSize: "16px",
                      fontWeight: "700",
                      borderRadius: "0px 0px 5px 5px",
                    }}
                  >
                    START
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StartSurvey;
