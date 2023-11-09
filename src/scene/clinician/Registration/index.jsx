import React, { useState } from "react";
import { useRouter } from "next/router";
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
  ColumnBox,
  RowBox,
  errorSnackbar,
} from "./styled";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  addClinicianDb,
  createClinicianByEmail,
} from "@/firebase/clincianRepo";

const steps = ["Personal Details", "Organizational Details", "TOS"];
// const user = {
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   organization,
//   clinicianId,
//   role,
// };
const handleCloseSnackbar = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  // setOpen(false);
};

const PersonalDetils = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <React.Fragment>
        <Box display={"flex"}>
          <ColumnBox>
            <RowBox>
              <Labels>First Name</Labels>
              <Controller
                control={control}
                name="firstName"
                rules={{
                  required: "first name is required",
                }}
                render={({ field }) => (
                  <StyledTextfield
                    id="firstName"
                    // value={user.firstName}
                    // onChange={data}
                    inputProps={{ "aria-label": "controlled" }}
                    {...field}
                  />
                )}
              />
            </RowBox>

            {errors.firstName && (
              <Snackbar
                open={open}
                autoHideDuration={3000}
                message={errors.firstName.message}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            )}

            <RowBox>
              <Labels>Email</Labels>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "email is required",
                }}
                render={({ field }) => (
                  <StyledTextfield
                    id="email"
                    // value={user.email}
                    {...field}
                  />
                )}
              />
            </RowBox>
            {errors.email && (
              <Snackbar
                open={open}
                autoHideDuration={2000}
                message={errors.email.message}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            )}

            <RowBox>
              <Labels>Password</Labels>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "password is required",
                }}
                render={({ field }) => (
                  <StyledTextfield
                    type="password"
                    id="password"
                    // value={user.password}
                    {...field}
                  />
                )}
              />
            </RowBox>
            {errors.password && (
              <Snackbar
                open={open}
                autoHideDuration={2000}
                message={errors.password.message}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            )}
            <RowBox>
              <Labels>Confirm Password</Labels>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "confirm password",
                }}
                render={({ field }) => (
                  <StyledTextfield
                    type="password"
                    id="confirmPassword"
                    // value={user.confirmpassword}
                    {...field}
                  />
                )}
              />
            </RowBox>
            {errors.confirmPassword && (
              <Snackbar
                open={open}
                autoHideDuration={2000}
                message={errors.confirmPassword.message}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            )}
          </ColumnBox>
          <ColumnBox>
            <RowBox>
              <Labels>Last Name</Labels>
              <Controller
                control={control}
                name="lastName"
                rules={{
                  required: "last name is required",
                }}
                render={({ field }) => (
                  <StyledTextfield
                    id="lastName"
                    // value={user.lastName}
                    {...field}
                  />
                )}
              />
            </RowBox>
            {errors.lastName && (
              <Snackbar
                open={open}
                autoHideDuration={2000}
                message={errors.lastName.message}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            )}
          </ColumnBox>
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
              required: "organization is required",
            }}
            render={({ field }) => (
              <StyledTextfield
                id="organization"
                // value={user.organization}
                {...field}
              />
            )}
          />{" "}
        </Box>
        {errors.organization && (
          <Snackbar
            open={open}
            autoHideDuration={2000}
            message={errors.organization.message}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        )}
        <Box display={"block"}>
          <Labels>Role</Labels>
          <Controller
            control={control}
            name="role"
            rules={{
              required: "role is required",
            }}
            render={({ field }) => (
              <StyledTextfield
                id="role"
                // value={user.role}
                {...field}
              />
            )}
          />
        </Box>
        {errors.role && (
          <Snackbar
            open={open}
            autoHideDuration={2000}
            message={errors.role.message}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        )}
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
              required: "agrree please",
            }}
            render={({ field }) => (
              <Checkbox
                sx={{ display: "inline-block" }}
                id="tos"
                onChange={handleChange}
                value={field.value ? true : false}
                inputProps={{ "aria-label": "controlled" }}
                {...field}
              />
            )}
          />
          I agree to abide by the Terms and Conditions and Privacy Policy.
        </Typography>
        {errors.tos && (
          <Snackbar
            open={open}
            autoHideDuration={2000}
            message={errors.tos.message}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        )}
        {/* {errors.tos && <p style={{ color: "red" }}>{errors.tos.message}</p>} */}
      </React.Fragment>
    </>
  );
};
function getStepContent(step) {
  const router = useRouter();
  switch (step) {
    case 0:
      console.log("inside personal details", step);
      return <PersonalDetils />;

    case 1:
      console.log("inside organization details", step);
      return <OrganizationDetails />;
    case 2:
      console.log("inside TOS details", step);
      return <TOS />;

    default:
      router.push("/clinician/login");
      return null;
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Registration = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = useState(false);
  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   organization: "",
  //   role: "",
  // });
  const { control, handleSubmit, errors } = useForm();

  // const data = (e) => {
  //   firstName = e.target.firstName;
  //   value = e.target.value;
  //   setUser({ ...user, [firstName]: value });
  // };
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",

      role: "",
    },
  });

  const handleNext = (data) => {
    console.log(data);

    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((data) => addClinicianDb(data))
        .then((res) => {
          // console.log(res);
          setOpen(true);
        })
        .catch((error) => {
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
        const uid = createClinicianByEmail(data.email, data.password);
        addClinicianDb(uid, data);

        // data.preventDefault();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   firstName,
          //   lastName,
          //   email,
          //   password,
          //   // organization,
          //   // role,
          // }),
        };

        setActiveStep(activeStep + 1);
        console.log(activeStep);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    console.log(activeStep);
    {
      activeStep === 0 ? (
        <Button color="inherit" href="/clinician/login" sx={{ mr: 1 }}>
          Back to Login
        </Button>
      ) : (
        <></>
      );
    }
  };

  return (
    <>
      <StyledContainer>
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
                    <form
                      onSubmit={methods.handleSubmit(handleNext)}
                      method="POST"
                    >
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
                      onClose={handleCloseSnackbar}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      message="you have successfully logged in"
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
                id="panel5-header"
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
