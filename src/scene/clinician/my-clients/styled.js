import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  FormLabel,
  InputBase,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

export const StyledBox4 = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const StyledBox5 = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const MyClientsHeadingTypography = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 8px 0;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    font-size: 1.5rem;
  }
`;

export const MainContentBox = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const ClientListCard = styled(Card)`
  display: inline-flex;
  min-height: 700px;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 220px;
  }
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

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 0 10px;
  margin-bottom: 0;
`;

export const StyledSearchBox = styled(Box)`
  display: flex;
  flex-grow: 1;
  width: 100%;
  justify-content: space-between;
  border-radius: 8px;
  background: var(--pufi-grey-light, #f2f2f2);
  margin-top: 8px;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 200px;
  }
`;

export const StyledSearchInputBase = styled(InputBase)`
  padding-left: 8px;
  flex-grow: 1;
`;

export const StyledList1 = styled(List)`
  padding-bottom: 0;
`;

export const SurveysBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 528px;
    padding: 0 0 0 12px;
  }
`;

export const ButtonsBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BackButton = styled(Button)`
  color: black;
  padding-left: 0;
`;

export const AddNewSurveyButton = styled(Button)`
  color: white;
  display: inline-flex;
  height: 40px;
  padding: 8px 16px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 2px solid var(--primary-blue, #1979be);
  background: var(--primary-blue, #1979be);
  font-size: 0.875rem;
  &:hover {
    color: var(--primary-blue, #1979be);
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    font-size: 1rem;
  }
`;

export const FilterSurveyButton = styled(Button)`
  border-radius: 6px;
  border: 2px solid var(--pufi-primary-blue, #1979be);

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 8px;
  }
`;

export const StyledBox2 = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  flex-grow: 1;
  align-content: flex-start;
  margin: 16px 0;
`;

export const StyledBox3 = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  align-items: center;
  padding: 0 12px;
`;

export const NumberOfSurveysTypography = styled(Typography)``;

export const AddClientButton = styled(Button)`
  color: var(--primary-contrast, #fff);
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #1979be;
  background: var(--pufi-primary-blue, #1979be);
  width: 110px;
  font-size: 0.875rem;

  &:hover {
    color: var(--primary-blue, #1979be);
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    width: 160px;
    font-size: 1.25rem;
    margin-top: 16px;
    border-radius: 12px;
  }
`;
