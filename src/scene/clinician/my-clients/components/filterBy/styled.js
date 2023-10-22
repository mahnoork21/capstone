import styled from "@emotion/styled";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

export const StyledDrawer = styled(Drawer)``;

export const StyledBox1 = styled(Box)`
  width: 280px;
`;

export const StyledBox2 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  background: var(--pufi-primary-light, #53bb50);
  color: var(--primary-contrast, #fff);
  font-size: 1.25rem;
  font-weight: 600;
`;

export const StyledBox3 = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const StyledList1 = styled(List)``;

export const StyledTypography1 = styled(Typography)`
  font-weight: 600;
`;

export const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: flex-start;
  padding-left: 0;
`;

export const StyledListItemButton = styled(ListItemButton)`
  padding: 0;
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  padding: 0 0 0 16px;
`;

export const StyledListItemText = styled(ListItemText)`
  font-weight: 400;
  font-family: Roboto;
  padding: 0;
`;

export const StyledTextField = styled(TextField)`
  border-radius: 8px;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--pufi-grey-dark, #a8a8a8);
  margin: 8px 0;
  flex-grow: 1;
`;
