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
  TextField,
  Typography,
} from "@mui/material";

export const ClientListCard = styled(Card)`
  display: inline-flex;
  height: 700px;
  width: 300px;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: center;
`;

export const NumberOfClientsTypography = styled(Typography)``;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 0 8px;
`;

export const StyledSearchBox = styled(Box)`
  display: flex;
  flex-grow: 1;
  width: 280px;
  justify-content: space-between;
  border-radius: 8px;
  background: var(--pufi-grey-light, #f2f2f2);
`;

export const StyledSearchInputBase = styled(InputBase)`
  padding-left: 8px;
  flex-grow: 1;
`;
