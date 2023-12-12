import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const StyledTypography = styled(Typography)`
  @media only screen and (max-width: ${breakpoint.desktop}) {
    font-size: 0.875rem;
    & b {
      font-size: 0.875rem;
    }
  }
`;
export const StyledList = styled("li")`
  margin-left: 0.875rem;
`;
