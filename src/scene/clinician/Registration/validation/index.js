import { checkEmailisUsed } from "../../../../firebase/clincianRepo";

const validateEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const setValidation = async (data, activeStep) => {
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

    return "all fields are not complete";
  } else if (data.password.length < 6) {
    return "Check for length of your password";
  } else if (data.password !== data.confirmPassword) {
    return "Passwords do not match";
  } else if (!validateEmail(data.email)) {
    return "Please enter a valid email address";
  } else if (await checkEmailisUsed(data.email)) {
    return "An account already exists with this email address";
  } else {
    console.log("daata is complete at step := ", activeStep);

    console.log("inside else, NOT LAST STEP", activeStep);

    return "nextpage";
  }
};
