import styled from "@emotion/styled";
import { ListItemButton, Typography } from "@mui/material";

export const StyledClientIdTypography = styled(Typography)`
  font-weight: 700;
`;

export const StyledClientAddDateTypography = styled(Typography)`
  font-size: 0.625rem;
  font-weight: 400;
`;

export const StyledListItemButton = styled(ListItemButton)`
  display: flex;
  width: 280px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  margin: 8px 0 0 0;

  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: var(--primary-blue, #1979be);

    p {
      color: var(--primary-contrast, #fff);
    }
  }
`;
