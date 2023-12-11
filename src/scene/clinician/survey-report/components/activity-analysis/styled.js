import { breakpoint } from "@/styles/breakpoints";
import styled from "@emotion/styled";

export const Container = styled.div`
  border-radius: 8px;
  background: #fff;
  width: 100%;

  padding: 20px 30px 100px 30px;
  margin-top: 20px;

  & h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 25px;
  }

  & .total-score {
    float: right;
    font-weight: 600;
    font-size: 1rem;
    padding-top: 20px;
    text-align: center;
    width: 100%;
  }

  & .no-data {
    text-align: center;
    color: darkred;
    font-style: italic;
    font-weight: bold;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    flex: 0.5;
  }

  @media only screen and (max-width: ${breakpoint.desktop}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 24px;
  }
`;

export const PieWrapper = styled.div`
  flex: 1;
`;
export const TableWrapper = styled.div`
  display: flex;
  flex: 1;
`;
