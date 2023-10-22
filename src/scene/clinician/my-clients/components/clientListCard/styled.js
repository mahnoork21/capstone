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
  display: inline-flex;
  min-height: 550px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0 0;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 220px;
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

export const StyledList1 = styled(List)`
  padding-bottom: 0;
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
    width: 200px;
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
  padding-top: 0;
  padding-left: 16px;
`;

export const NumberOfClientsTypography = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledButtonsBox2 = styled(Box)`
  display: flex;
  flex-direction: row;
`;
