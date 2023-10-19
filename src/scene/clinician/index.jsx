import React from "react";
// import styled from "./styled";
// import Header from "@/shared/clinician/header/Header";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Typography,
  Container,
  Box,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Labels,
  StyledBox,
  StyledPaper,
  StyledTextfield,
  StyledHeading,
  FormBox,
  StyledButton,
  StyledTypo,
} from "./styled";

const LoginLanding = () => {
  return (
    <>
      {/* <Header></Header> */}
      <Container gap="10" justifyContent="space-around" fontFamily="Open Sans">
        {/* <StyledBox> */}
        <StyledPaper>
          <StyledHeading>Log in to your clinician account</StyledHeading>
          <FormBox>
            <form>
              <Labels>Email or Clinician id</Labels>
              <StyledTextfield />
              <Labels>Password</Labels>
              <StyledTextfield />
              <Labels align="right">
                <u>Forgot Password?</u>
              </Labels>
              <StyledButton href="#"> LOG IN</StyledButton>
              <Labels mt={3}>Don't have an account yet?</Labels>

              <StyledButton href="../registartion/index.jsx">
                {" "}
                CREATE NEW ACCOUNT
              </StyledButton>
            </form>
          </FormBox>
        </StyledPaper>

        <StyledPaper>
          <StyledTypo>
            Learn about the PUFI-2, how it was develped, and how it can be used.
          </StyledTypo>
          <Box>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowForwardIosIcon />}
                  id="panel1-header"
                  aria-controler="panel1-content"
                >
                  <Typography>
                    <b>What is PUFI-2 ?</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    The Prosthetic Upper Extremity Functional Index (PUFI) is a
                    child- and parent-report questionnaire administered by a
                    health care practitioner that evaluates real-world
                    prosthesis use in a range of bimanual daily activities in
                    children using prostheses. One main goal for the PUFI is to
                    measure change in status over time. The PUFI-2 is not a
                    medical device. The PUFI-2 is intended to only be used by
                    health care practitioners as part of their care practice.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowForwardIosIcon />}
                  id="panel2-header"
                  aria-controler="panel2-content"
                >
                  <Typography>
                    <b>Who is the PUFI-2 used for ?</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>text2</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowForwardIosIcon />}
                  id="panel3-header"
                  aria-controler="panel-content"
                >
                  <Typography>
                    <b>Whai is the assessment process?</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>text3</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowForwardIosIcon />}
                  id="panel4-header"
                  aria-controler="panel1-content"
                >
                  <Typography>
                    <b>When should the PUFI-2 be administered?</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>text4</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowForwardIosIcon />}
                  id="panel4-header"
                  aria-controler="panel1-content"
                >
                  <Typography>
                    <b>Background and Research Involvement</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>text4</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>
        </StyledPaper>
        {/* </StyledBox> */}
      </Container>
    </>
  );
};

export default LoginLanding;
