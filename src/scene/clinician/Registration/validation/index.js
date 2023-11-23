import { checkEmailisUsed } from "../../../../firebase/clincianRepo";

const validateEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const setValidation = (data, activeStep) => {
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
  } else if (data.password.length < 6) {
    alert("Check for length of your password", data.password.length);
    return;
  } else if (data.password !== data.confirmPassword) {
    alert("Password and Confirm Password must match");
    return;
  } else if (!validateEmail(data.email)) {
    alert("Please enter a valid email address");
    return;
  } else if (checkEmailisUsed(data.email)) {
    //alert("This Email has already been used!");
    return;
  } else {
    console.log("daata is complete at step := ", activeStep);

    console.log("inside else, NOT LAST STEP", activeStep);

    return true;
  }
};
