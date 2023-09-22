import styled from "@emotion/styled";
import { FormControlLabel, css } from "@mui/material";

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

export const UserMessageWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;

  p {
    width: 550px;
    font-weight: bold;
    font-size: 0.75rem;
  }
`;

export const PufiFormControlLabel = styled(FormControlLabel)`
  background-color: var(--pufi-grey-light);
  max-width: 690px;
  padding: 12px;
  margin-bottom: 8px;
  margin-left: 0px;
  border-radius: 8px;
`;
