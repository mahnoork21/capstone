import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const SurveyCardsBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  flex-grow: 1;
  align-content: flex-start;
  margin: 16px 0;
  flex-wrap: wrap;

  @media only screen and (min-width: ${breakpoint.desktop}) {
    max-width: 970px;
    padding-bottom: 15px;
    padding-left: 11px;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;
