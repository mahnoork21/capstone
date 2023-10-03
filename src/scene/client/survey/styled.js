import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Stepper, TextField, css } from "@mui/material";

export const SurveyContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;

  li {
    max-width: 550px;
    list-style-type: none;
    padding: 12px;
  }

  .do-message + div > span {
    height: 12px;
    min-height: 12px;
  }

  .do-message .MuiStepLabel-label {
    width: 550px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  ${(props) =>
    props.isDoMessageVisible
      ? css`
          .do + div > span {
            height: 12px;
            min-height: 12px;
          }
        `
      : ``}

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 24px;
  }
`;

export const StyledStepper = styled(Stepper)`
  & .MuiStepLabel-label.Mui-active {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const StyledTextField = styled(TextField)`
  width: calc(100% - 40px);
  border-radius: 12px;
  scroll-margin-top: 300px;

  @media screen and (min-width: ${breakpoint.desktop}) {
    width: 680px;
  }
`;

export const BodyPartInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;

  & > div:last-child {
    flex: 1;
  }
`;
