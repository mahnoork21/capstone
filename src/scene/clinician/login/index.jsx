import React, { useState } from "react";
import { useRouter } from "next/router";
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
import { signinClinicianByEmail } from "../../../firebase/clincianRepo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "next/link";

const LoginLanding = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [login, setLogin] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Regular expression for email validation

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setIsValidEmail(emailPattern.test(newEmail));
    setEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
    } else if (!isValidEmail) {
      setSnackbarMessage("Invalid email address.");
      setOpenSnackbar(true);
    } else {
      const response = await signinClinicianByEmail(email, password);

      if (response?.user?.uid) {
        localStorage.setItem("orgId", "oZqnljuEU4b3jZtfHM9v");
        localStorage.setItem("clinicianId", response?.user?.uid);

        setLogin(true);
        setSnackbarMessage("Login Successful!");
        setOpenSnackbar(true);

        router.push("/clinician/dashboard");
      } else {
        setLogin(false);
        setSnackbarMessage("Email or Password isinvalid");
        setOpenSnackbar(true);
      }
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleForgotPassword = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
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
                <u onClick={handleForgotPassword}>Forgot Password?</u>
              </Labels>
              <Snackbar
                open={openSnack}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
              >
                <MuiAlert
                  elevation={6}
                  // variant="filled"
                  onClose={handleCloseSnack}
                  severity="info"
                >
                  Please connect with the research staff to reset your password
                </MuiAlert>
              </Snackbar>
              <StyledButton type="submit"> LOG IN</StyledButton>
              <Labels>{"Don't have an account yet?"}</Labels>
              <Link href="/clinician/register">
                {" "}
                <StyledButton> CREATE NEW ACCOUNT</StyledButton>
              </Link>
            </form>
          </FormBox>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            {login == true ? (
              <MuiAlert onClose={handleCloseSnackbar} severity="success">
                {snackbarMessage}
              </MuiAlert>
            ) : (
              <MuiAlert onClose={handleCloseSnackbar} severity="error">
                {snackbarMessage}
              </MuiAlert>
            )}
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
