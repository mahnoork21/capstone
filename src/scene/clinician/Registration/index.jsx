import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Typography,
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  StyledPaper,
  StyledTypo,
  StepperBox,
  FormBox,
  Labels,
  StyledTextfield,
} from "./styled";

const steps = ["Personal Details", "Organizational Details", "TOS"];

const Registration = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Container gap="10" justifyContent="space-around" fontFamily="Open Sans">
        <StyledPaper>
          <StyledTypo>Create a new Clinician account</StyledTypo>

          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //     <Typography variant="caption">Optional</Typography>
              //   );
              // }
              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <StepperBox>
            {activeStep === 2 ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "left",
                  }}
                >
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    Back To Login
                  </Button>
                  <Button variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <FormBox>
                  <form>
                    <Box display={"inline-block"}>
                      <Labels>First Name</Labels>
                      <StyledTextfield />
                    </Box>
                    <Box display={"inline-block"}>
                      <Labels>Last Name</Labels>
                      <StyledTextfield />
                    </Box>
                    <Box display={"block"}>
                      <Labels>Email</Labels>
                      <StyledTextfield />
                    </Box>
                    <Box display={"block"}>
                      <Labels>Password</Labels>
                      <StyledTextfield />
                    </Box>
                    <Box display={"block"}>
                      <Labels>Confirm Password</Labels>
                      <StyledTextfield />
                    </Box>
                  </form>
                </FormBox>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    Back To Login
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "left",
                  }}
                >
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    Back To Login
                  </Button>
                  <Button variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <></>
            )}
          </StepperBox>
        </StyledPaper>

        <StyledPaper>
          <StyledTypo>
            Learn about the PUFI-2, how it was develped, and how it can be used.
          </StyledTypo>
          <Box>
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
          </Box>
        </StyledPaper>

        {/* </Box> */}
      </Container>
    </>
  );
};
export default Registration;
