import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  Snackbar,
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
  ErrorMessage,
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
import AccordionCard from "@/shared/clinician/accordionCard";
import TOScomponent from "@/shared/clinician/TOS";
import { setValidation } from "./validation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const steps = ["Personal Details", "Organizational Details", "TOS"];
// const [snackbarMessage, setSnackbarMessage] = useState("");
// let snackbarMessage = "meaasge";
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
                    inputProps={{ "aria-label": "controlled" }}
                    {...field}
                  />
                )}
              />
            </RowBox>

            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
            <RowBox>
              <Labels>Last Name</Labels>
              <Controller
                control={control}
                name="lastName"
                rules={{
                  required: "last name is required",
                }}
                render={({ field }) => (
                  <StyledTextfield id="lastName" {...field} />
                )}
              />
            </RowBox>
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
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
                  <StyledTextfield id="email" {...field} />
                )}
              />
            </RowBox>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
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
                  <StyledTextfield type="password" id="password" {...field} />
                )}
              />
              <Typography sx={{ fontSize: "12px", color: "blue" }}>
                Password length must be at least 6 characters.
              </Typography>
            </RowBox>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
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
                    {...field}
                  />
                )}
              />
            </RowBox>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
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
              <StyledTextfield id="organization" {...field} />
            )}
          />{" "}
        </Box>
        {errors.organization && (
          <ErrorMessage>{errors.organization.message}</ErrorMessage>
        )}
        <Box display={"block"}>
          <Labels>Role</Labels>
          <Controller
            control={control}
            name="role"
            rules={{
              required: "role is required",
            }}
            render={({ field }) => <StyledTextfield id="role" {...field} />}
          />
        </Box>
        {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
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
              required:
                "Please agree to the Terms of Service in order to create an account",
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
        {errors.tos && <ErrorMessage>{errors.tos.message}</ErrorMessage>}
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
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Registration = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
  const handleNext = async (data) => {
    console.log(data);

    if (activeStep == steps.length - 1) {
      if (data.tos) {
        console.log("inside IF, LAST STEP", activeStep);

        const uid = await createClinicianByEmail(data.email, data.password);
        console.log("data in LAST step, uid is generated now");
        console.log(uid, data.email, data.password);

        checkTosAndAddClinician(data)
          .then((data) => {
            addClinicianDb(uid, data).then(() => {
              console.log("cliniian added using addClinicianDb");
              setMessage("clinicain added");
            });
          })
          .then(() => {
            setOpen(true);

            router.push("/clinician/login");
          })
          .catch((error) => {
            console.log("Error : ", error);
            setOpen(true);
          });
      } else {
        <Snackbar
          open={open}
          autoHideDuration={2000}
          message="Please agree to the Terms of Service in order to create an account"
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />;
      }
    } else {
      const validationMessage = await setValidation(data, activeStep);

      if (validationMessage === "nextpage") {
        setActiveStep(activeStep + 1);
      } else {
        setMessage(validationMessage);
        setOpen(true);
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
                    {/* <Snackbar
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleCloseSnackbar}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      message={"Successfully registered"}
                    /> */}
                    <Snackbar
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={message}
                      action={
                        // <MuiAlert onClose={handleClose} severity="warning">
                        //   {message}
                        // </MuiAlert>
                        <React.Fragment>
                          <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </React.Fragment>
                      }
                    />
                  </StyledBox>
                </StepperBox>
              </FormProvider>
            </>
          )}
        </StyledPaper>
        <StyledPaper>
          <StyledTypo>
            Learn about the PUFI-2, how it was developed, and how it can be used.
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
