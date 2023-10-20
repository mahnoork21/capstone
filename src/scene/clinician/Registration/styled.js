import styled from "@emotion/styled";
import { Paper, Typography, Container, Box } from "@mui/material";

export const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 3;
`;

export const StepperBox = styled(Box)`
  display: flex;
  padding: 1rem;
  // width: 952px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  // justify-content: center;
  // align-items: center;
`;

export const FormBox = styled(Box)`
  padding: 1rem;
  width: 100%;
  gap: 5px;
  align-content: center;
  display: flex;
  // justify-content: center;
  align-items: center;

  @media (min-width: 600px) {
    margin-left: 4px; /* Margin for small screens */
    margin-right: 4px; /* Margin for small screens */
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
  position: relative;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  // display: inline-flex;
  // padding: 0px 8px;
  // flex-direction: column;
  // align-items: flex-start;
`;
export const StyledTextfield = styled.input`
  width: 100%;
  max-width: 420px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid var(--pufi-grey, #d9d9d9);
  background: #f9f9f9;
  display: inline-flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledPaper = styled(Paper)`
  // elevation: 3;
  margin-left: 4px;
  // margin-right: 4px;
  align-items: center;
  align-content: center;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  @media (min-width: 600px) {
    margin-left: 4px; /* Margin for small screens */
    margin-right: 4px; /* Margin for small screens */
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

export const StyledTypo = styled(Typography)`
  text-align: center;
  color: var(--pufi-black, #333);

  max-width: 650px;
  color: #000;
  font-family: Open Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */
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
