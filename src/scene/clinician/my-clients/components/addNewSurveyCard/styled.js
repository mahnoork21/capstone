import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  FormLabel,
  Typography,
} from "@mui/material";

import { breakpoint } from "@/styles/breakpoints";

export const StyledMainCard = styled(Card)`
  height: 100%;
  max-width: 500px;
  flex-grow: 1;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    margin-left: 16px;
    width: 500px;
  }
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export const StyledCardActions = styled(CardActions)`
  margin: 4px 16px 16px;
  padding: 0 16px 8px;

  & :hover {
    color: var(--pufi-primary-blue, #1979be);
  }
`;

export const HeadingTypography = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`;

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const ModifiedFormLabel = styled(FormLabel)`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 4px 16px;
`;

export const ModifiedFormControlLabel = styled(FormControlLabel)`
  display: flex;
  padding: 10px 8px;
  align-items: center;
  border-radius: 8px;
  background: #f2f2f2;
  margin: 4px 16px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const AddSurveyButton = styled(Button)`
  padding: 12px 16px;
  color: var(--primary-contrast, #fff);
  border-radius: 6px;
  border: 2px solid var(--pufi-primary-blue, #1979be);
  background: var(--pufi-primary-blue, #1979be);
`;

export const CancelButton = styled(Button)`
  padding: 12px 16px;
  border-radius: 6px;
  border: 2px solid var(--pufi-primary-blue, #1979be);
`;
