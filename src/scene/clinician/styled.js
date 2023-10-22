import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
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
  
  justify-content: center;

  @media (max-width: 390px) {
    width: 390px;
  }
  @media (min-width: 391px) and (max-width: 959px) {
    margin-left: 15px
    margin-right: 15px;
    margin-top:24px;
  }
  @media (min-width: 960px) {
    // flex-shrink: 0;
    margin-left: 100px;
    // margin-right: 100px;
  }
`;
export const StyledPaper = styled(Paper)`
  align-items: center;
  align-content: center;
  margin-bottom: 16px;
  border-radius: 8px;
  background: #fff;
  flex-shrink: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 390px) {
    width: 390px;
  }
  @media (min-width: 391px) and (max-width: 959px) {
    margin-top: 10px;
  }
  @media (min-width: 960px) {
    height: 480px;

    margin-left: 75px;
    margin-right: 0px;
  }
`;

export const StyledHeading = styled(Typography)`
  color: #000;
  padding-top: 24px;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;

  text-align: center;
`;

export const FormBox = styled(Box)`
  padding: 16px;
  gap: 5px;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 400px) {
    margin-left: 0px; /* Margin for small screens */
    margin-right: 0px; /* Margin for small screens */
  }
  @media (min-width: 960px) {
    margin-left: 15px; /* Margin for medium screens */
    margin-right: 15px; /* Margin for medium screens */
  }
  @media (min-width: 1920px) {
    margin-left: 25px; /* Margin for extra large screens */
    margin-right: 25px; /* Margin for extra large screens */
  }
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
  @media (max-width: 600px) {
    width: 358px;
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
`;

export const StyledTypo = styled(Typography)`
  text-align: center;
  color: var(--pufi-black, #333);
  padding-top: 32px;
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
`;
