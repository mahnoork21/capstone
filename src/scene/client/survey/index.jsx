import MainContainer from "@/shared/components/main-container";
import { SurveyContainer } from "./styled";
import { useContext } from "react";
import { SurveyContext } from "./context";
import { youngChildSurvey } from "@/utils/youngChildSurvey";
import { StyledFormControlLabel } from "./components/option/styled";
import { Radio } from "@mui/material";

const Survey = () => {
  // const currentQuestion = useContext(SurveyContext);

  return (
    <MainContainer>
      <SurveyContainer>
        <StyledFormControlLabel
          value="Survey"
          control={<Radio />}
          label="Survey"
        />
      </SurveyContainer>
    </MainContainer>
  );
};

export default Survey;
