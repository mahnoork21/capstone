import React, { useState } from "react";
import { useRouter } from "next/router";
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
  addOrUpdateClinician,
} from "@/firebase/clincianRepo";
import AccordionCard from "@/shared/clinician/accordionCard";
import TOScomponent from "@/shared/clinician/TOS";

const steps = ["Personal Details", "Organizational Details", "TOS"];

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
  // console.log(errors);
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
  // console.log(errors);

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
  // console.log(errors);

  return (
    <>
      <React.Fragment>
        <TOScomponent></TOScomponent>

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
  const checkTosAndAddClinician = (data) => {
    return new Promise((resolve, reject) => {
      // Check if 'tos' is true
      if (data.tos) {
        // If true, resolve the Promise
        resolve(data);
      } else {
        // If false, reject the Promise
        reject("Terms of Service agreement not accepted");
      }
    });
  };
  const handleNext = (data) => {
    console.log(data);

    if (activeStep == steps.length - 1) {
      // fetch("https://jsonplaceholder.typicode.com/comments")
      //   .then((data) => {
      //     data.json();
      if (data.tos) {
        console.log("inside IF, LAST STEP", activeStep);

        const uid = createClinicianByEmail(data.email, data.password);
        console.log("data in LAST step, uid is generated now");
        console.log(uid, data.email, data.password);

        checkTosAndAddClinician(data)
          .then((data) => {
            addOrUpdateClinician(uid, data).then(() => {
              alert("cliniian added using addClinicianDb");
            });
          })
          .then((res) => {
            setOpen(true);
          })
          .catch((error) => {
            console.log("Error : ", error);
            setOpen(true);
          });
      } else {
        alert("Please accept Terms and Conditions to continue!");
      }
    } else {
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
        setOpen(true);
      } else {
        console.log("daata is complete at step := ", activeStep);

        console.log("inside else, NOT LAST STEP", activeStep);

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
                            {activeStep === 0 ? "Back to Login" : "Back"}
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
                    ></Snackbar>
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
            <AccordionCard></AccordionCard>
          </StyledBox>
        </StyledPaper>
      </StyledContainer>
    </>
  );
};
export default Registration;
