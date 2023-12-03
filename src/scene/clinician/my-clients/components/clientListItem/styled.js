import styled from "@emotion/styled";
import { ListItemButton, Typography } from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

export const StyledClientIdTypography = styled(Typography)`
  font-weight: 700;
`;

export const StyledClientAddDateTypography = styled(Typography)`
  font-size: 0.625rem;
  font-weight: 400;
`;

export const StyledListItemButton = styled(ListItemButton)`
  display: flex;
  width: 100%;
  padding: 8px;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  border-radius: 8px;
  margin: 8px 0 0 0;
  background-color: #fff;

  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: var(--primary-blue, #1979be);

    p {
      color: var(--primary-contrast, #fff);
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 260px;
  }
`;
