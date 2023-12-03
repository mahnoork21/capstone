import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledSecondayClientButton = styled(Button)`
  color: var(--primary-blue);
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  border: 2px solid var(--primary-blue);

  &:hover {
    color: var(--primary-blue);
    border: 2px solid var(--primary-blue);
  }

  @media screen and (min-width: ${breakpoint.desktop}) {
    padding: 16px 36px;
  }
`;
