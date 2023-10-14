import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0;
`;

export const LeftRightColumn = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;

  & .mobile-image {
    margin-right: 16px;
  }
`;

export const CenterColumn = styled.div`
  flex: 4;
  & h1 {
    font-size: 1.75rem;
    font-weight: 600;
  }

  & p {
    font-size: 0.875rem;
  }

  & .mobile-header {
    font-size: 1.375rem;
  }
`;

export const GreyContainer = styled.div`
  display: flex;
  padding: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: var(--pufi-grey-light, #f2f2f2);
  width: 100%;
  flex-direction: column;
`;
