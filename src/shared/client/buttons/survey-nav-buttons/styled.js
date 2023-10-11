import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledSurveyNavButton = styled(Button)`
  padding: 12px 32px;
  font-weight: bold;
  border-width: 4px;
  border-color: var(--pufi-green);
  border-radius: 12px;

  & div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & span {
    font-size: 1rem;
    line-height: 1.5;
  }

  &:hover {
    border-width: 4px;
  }
`;
