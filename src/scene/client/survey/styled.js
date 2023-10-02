import styled from "@emotion/styled";
import { FormControlLabel, Stepper, TextField, css } from "@mui/material";

export const SurveyContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;

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
`;

export const PufiFormControlLabel = styled(FormControlLabel)`
  background-color: var(--pufi-grey-light);
  max-width: 680px;
  padding: 10px;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 8px;
`;

export const StyledStepper = styled(Stepper)`
  & .MuiStepLabel-label.Mui-active {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const StyledTextField = styled(TextField)`
  width: 680px;
  border-radius: 12px;
  scroll-margin-top: 300px;
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
