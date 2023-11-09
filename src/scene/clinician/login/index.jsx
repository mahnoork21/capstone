import React, { useState } from "react";
import AccordionCard from "../../../shared/clinician/accordionCard";
import {
  Labels,
  StyledContainer,
  StyledPaper,
  StyledTextfield,
  StyledHeading,
  StyledBox,
  FormBox,
  StyledButton,
  StyledTypo,
} from "./styled";
import MainContainer from "@/shared/components/main-container";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const LoginLanding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Regular expression for email validation

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(emailPattern.test(newEmail));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
    } else if (!isValidEmail) {
      setSnackbarMessage("Invalid email address.");
      setOpenSnackbar(true);
    } else {
      // submit form here...
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <MainContainer>
      <StyledContainer>
        <StyledPaper>
          <StyledHeading>Log in to your clinician account</StyledHeading>
          <FormBox>
            <form onSubmit={handleSubmit}>
              <Labels>Email or Clinician id</Labels>
              <StyledTextfield value={email} onChange={handleEmailChange} />
              <Labels>Password</Labels>
              <StyledTextfield
                value={password}
                type="password"
                onChange={handlePasswordChange}
              />
              <Labels align="right" href="#">
                <u>Forgot Password?</u>
              </Labels>
              <StyledButton type="submit"> LOG IN</StyledButton>
              <Labels>Don't have an account yet?</Labels>
              {/* <StyledButton href="/clinician/register"></StyledButton> */}
              <StyledButton href="/clinician/register">
                {" "}
                CREATE NEW ACCOUNT
              </StyledButton>
            </form>
          </FormBox>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert onClose={handleCloseSnackbar} severity="error">
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </StyledPaper>

        <StyledPaper>
          <StyledTypo>
            Learn about the PUFI-2, how it was develped, and how it can be used.
          </StyledTypo>
          <StyledBox>
            <AccordionCard></AccordionCard>
          </StyledBox>
        </StyledPaper>
      </StyledContainer>
    </MainContainer>
  );
};

export default LoginLanding;
