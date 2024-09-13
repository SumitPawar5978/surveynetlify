import React, { useState } from "react";
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { submitTestQuestion } from "../../utils/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";


const ExamPage = () => {
  const navigate=useNavigate()
  const questionCollection = useSelector((state) => state.reducer.questionCollection);
  const requestData = useSelector((state) => state.reducer.requestData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [answers, setAnswers] = useState([]); // To store all answers
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
let questions=questionCollection?.questionsResultDetail;
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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

  const submitAnswers = async (answerObject) => {
    try {
      setIsSubmitting(true);
      const response = await submitTestQuestion(answerObject);
      console.log("Submission Successful:", response.data);
      if (response.data.status === "success") {
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
      navigate(routePath.HOME)
    }else{
      Toast.fire({
        icon: "error",
        title: response.data.message,
      });
    }
      // Handle success, like showing a success message or navigating to a thank you page
    } catch (error) {
      console.error("Error submitting answers:", error);
      // Handle error, like showing an error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Calculate if the answer is correct
    const isCorrect = selectedValue === currentQuestion.ans ? 1 : 0;

    // Save the current answer in the required format
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question_id: currentQuestion.id,
        question_type: currentQuestion.type,
        user_ans: selectedValue,
        is_correct: isCorrect,
      },
    ]);

    // If it’s the last question, submit the answers
    if (currentQuestionIndex === questions.length - 1) {
      const answerObject = {
        result_id: requestData?.result_id, // You can replace this with the actual result ID
        submit_test_details: [
          ...answers, // All previous answers
          {
            question_id: currentQuestion.id,
            question_type: currentQuestion.type,
            user_ans: selectedValue,
            is_correct: isCorrect,
          },
        ],
      };

      // Call the API to submit the answers
      submitAnswers(answerObject);
    } else {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedValue(""); // Reset selected answer for next question
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box sx={{ backgroundColor: "#E5F9FF", height: "100vh", padding: "0px 20px" }}>
      <Box sx={{ padding: "12px", borderRadius: "5px", background: "#fff", marginBottom: "10px" }}>
        <Typography variant="h3" sx={{ fontWeight: "700", fontSize: "17px", color: "#222222CC" }}>
          Survey Code: <Box component="span" sx={{ color: "#F84D01" }}>  {requestData.surveyCode}</Box>
        </Typography>
      </Box>

      <Box sx={{ padding: "10px", borderRadius: "5px", background: "#fff", marginTop: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid red",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              marginRight: "10px",
            }}
          >
            <Typography fontSize={"16px"} color={"#70787A"}>
              {currentQuestionIndex + 1}
            </Typography>
          </Box>
          <Typography fontSize={"18px"} color={"#70787A"} fontWeight={"700"}>
            {currentQuestion?.question}
          </Typography>
        </Box>

        <RadioGroup value={selectedValue} onChange={handleChange}>
          {currentQuestion?.op_a && (
            <FormControlLabel value="A" control={<Radio />} label={currentQuestion?.op_a} />
          )}
          {currentQuestion?.op_b && (
            <FormControlLabel value="B" control={<Radio />} label={currentQuestion?.op_b} />
          )}
          {currentQuestion?.op_c && (
            <FormControlLabel value="C" control={<Radio />} label={currentQuestion?.op_c} />
          )}
          {currentQuestion?.op_d && (
            <FormControlLabel value="D" control={<Radio />} label={currentQuestion?.op_d} />
          )}
        </RadioGroup>

        <Button
          onClick={handleNextQuestion}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            width: "100%",
            fontSize: "16px",
            fontWeight: "700",
            textTransform: "uppercase",
            marginTop: "20px",
          }}
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </Button>

        {isSubmitting && <Typography>Submitting your answers...</Typography>}
      </Box>
    </Box>
  );
};

export default ExamPage;
