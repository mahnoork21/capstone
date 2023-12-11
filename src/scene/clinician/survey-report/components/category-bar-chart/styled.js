import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  border-radius: 8px;
  background: #fff;
  width: 100%;

  padding: 20px 30px 30px 30px;
  margin-top: 20px;

  & p {
    padding: 10px;
  }

  & h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 25px;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    /* Media query for screens with a maximum width of 600px (adjust as needed) */
    & canvas {
      max-width: 100% !important;
    }
  }
`;
