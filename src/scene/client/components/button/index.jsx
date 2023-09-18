import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const StyledButton = styled(Button)`
  color: ${(props) => (props.primary ? "white" : "var(--primary-blue)")};
  border-color: ${(props) => (props.primary ? "none" : "var(--primary-blue)")};
  font-weight: bolder;
  padding: 16px 36px;
  border-radius: 12px;
  border-width: 2px;
  font-size: 16px;
  width: max-content;
  background-color: ${(props) =>
    props.primary ? "var(--pufi-primary-light)" : "white"};

  &:hover {
    border-width: 2px; /* Set the desired border-width on hover */
  }
`;
