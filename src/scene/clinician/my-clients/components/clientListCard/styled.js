import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  InputBase,
  List,
  Typography,
} from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

export const StyledClientListCard = styled(Card)`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  align-content: stretch;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0 0;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    min-height: 672px;
    width: 280px;
    background: #fff;
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-bottom: 0;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 8px 8px 0 10px;
  }
`;

export const StyledClientsList = styled(List)`
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const StyledSearchBox = styled(Box)`
  display: flex;
  flex-grow: 1;
  width: 100%;
  justify-content: space-between;
  border-radius: 8px;
  background: #fff;
  margin-top: 8px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 260px;
    background: var(--pufi-grey-light, #f2f2f2);
  }
`;

export const StyledSearchInputBase = styled(InputBase)`
  padding-left: 8px;
  flex-grow: 1;
`;

export const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 4px 0 8px 16px;
  background-color: var(--primary-contrast, #fff);
  border-radius: 8px;
`;

export const NumberOfClientsTypography = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledForwardAndBackwardButtonsBox = styled(Box)`
  display: flex;
  flex-direction: row;
`;
