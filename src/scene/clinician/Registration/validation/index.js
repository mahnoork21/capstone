import { checkEmailisUsed } from "../../../../firebase/clincianRepo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const validateEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const setValidation = (data, activeStep) => {
  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password ||
    !data.confirmPassword
  ) {
    console.log("data is not complete at step := ", activeStep);
    console.log(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.confirmPassword
    );

    return "all fields are not complete";
  } else if (data.password.length < 6) {
    return "Check for length of your password";
  } else if (data.password !== data.confirmPassword) {
    return "Password and Confirm Password must match";
  } else if (!validateEmail(data.email)) {
    return "Please enter a valid email address";
  } else if (checkEmailisUsed(data.email)) {
    return "This Email has already been used!";
  } else {
    console.log("daata is complete at step := ", activeStep);

    console.log("inside else, NOT LAST STEP", activeStep);

    return "nextpage";
  }
};
