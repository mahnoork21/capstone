import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

export const StyledBox = styled(Box)`
  padding-left: 24px;
  padding-top: 30px;
  padding-bottom: 66px;
  padding-right: 24px;
`;
export const StyledContainer = styled(Container)`
  width: 100%;
  align-items: center;
  align-content: center;
  flex-shrink: 0;
  border-radius: 8px;
  margin: 0;
  padding-top: 8px;
  justify-content: center;
`;

export const StyledPaper = styled(Paper)`
  align-items: center;
  align-content: center;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  flex-shrink: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
`;

export const StyledHeading = styled(Typography)`
  color: var(--pufi-black, #333);
  padding-top: 24px;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;

  text-align: center;

  @media only screen and (max-width: ${breakpoint.desktop}) {
    font-size: 1.25rem;
  }
`;

export const FormBox = styled(Box)`
  padding: 16px;
  gap: 5px;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Labels = styled(Typography)`
  margin-top: 12px;
  position: relative;
  padding: 0px 8px;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
`;

export const StyledTextfield = styled.input`
  width: 420px;
  // max-width: 420px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid var(--pufi-grey);
  background: var(--pufi-white);
  display: inline-flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${breakpoint.desktop}) {
    width: 320px;
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
  width: 100%;
  max-width: 450px;
  height: 48px;
  padding: 16px 46px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--pufi-primary-blue, #1979be);
  color: var(--primary-contrast, #fff);
  transition: background 0.3s, color 0.3s;
  margin-top: 20px;
  &:hover {
    background: var(--pufi-primary-blue, #1979be);
    color: var(--primary-contrast, #fff);
  }
  /* button */

  font-size: 1rem;
  font-style: normal;
  font-weight: 600;

  @media only screen and (max-width: ${breakpoint.desktop}) {
    font-size: 0.875rem;
  }
`;

export const StyledTypo = styled(Typography)`
  color: var(--pufi-black, #333);
  padding-top: 24px;
  max-width: 650px;

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;

  text-align: center;
  @media (min-width: 600px) {
    margin-left: 4px; /* Margin for small screens */
    margin-right: 4px; /* Margin for small screens */
  }
  @media (min-width: 900px) {
    margin-left: 13rem; /* Margin for extra large screens */
    margin-right: 10rem; /* Margin for extra large screens */
  }

  @media (max-width: ${breakpoint.desktop}) {
    font-size: 1.25rem;
  }
`;
