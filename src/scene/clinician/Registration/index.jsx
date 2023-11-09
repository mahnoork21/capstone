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
import AccordionCard from "@/shared/clinician/accordionCard";

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
        .then((data) => {
          data.json();
          console.log("inside IF, when it's not last step", activeStep);
        })
        // .then((data) => addClinicianDb(data))
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
        fetch("https://jsonplaceholder.typicode.com/comments").then((data) =>
          addClinicianDb(data)
        );
        console.log("inside else where uid generates", activeStep);
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
            <AccordionCard></AccordionCard>
          </StyledBox>
        </StyledPaper>

        {/* </Box> */}
      </StyledContainer>
    </>
  );
};
export default Registration;
