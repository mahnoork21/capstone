import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Snackbar,
  MuiAlert,
} from "@mui/material";
import {
  StyledPaper,
  StyledTypo,
  StepperBox,
  StyledBox,
  FormBox,
  Labels,
  StyledContainer,
  StyledTextfield,
} from "./styled";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";

const steps = ["Personal Details", "Organizational Details", "TOS"];

const PersonalDetils = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <React.Fragment>
        <Box display={"block"}>
          <Labels>First Name</Labels>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <StyledTextfield
                id="first-name"
                // error={Boolean(errors?.firstName)}
                // helperText={errors.firstName?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box display={"block"}>
          <Labels>Last Name</Labels>
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <StyledTextfield id="last-name" {...field} />
            )}
          />
        </Box>
        <Box display={"block"}>
          <Labels>Email</Labels>
          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
            }}
            render={({ field }) => <StyledTextfield id="email-id" {...field} />}
          />
        </Box>
        <Box display={"block"}>
          <Labels>Password</Labels>
          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <StyledTextfield type="password" id="pwd" {...field} />
            )}
          />
        </Box>
        <Box display={"block"}>
          <Labels>Confirm Password</Labels>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <StyledTextfield type="password" id="cpwd" {...field} />
            )}
          />
        </Box>
      </React.Fragment>
    </>
  );
};

const OrganizationDetails = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <React.Fragment>
        <Box display={"block"}>
          <Labels>Organization Name</Labels>
          <Controller
            control={control}
            name="organization"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <StyledTextfield id="organization" {...field} />
            )}
          />{" "}
        </Box>

        <Box display={"block"}>
          <Labels>Clinician Id</Labels>
          <Controller
            control={control}
            name="clinicianId"
            rules={{
              required: true,
            }}
            render={({ field }) => <StyledTextfield id="cid" {...field} />}
          />
        </Box>
        <Box display={"block"}>
          <Labels>Role</Labels>
          <Controller
            control={control}
            name="role"
            rules={{
              required: true,
            }}
            render={({ field }) => <StyledTextfield id="role" {...field} />}
          />
        </Box>
      </React.Fragment>
    </>
  );
};
const TOS = () => {
  const [unchecked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <React.Fragment>
        <Typography variant="h4" marginBottom={2}>
          <b>Terms of Service and Privacy Policy</b>
        </Typography>
        <Typography marginBottom={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero
          enim sed faucibus turpis. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames. Eu scelerisque felis imperdiet
          proin fermentum leo vel orci porta. Euismod nisi porta lorem mollis
          aliquam ut. Habitant morbi tristique senectus et. Risus sed vulputate
          odio ut enim. Accumsan lacus vel facilisis volutpat est velit. Neque
          aliquam vestibulum morbi blandit cursus. Id faucibus nisl tincidunt
          eget nullam.{" "}
        </Typography>
        <Typography marginBottom={2}>
          Et netus et malesuada fames ac turpis egestas sed. Arcu vitae
          elementum curabitur vitae. Tellus orci ac auctor augue mauris augue
          neque gravida. Duis at tellus at urna condimentum mattis pellentesque
          id nibh. Massa ultricies mi quis hendrerit dolor. Aliquet nibh
          praesent tristique magna sit amet. Massa sed elementum tempus egestas
          sed. Ut diam quam nulla porttitor massa id neque aliquam vestibulum.
          Eget magna fermentum iaculis eu. Tellus rutrum tellus pellentesque eu
          tincidunt tortor aliquam nulla facilisi. Scelerisque fermentum dui
          faucibus in ornare. Dolor magna eget est lorem ipsum dolor sit.{" "}
        </Typography>

        <Typography display={"inline-block"}>
          <Controller
            control={control}
            checked={unchecked}
            name="tos"
            rules={{
              required: "agree please",
            }}
            render={({ field }) => (
              <Checkbox
                sx={{ display: "inline-block" }}
                id="tos"
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                {...field}
              />
            )}
          />
          I agree to abide by the Terms and Conditions and Privacy Policy.
        </Typography>
        {errors.tos && <p style={{ color: "red" }}>{errors.tos.message}</p>}
      </React.Fragment>
    </>
  );
};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDetils />;

    case 1:
      return <OrganizationDetails />;
    case 2:
      return <TOS />;

    default:
      return "unknown step";
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Registration = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, formState } = useForm();

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",
      clinicianId: "",
      role: "",
    },
  });
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setOpen(true);
        })
        .catch((error) => {
          // alert(`Error! ${error}`);
          console.log("Error : ", error);
          setOpen(true);
        });
    } else {
      if (
        !data.firstName ||
        !data.lastName ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        console.log("data is not complete");
        console.log(
          data.firstName,
          data.lastName,
          data.email,
          data.password,
          data.confirmPassword
        );
        setOpen(true);
      } else {
        console.log("daata is complete");
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <StyledContainer justifyContent="space-around">
        <StyledPaper>
          <StyledTypo>Create a new Clinician account</StyledTypo>

          {activeStep === steps.length ? (
            <>
              <StepperBox>
                <Typography variant="h3" align="center">
                  Thank You
                </Typography>
              </StepperBox>
            </>
          ) : (
            <>
              <FormProvider {...methods}>
                <StepperBox>
                  <Stepper activeStep={activeStep} sx={{ m: 1 }}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      return (
                        <Step key={index} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <StyledBox>
                    <form onSubmit={methods.handleSubmit(handleNext)}>
                      <FormBox>
                        {getStepContent(activeStep)}

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            pt: 2,
                            justifyContent: "left",
                          }}
                        >
                          <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </Button>

                          <Button
                            variant="contained"
                            // onClick={handleNext}
                            type="submit"
                          >
                            {activeStep === steps.length - 1
                              ? "SIGN UP"
                              : "Next"}
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                        </Box>
                      </FormBox>
                    </form>
                    <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                    >
                      {/* <Alert onClose={handleClose} severity="success">
                        {" "}
                        Success! Data saved.
                      </Alert> */}
                    </Snackbar>
                  </StyledBox>
                </StepperBox>
              </FormProvider>
            </>
          )}
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
                  {" "}
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
                  {" "}
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

        {/* </Box> */}
      </StyledContainer>
    </>
  );
};
export default Registration;
