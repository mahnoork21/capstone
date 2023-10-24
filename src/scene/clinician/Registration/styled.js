import styled from "@emotion/styled";
import { Paper, Typography, Container, Box } from "@mui/material";

// export const ContentContainer = styled(Container)`
//   width: 100%;
//   margin-left: auto;

//   box-sizing: border-box;
//   margin-right: auto;
//   display: flex;

//   align-content: center;
//   flex-direction: column;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   border-block: 8px;
// `;

// export const StyledPaper = styled(Paper)`
//   // elevation: 3;
//   margin-left: 4px;
//   // margin-right: 4px;
//   align-items: center;
//   align-content: center;
//   padding: 1rem;
//   margin: 1rem;
//   border-radius: 8px;
//   background: #fff;
//   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

//   @media (min-width: 600px) {
//     margin-left: 4px; /* Margin for small screens */
//     margin-right: 4px; /* Margin for small screens */
//   }
//   @media (min-width: 960px) {
//     margin-left: 80px; /* Margin for medium screens */
//     margin-right: 75px; /* Margin for medium screens */
//   }
//   @media (min-width: 1920px) {
//     margin-left: 25px; /* Margin for extra large screens */
//     margin-right: 25px; /* Margin for extra large screens */
//   }
// `;

export const StyledContainer = styled(Container)`
  width: 100%;
  align-items: center;
  align-content: center;
  flex-shrink: 0;
  border-radius: 8px;
  margin: 0;
  padding-top: 8px;
  justify-content: center;

  @media (max-width: 390px) {
    width: 390px;
    margin-left: 8px;
  }
  @media (min-width: 391px) and (max-width: 959px) {
    margin-left: 15px
    margin-right: 15px;
    margin-top:24px;
  }
  @media (min-width: 960px) {
    
    margin-left: auto;
    margin-right: auto;
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
    height: 577px;
    // width: 100%;
    max-width: 1024px;
    margin-left: 4.25rem;
    margin-right: 4.25rem;
  }
`;
export const StepperBox = styled(Box)`
  display: block;
  padding: 1rem;
  width: 100%
  align-items: flex-start;
  gap: 24px;
  height: auto;
  
`;

export const FormBox = styled(Box)`
  padding: 1rem;
  margin-bottom: 24px;
  gap: 5px;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;

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
`;
export const StyledTextfield = styled.input`
  width: 100%;
  max-width: 520px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid var(--pufi-grey, #d9d9d9);
  background: #f9f9f9;
  display: inline-flex;
  padding: 0px 8px;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledTypo = styled(Typography)`
  color: var(--pufi-black, #333);
  margin-top: 10px;
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
  @media (min-width: 960px) {
    margin-left: 13rem; /* Margin for extra large screens */
    margin-right: 10rem; /* Margin for extra large screens */
  }
`;
export const StyledBox = styled(Box)`
  padding-left: 24px;
  padding-top: 30px;
  padding-bottom: 66px;
  padding-right: 24px;
`;
