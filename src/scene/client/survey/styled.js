import styled from "@emotion/styled";
import { FormControlLabel } from "@mui/material";

export const SurveyContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;

  li {
    max-width: 550px;
    list-style-type: none;
    padding: 12px;
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
