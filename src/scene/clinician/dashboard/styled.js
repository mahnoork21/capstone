import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";


export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 23.48px 0;
  gap: 16.48px 0;

  & img:last-child {
    visibility: hidden;
  }

  p {
    color: #000;
    font-family: Open Sans;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 1.5rem */ 

    @media only screen and (min-width: ${breakpoint.desktop}) {
      font-size: 1.5rem;
    }
  }

  button {
    display: flex;
    width: 200px;
    height: 40px;
    padding: 8px 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #1979BE;
    background: var(--pufi-primary-blue, #1979BE);

    @media only screen and (min-width: ${breakpoint.desktop}){
        padding: 10px 36px; 
    }
  }

  @media only screen and (min-width: ${breakpoint.desktop}) {
    padding: 0 24px;
  }
`;
