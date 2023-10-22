import { Button } from "@mui/material";
import ReportHeader from "./components/report-header";
import { Container } from "./styled";
import ActivityAnalysis from "./components/activity-analysis";
import { useState } from "react";
import WeightedCalculation from "./components/weighted-calculation";
import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";

//TODO:
//1. when client id will appear in the database, add client id to the surveyData
//2. when surveyCard will be finished (component in All surveys -> way to get to this page -> view scores)
//add to that component onClick event (on view scores) that will pass surveyId as a parameter to the url (or store survey Id in clinician context),
//and i will retrieve this surveyId here instead of hardcoded useState surveyId
const SurveyReport = () => {
  const [surveyId, setSurveyId] = useState("XSxoZPRkwfObDw4iGWfr");
  return (
    <Container>
      <h1>SUMMARY SCORES</h1>

      <div className="header-flex">
        <ReportHeader surveyId={surveyId} />
        <Button
          className="download-button"
          variant="contained"
          startIcon={<img src="/icons/download.svg" alt="Download" />}
        >
          Download CSV
        </Button>
      </div>

      {youngChildSurvey.map(({ questionId }) => (
        <ActivityAnalysis surveyId={surveyId} questionId={questionId} />
      ))}

      <WeightedCalculation />
    </Container>
  );
};

export default SurveyReport;
