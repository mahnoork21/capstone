const {
  default: MainContainer,
} = require("@/shared/components/main-container");
const { SummaryContainer } = require("./styled");

const SummaryContent = () => {
  return (
    <MainContainer>
      <SummaryContainer>Summary Page coming soon </SummaryContainer>
    </MainContainer>
  );
};

export default SummaryContent;
