import styled from "@emotion/styled";

export const Container = styled.div`
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;

  padding: 20px 30px 60px 30px;
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
  }
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    flex: 0.5;
  }
`;

export const PieWrapper = styled.div`
  flex: 1;
`;
export const TableWrapper = styled.div`
  display: flex;
  flex: 1;
`;
