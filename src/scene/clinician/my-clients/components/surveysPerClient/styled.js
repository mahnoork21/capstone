import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { breakpoint } from "@/styles/breakpoints";

export const SurveysBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px;
  @media only screen and (min-width: ${breakpoint.desktop}) {
    max-width: 840px;
    padding: 0 0 0 16px;
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
