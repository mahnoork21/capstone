import { ClientContext } from "@/context/ClientContext";
import MainContainer from "@/shared/components/main-container";
import styled from "@emotion/styled";
import { useContext, useEffect } from "react";

const SurveyCompleteContainer = styled.div`
  background-color: white;
  height: 450px;
  border-radius: 12px;
  padding: 24px;
`;

const SurveyCompletePage = () => {
  const { setIsNavBarVisible } = useContext(ClientContext);

  useEffect(() => {
    setIsNavBarVisible(false);

    return () => {
      setIsNavBarVisible(true);
    };
  });

  return (
    <MainContainer>
      <SurveyCompleteContainer>
        <p>Surve complete page with pdf download option</p>
      </SurveyCompleteContainer>
    </MainContainer>
  );
};

export default SurveyCompletePage;
