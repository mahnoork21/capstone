import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledPrimaryClientButton = styled(Button)`
  color: "white";
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  background-color: var(--primary-green-light);

  @media screen and (min-width: ${breakpoint.desktop}) {
    padding: 16px 36px;
  }
`;
