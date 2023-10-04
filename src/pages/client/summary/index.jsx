import MainContainer from "@/shared/components/main-container";
import styled from "@emotion/styled";

export const SummaryContainer = styled.div`
  background-color: white;
  height: 450px;
  border-radius: 12px;
  padding: 16px;
`;

const SummaryPage = () => {
  return (
    <MainContainer>
      <SummaryContainer> Summary Page coming soon </SummaryContainer>
    </MainContainer>
  );
};

export default SummaryPage;
