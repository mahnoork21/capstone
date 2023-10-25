import React from "react";
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
  StyledContainer,
  StyledPaper,
  StyledTextfield,
  StyledHeading,
  StyledBox,
  FormBox,
  StyledButton,
  StyledTypo,
} from "./styled";

const LoginLanding = () => {
  return (
    <>
      <StyledContainer justifyContent="space-around">
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
              <Labels>Don't have an account yet?</Labels>
              <StyledButton href="/clinician/register">
                CREATE NEW ACCOUNT
              </StyledButton>
              {/* <StyledButton href="#"> CREATE NEW ACCOUNT</StyledButton> */}
            </form>
          </FormBox>
        </StyledPaper>

        <StyledPaper>
          <StyledTypo>
            Learn about the PUFI-2, how it was develped, and how it can be used.
          </StyledTypo>
          <StyledBox>
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
                  health care practitioner that evaluates real-world prosthesis
                  use in a range of bimanual daily activities in children using
                  prostheses. One main goal for the PUFI is to measure change in
                  status over time. The PUFI-2 is not a medical device. The
                  PUFI-2 is intended to only be used by health care
                  practitioners as part of their care practice.
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
                <Typography>
                  The PUFI-2 is used for children with upper limb prosthesis.
                  There are two versions: The young child version - ages 3 to 6
                  years The older child version - ages 7 and up The assessment
                  can be taken by the child and/or their parent/caregiver.
                </Typography>
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
                <Typography>
                  After creating an account, health care practitioner's request
                  the completion of the PUFI-2 via email, and children and/or
                  parents complete the assessment on their own. Once complete,
                  health care practitioner's can view raw scores and summary
                  charts for use either in an associated research project or in
                  clinical use for sharing and discussing the results with the
                  child/parent and using within the child's clinical record.
                </Typography>
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
                <Typography>
                  Reasons for completing the PUFI-2 questionnaire may include,
                  but are not limited to: First time prosthetic user After
                  client receives new prosthetic device(s) or any
                  changes/adjustments to their prosthetic device(s) or treatment
                  plan Monitoring prosthetic and functional needs over time
                  (e.g. 3 month, 6 months, 12 months check-in). Each
                  clinic/health care practitioner will determine when to
                  re-administer the PUFI-2 based on their client's needs and
                  practice setting.
                </Typography>
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
                <Typography>
                  The PUFI was created and validated over 25 years ago at
                  Holland Bloorview Kids Rehab Hospital by Dr. Virginia Wright
                  and her team. The PUFI has since been updated with co-creation
                  involvement by children and clinicians. Publications: Wright
                  FV, Hubbard S, Jutai J, Naumann S. The Prosthetic Upper
                  Extremity Functional Index: development and reliability
                  testing of a new functional status questionnaire for children
                  who use upper extremity prostheses.
                  https://pubmed.ncbi.nlm.nih.gov/11382260/ Wright FV, Hubbard
                  S, Naumann S, Jutai J. Evaluation of the validity of the
                  prosthetic upper extremity functional index for children.
                  https://pubmed.ncbi.nlm.nih.gov/12690590/
                </Typography>
              </AccordionDetails>
            </Accordion>
          </StyledBox>
        </StyledPaper>
      </StyledContainer>
    </>
  );
};

export default LoginLanding;
