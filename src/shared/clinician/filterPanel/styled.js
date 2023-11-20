import styled from "@emotion/styled";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const StyledDrawer = styled(Drawer)``;

export const MainContainerBox = styled(Box)`
  width: 280px;
`;

export const HeadingBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  background: var(--pufi-primary-light, #53bb50);
  color: var(--primary-contrast, #fff);
  font-size: 1.25rem;
  font-weight: 600;
`;

export const FilterOptionsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const StyledFiltersList = styled(List)``;

export const StyledFiltersHeadingTypography = styled(Typography)`
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

export const StyledDatePicker = styled(DatePicker)`
  margin: 5px 0px;
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;
