import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const PaginationBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  align-items: center;
  padding: 0 12px;
  border-radius: 8px;
`;

export const NumberOfSurveysTypography = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledForwardAndBackwardButtonsBox = styled(Box)`
  display: flex;
  flex-direction: row;
`;
