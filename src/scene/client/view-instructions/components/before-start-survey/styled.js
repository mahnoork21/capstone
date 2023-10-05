import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const LeftRightColumn = styled.div`
  flex: 1;
  justify-content: center;
  textalign: "center";
`;

export const CenterColumn = styled.div`
  flex: 4;
`;

export const GreyContainer = styled.div`
  display: inline-flex;
  height: 6.25rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  background: var(--pufi-grey-light, #f2f2f2);
  width: 100%;
`;
